export const roundToNearestMultiple = (
  value: number,
  multiple: number,
): number => {
  return Math.round(value / multiple) * multiple
}
