import { createServerFn } from "@tanstack/react-start";

import { fetch } from "~/utils/fetch";
import { getEnv } from "./env.server";

const PASTEBIN_RAW_URL = "https://pastebin.com/raw";

export const getSoftwarePageData = createServerFn({ method: "GET" }).handler(
  async () => {
    const { SOFTWARE_PASTEBIN_ID } = getEnv();
    const data = await fetch(`${PASTEBIN_RAW_URL}/${SOFTWARE_PASTEBIN_ID}`, {
      type: "text",
    });
    return data;
  },
);
