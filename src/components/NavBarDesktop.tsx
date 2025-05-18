import { selectiveStyle, tw } from "@utils/index";
import { SiteRoute } from "@utils/routes";

type Props = {
  path: SiteRoute;
};

const NavBarDesktop = ({ path }: Props) => {
  const getLinkStyle = (linkPath: string) => 
    selectiveStyle("text-orange-500 cursor-default", linkPath === path, "hover:text-orange-400 transition-colors");

  return (
    <div className="bg-black/40 h-[80px] w-full flex items-center justify-center">
      <div className="font-mono text-xl flex gap-4">
        <a className={getLinkStyle("/")} href="/">home</a>
        <p>/</p>
        <a className={getLinkStyle("/video")} href="/video">video</a>
        <p>/</p>
        <a className={getLinkStyle("/photo")} href="/photo">photo</a>
        <p>/</p>
        <a className={getLinkStyle("/software")} href="/software">software</a>
        <p>/</p>
        <a className={getLinkStyle("/contact")} href="contact">contact</a>
      </div>
    </div>
  );
};

export default NavBarDesktop;
