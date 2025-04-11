import { selectiveStyle } from "@utils/index";
import { SiteRoute } from "@utils/routes";

type Props = {
  path: SiteRoute;
};

const NavBarDesktop = ({ path }: Props) => {
  const getLinkStyle = (linkPath: string) => {
    return selectiveStyle("text-orange-400", linkPath === path);
  };

  return (
    <div className="bg-black/40 h-[80px] w-full flex items-center justify-center">
      <p className="font-mono text-xl flex gap-4">
        <a className={getLinkStyle("/")} href="/">home</a>
        <p>/</p>
        <a className={getLinkStyle("/video")} href="/video">video</a>
        <p>/</p>
        <a className={getLinkStyle("/photo")} href="/photo">photo</a>
        <p>/</p>
        <a className={getLinkStyle("/software")} href="/software">software</a>
        <p>/</p>
        <a className={getLinkStyle("/contact")} href="contact">contact</a>
      </p>
    </div>
  );
};

export default NavBarDesktop;
