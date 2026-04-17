import type { SoftwareEntry } from "~/functions/software.function";
import { SkillIcons } from "./SkillIcons";

type Props = {
  entry: SoftwareEntry;
};

export const ProjectEntry = ({ entry }: Props) => {
  return (
    <div>
      <span className="flex gap-4 items-center">
        <h2 className="font-heading font-bold text-4xl">{entry.title}</h2>
        <SkillIcons icons={entry.icons} />
      </span>
      <p>{entry.copy}</p>

      <a
        href={entry.link.href}
        className="link-color "
        target="_blank"
        rel="noopener noreferrer"
      >
        {entry.link.text}
      </a>
    </div>
  );
};
