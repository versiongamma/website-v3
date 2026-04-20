import { classNames } from "~/utils/style";

type Props = {
  className?: string;
  children?: React.ReactNode;
  linesClassName?: string;
};

export const SpacerHeader = ({
  className,
  children,
  linesClassName,
}: Props) => {
  return (
    <div className={classNames("flex w-full items-center gap-4", className)}>
      <span
        className={classNames("grow block h-px bg-gray-200/20", linesClassName)}
      />
      <h1 className="text-3xl font-heading font-bold">{children}</h1>
      <span
        className={classNames("grow block h-px bg-gray-200/20", linesClassName)}
      />
    </div>
  );
};
