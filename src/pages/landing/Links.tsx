import { FcBusinessContact, FcCamera, FcCommandLine, FcVideoCall } from "react-icons/fc";
import { tw } from "../../utils/tw";

const linkStyle = tw`text-blue-500 font-mono text-2xl/loose flex items-center gap-2`;
const iconSize = 32

const Links = () => (
  <div className="flex flex-col">
    <a className={linkStyle}><FcVideoCall size={iconSize}/>/video</a>
    <a className={linkStyle}><FcCamera size={iconSize}/>/photo</a>
    <a className={linkStyle}><FcCommandLine size={iconSize} />/software</a>
    <a className={linkStyle}><FcBusinessContact size={iconSize} />/contact</a>
  </div>
);

export default Links;
