import { LogLayer, LogLevel, StructuredTransport } from "loglayer";

export const logger = new LogLayer({
  transport: [
    new StructuredTransport({
      logger: console,
      level: (process.env.LOG_LEVEL as LogLevel) ?? LogLevel.info,
    }),
  ],
  plugins: [],
});
