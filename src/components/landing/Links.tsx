import { Link, type LinkProps } from "@tanstack/react-router";
import { FiCamera, FiGitPullRequest, FiVideo } from "react-icons/fi";
import type { IconType } from "react-icons/lib";

type IconLinkProps = {
  icon: IconType;
  text: string;
} & LinkProps;

const IconLink = ({ icon: Icon, text, ...props }: IconLinkProps) => (
  <Link
    {...props}
    className="link-color font-mono text-2xl/loose flex items-center gap-4 w-fit"
  >
    <Icon className="text-3xl" />
    {text}
  </Link>
);

const Links = () => (
  <div className="flex flex-col items-center md:items-start">
    <IconLink icon={FiVideo} text="/video" to="/video" />
    <IconLink icon={FiCamera} text="/photo" to="/photo" />
    <IconLink icon={FiGitPullRequest} text="/software" to="/software" />
  </div>
);

export default Links;
