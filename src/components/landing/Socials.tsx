import type { IconType } from "react-icons/lib";
import {
  RiBlueskyLine,
  RiGithubLine,
  RiInstagramLine,
  RiMailOpenLine,
  RiYoutubeLine,
} from "react-icons/ri";

type SocialIconButtonProps = {
  icon: IconType;
  tooltip: string;
  href: string;
};

const SocialIconButton = ({
  icon: Icon,
  tooltip,
  href,
}: SocialIconButtonProps) => {
  return (
    <a href={href} target="_blank" rel="noopener" className="has-tooltip">
      <span className="tooltip">{tooltip}</span>
      <Icon className="text-4xl hover:text-neutral-400 transition-colors cursor-pointer" />
    </a>
  );
};

export const Socials = () => {
  return (
    <div className="flex gap-4 justify-center md:justify-start">
      <SocialIconButton
        href="mailto:matt@versiongamma.com"
        icon={RiMailOpenLine}
        tooltip="Email: matt@versiongamma.com"
      />
      <SocialIconButton
        href="https://youtube.com/c/VersionGamma"
        icon={RiYoutubeLine}
        tooltip="YouTube: @VersionGamma"
      />
      <SocialIconButton
        href="https://github.com/versiongamma"
        icon={RiGithubLine}
        tooltip="GitHub: versiongamma"
      />
      <SocialIconButton
        href="https://instagram.com/matthewsphotosnz"
        icon={RiInstagramLine}
        tooltip="Instagram: @matthewsphotosnz"
      />
      <SocialIconButton
        href="https://bsky.app/profile/versiongamma.com"
        icon={RiBlueskyLine}
        tooltip="Bluesky: @versiongamma.com"
      />
    </div>
  );
};
