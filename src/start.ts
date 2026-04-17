import { createStart } from "@tanstack/react-start";
import {
  functionLoggerMiddleware,
  requestLoggerMiddleware,
} from "./middleware/logs";

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [requestLoggerMiddleware],
    functionMiddleware: [functionLoggerMiddleware],
  };
});
