import "pino-pretty";
import { PinoTransport } from "@loglayer/transport-pino";
import { LogLayer } from "loglayer";
import pino from "pino";

export const logger = new LogLayer({
  transport: new PinoTransport({
    enabled:
      process.env.TSS_PRERENDERING !== "true" &&
      process.env.NODE_ENV === "production",
    logger: pino({
      level: process.env.LOG_LEVEL || "info",
    }),
  }),
});
