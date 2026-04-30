import type { HTMLProps } from "react";
import type { IconType } from "react-icons/lib";
import { classNames } from "~/utils/style";

type Props = {
  icon: IconType;
  iconClassName?: string;
  background?: "transparent" | "filled";
} & HTMLProps<HTMLButtonElement>;

export const IconButton = ({
  icon: Icon,
  className,
  iconClassName,
  onClick,
  disabled,
  background = "transparent",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      type="button"
      className={classNames(
        "flex items-center justify-center rounded-full cursor-pointer transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:cursor-not-allowed",
        background === "transparent"
          ? "bg-transparent hover:bg-black/40"
          : "bg-black/40 hover:bg-black/60",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className={iconClassName} />
    </button>
  );
};
