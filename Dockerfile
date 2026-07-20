FROM node:22-alpine AS base
WORKDIR /usr/src/app
RUN wget -O /etc/apk/keys/cristianfalcone@gmail.com-799462e3.rsa.pub \
  https://raw.githubusercontent.com/cristianfalcone/alpine-bun/main/.keys/cristianfalcone@gmail.com-799462e3.rsa.pub
RUN echo "https://raw.githubusercontent.com/cristianfalcone/alpine-bun/main/edge/testing" \
  >> /etc/apk/repositories
RUN apk update
RUN apk add --no-cache make zstd bun-static
RUN npm install --global pnpm

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /temp/dev/
RUN cd /temp/dev && pnpm install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /temp/prod/
RUN cd /temp/prod && pnpm install --frozen-lockfile --production

# Build package
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY src public package.json pnpm-workspace.yaml pnpm-lock.yaml tsconfig.json vite.config.ts ./
ENV NODE_ENV=production
ARG VITE_COMMIT_SHA
RUN make

# Run web server
FROM alpine:3.24 AS run
RUN apk add --no-cache zstd libstdc++ libgcc gcompat
WORKDIR /usr/src/app/.output
ENV PORT=4173
COPY --from=build /usr/src/app/.output .
EXPOSE 4173/tcp
CMD [ "sh", "-c", "unzstd --rm ./server/app.zst && ./server/app" ]
