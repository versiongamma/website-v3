import { createIsomorphicFn } from "@tanstack/react-start";
import useViewport from "~/hooks/useViewport";

export const useVideoItemSize = createIsomorphicFn()
  .server(() => 360)
  .client(() => (useViewport().width >= 1280 ? 448 : 360));
