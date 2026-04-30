import CircularJSON from "circular-json";
import { BlankTransport, LogLayer, type LogLevel } from "loglayer";

export const logger = new LogLayer({
  transport: new BlankTransport({
    enabled: process.env.TSS_PRERENDERING !== "true",
    level: (process.env.LOG_LEVEL as LogLevel) || "info",
    shipToLogger: ({ logLevel, messages, data }) => {
      const message = messages.join(" ");
      data;
      const log = {
        message,
        level: logLevel,
        ...data,
      };
      console.log(
        process.env.NODE_ENV === "production"
          ? CircularJSON.stringify(log)
          : `[${logLevel.toUpperCase()}] ${message}`,
      );
      return messages;
    },
  }),
});
