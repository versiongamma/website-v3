import { EffectCallback, Inputs, useEffect } from "preact/hooks";

export const useEffectAsync = (
  effect: () => Promise<void>,
  inputs?: Inputs,
  destructor?: EffectCallback
) =>
  useEffect(() => {
    const run = async () => await effect();
    run();
    return destructor;
  }, inputs);
