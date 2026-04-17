import { createMiddleware } from "@tanstack/react-start";
import { logger } from "~/logger";

export const requestLoggerMiddleware = createMiddleware({
  type: "request",
}).server(({ request, next }) => {
  logger
    .withMetadata({
      ...request,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
    })
    .info("Request");
  return next();
});

export const functionLoggerMiddleware = createMiddleware({
  type: "function",
}).server(({ next, ...context }) => {
  logger.withMetadata(context).info("Function");
  return next();
});
