export const selectiveStyle = (
  style: string,
  apply: boolean,
  secondaryStyle?: string,
) => (apply ? style : (secondaryStyle ?? ""));
export const classNames = (...classes: (string | undefined)[]) =>
  classes.filter(Boolean).join(" ");
