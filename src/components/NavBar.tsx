import { Link } from "@tanstack/react-router";

import { classNames, selectiveStyle } from "~/utils/style";

type Props = {
  path?: string;
  className?: string;
};

export const NavBar = ({ path, className }: Props) => {
  const getLinkStyle = (linkPath: string) =>
    selectiveStyle(
      "text-orange-500 cursor-default",
      linkPath === path,
      "hover:text-orange-400 transition-colors",
    );

  return (
    <div
      className={classNames(
        "bg-black/40 h-12 md:h-16 w-full flex items-center justify-center shrink-0 z-10 backdrop-blur-md drop-shadow",
        className,
      )}
    >
      <div className="font-mono md:text-xl flex gap-4">
        <Link className={getLinkStyle("/")} to="/">
          home
        </Link>
        <p>/</p>
        <Link className={getLinkStyle("/video")} to="/video">
          video
        </Link>
        <p>/</p>
        <Link className={getLinkStyle("/photo")} to="/photo">
          photo
        </Link>
        <p>/</p>
        <Link className={getLinkStyle("/software")} to="/software">
          software
        </Link>
      </div>
    </div>
  );
};
