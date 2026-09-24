export const roundToNearestMultiple = (
  value: number,
  multiple: number,
): number => {
  return Math.round(value / multiple) * multiple;
};

const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/** Shuffles a copy of the array deterministically based on the provided seed. */
export const shuffle = <T>(array: readonly T[], seed?: number): T[] => {
  const result = [...array];
  const random = mulberry32(seed ?? Date.now  ());
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};
