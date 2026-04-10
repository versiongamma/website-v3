export const selectiveStyle = (style: string, apply: boolean, secondaryStyle?: string) => apply ? style : secondaryStyle ?? "";
export const tw = (style: TemplateStringsArray) => style.toString();