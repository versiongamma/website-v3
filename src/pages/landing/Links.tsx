import { tw } from "@utils";
import {
  FiCamera,
  FiGitPullRequest,
  FiMail,
  FiVideo
} from 'react-icons/fi';

const linkStyle = tw`link-color font-mono text-2xl/loose flex items-center gap-4 w-fit`;
const iconSize = 40;

const Links = () => (
  <div className="flex flex-col">
    <a href="/video" className={linkStyle}>
      <FiVideo size={iconSize} />
      /video
    </a>
    <a href="/photo" className={linkStyle}>
      <FiCamera size={iconSize} />
      /photo
    </a>
    <a href="/software" className={linkStyle}>
      <FiGitPullRequest size={iconSize} />
      /software
    </a>
    <a href="/contact" className={linkStyle}>
      <FiMail size={iconSize} />
      /contact
    </a>
  </div>
);

export default Links;
