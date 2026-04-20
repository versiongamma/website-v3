import { classNames } from "~/utils/style";

type Props = {
  header: React.ReactNode;
  content: React.ReactNode;
  /** The onClick callback for the root div component */
  onClick?: () => void;
  /** Whether to keep the background color when in mobile view */
  keepBackground?: boolean;
  classes?: {
    container?: string;
    header?: string;
    content?: string;
  };
};

export const TerminalContainer = ({
  header,
  content,
  onClick,
  classes,
}: Props) => {
  return (
    <div
      role="tab"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={classNames(
        classes?.container ?? "",
        "md:bg-[#171717]/60 bg-opacity-8 md:rounded-3xl md:dropshadow",
      )}
    >
      <div
        className={classNames(
          "bg-[#D8D8D8] w-full md:rounded-t-3xl drop-shadow md:drop-shadow-none",
          classes?.header ?? "",
        )}
      >
        {header}
      </div>
      <div
        className={classNames(
          "flex flex-col justify-between",
          classes?.content ?? "",
        )}
      >
        {content}
      </div>
    </div>
  );
};
