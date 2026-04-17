import { createFileRoute } from "@tanstack/react-router";
import { getEnv } from "~/functions/env.server";

const PASTEBIN_EDIT_URL = "https://pastebin.com/edit";

export const Route = createFileRoute("/software/edit")({
  server: {
    handlers: {
      GET: () => {
        const { SOFTWARE_PASTEBIN_ID } = getEnv();
        return new Response(null, {
          status: 308,
          headers: { Location: `${PASTEBIN_EDIT_URL}/${SOFTWARE_PASTEBIN_ID}` },
        });
      },
    },
  },
});
