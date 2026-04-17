import { PinoTransport } from "@loglayer/transport-pino";
import { LogLayer, LogLevel } from "loglayer";
import { pino } from "pino";

export const logger = new LogLayer({
  transport: [
    new PinoTransport({
      logger: pino({
        level: process.env.LOG_LEVEL ?? LogLevel.info,
      }),
    }),
  ],
  plugins: [],
});
