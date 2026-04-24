import viteReact from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

import { aliases } from "./vite.config";

export default defineConfig({
  resolve: {
    alias: aliases,
  },
  plugins: [viteReact()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    exclude: [...configDefaults.exclude, "**/.worktrees/**"],
  },
});
