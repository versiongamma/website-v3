import type { SoftwareEntry } from "~/functions/software.function";
import { SkillIcons } from "./SkillIcons";

type Props = {
  entry: SoftwareEntry;
};

export const ProjectEntry = ({ entry }: Props) => {
  return (
    <div className="space-y-0.5">
      <span className="flex gap-4 items-center justify-between">
        <h2 className="font-heading font-bold text-3xl md:text-4xl translate-y-1">
          {entry.title}
        </h2>
        <SkillIcons icons={entry.icons} />
      </span>
      <div className="mb-1">
        <a
          href={entry.link.href}
          className="link-color"
          target="_blank"
          rel="noopener noreferrer"
        >
          {entry.link.text}
        </a>
      </div>
      <p className="text-sm md:text-base">{entry.copy}</p>
    </div>
  );
};
