import { classNames } from "~/utils/style";
import { NavBar } from "./NavBar";

type Props = {
  path?: string;
  className?: string;
  bg?: string;
  children: React.ReactNode;
};

export const PageContainer = ({ path, className, bg, children }: Props) => {
  return (
    <div
      className={classNames(
        "w-screen h-screen bg-cover bg-position-[-5rem_center] md:bg-center bg-no-repeat",
        bg,
      )}
    >
      <div className="w-screen h-screen bg-black/30 md:bg-transparent">
        <div
          className={classNames(
            "flex flex-col items-center w-screen h-screen overflow-y-scroll no-scrollbar background-gradient-transparent",
            path ? "pt-12 md:pt-16" : "",
            className,
          )}
        >
          {path && <NavBar path={path} className="fixed top-0" />}
          {children}
        </div>
      </div>
    </div>
  );
};
