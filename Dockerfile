FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS logger
RUN bun install pino-pretty

# Build package
FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
ENV NODE_ENV=production
ARG VITE_COMMIT_SHA
RUN bun run build

# Run web server
FROM base AS run
ENV PORT=4173
USER bun
COPY --from=build /usr/src/app/.output .
COPY --from=logger /usr/src/app/node_modules ./node_modules
EXPOSE 4173/tcp
ENTRYPOINT [ "/bin/sh", "-c", "bun run ./server/index.mjs | ./node_modules/.bin/pino-pretty -S -i time,pid,hostname" ]
