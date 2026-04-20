import type { SoftwareEntry } from "~/functions/software.function";
import { TerminalContainer } from "../TerminalContainer";
import { SkillIcons } from "./SkillIcons";

type Props = {
  entry: SoftwareEntry;
};

export const JobEntry = ({ entry }: Props) => {
  return (
    <TerminalContainer
      key={entry.title}
      classes={{
        container: "flex flex-col w-full max-w-3xl",
        content: "h-full",
      }}
      header={
        <div className="flex flex-col gap-4 p-4">
          <div className="flex max-h-30 justify-center">
            {entry.logo ? (
              <img
                className="object-cover max-h-12 md:max-h-20 drop-shadow-2xl"
                src={entry.logo}
                alt={entry.title}
              />
            ) : (
              <h2 className="font-heading font-bold text-4xl text-black">
                {entry.title}
              </h2>
            )}
          </div>
          <SkillIcons icons={entry.icons} />
        </div>
      }
      content={
        <div className="flex flex-col m-4 justify-between h-full">
          <p className="text-sm md:text-base">{entry.copy}</p>
          <span className="flex w-full justify-between mt-2">
            <p className="opacity-50">{entry.work}</p>
            <a
              href={entry.link.href}
              className="link-color "
              target="_blank"
              rel="noopener noreferrer"
            >
              {entry.link.text}
            </a>
          </span>
        </div>
      }
    />
  );
};
