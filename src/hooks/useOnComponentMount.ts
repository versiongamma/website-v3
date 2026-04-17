import { useEffect } from "react";

export const useOnComponentMount = (callback: () => void) => {
  // biome-ignore lint/correctness/useExhaustiveDependencies: This should only ever run once, even if the callback reference changes
  useEffect(() => {
    callback();
  }, []);
};
