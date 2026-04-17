import { createServerFn } from "@tanstack/react-start";

import { fetch } from "~/utils/fetch";
import { getEnv } from "./env.server";

const PASTEBIN_RAW_URL = "https://pastebin.com/raw";

export type SoftwareEntry = {
  title: string;
  logo?: string;
  icons: string;
  copy: string;
  work?: string;
  link: {
    text: string;
    href: string;
  };
};

const EMPTY_ENTRY: SoftwareEntry = {
  title: "",
  copy: "",
  icons: "",
  link: {
    text: "",
    href: "",
  },
};

export const getSoftwarePageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const { SOFTWARE_PASTEBIN_ID } = getEnv();
    const data = await fetch<string>(
      `${PASTEBIN_RAW_URL}/${SOFTWARE_PASTEBIN_ID}`,
      {
        type: "text",
      },
    );

    const entries = data.split("\n").reduce<SoftwareEntry[]>((memo, line) => {
      if (line[0] === "#") {
        const title = line.slice(1).trim();
        memo.push({ ...EMPTY_ENTRY, title });
        return memo;
      }

      if (line[0] === "/") {
        const [key, value] = line.split("|");
        const currentEntry = memo[memo.length - 1];

        switch (key) {
          case "/icons": {
            currentEntry.icons = value.trim();
            break;
          }
          case "/logo": {
            currentEntry.logo = value.trim();
            break;
          }
          case "/link": {
            currentEntry.link = {
              text: value.match(/(?<=\[)[^\[\]]*(?=\])/)?.toString() ?? "",
              href: value.match(/(?<=\()[^()]*(?=\))/)?.toString() ?? "",
            };
            break;
          }
          case "/work": {
            currentEntry.work = value.trim();
            break;
          }
        }

        return memo;
      }

      if (line.length > 0) {
        const currentEntry = memo[memo.length - 1];
        currentEntry.copy += `${line}\n`;
      }

      return memo;
    }, []);

    return {
      jobs: entries.filter(({ work }) => !!work),
      projects: entries.filter(({ work }) => !work),
    };
  },
);
