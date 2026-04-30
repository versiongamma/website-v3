import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import type { ServerOptions, UserConfig } from "vite";
import type { TestUserConfig } from "vitest/config";
import { configDefaults, defineConfig } from "vitest/config";

const resolve: UserConfig["resolve"] = {
  alias: {
    "~": path.resolve(__dirname, "./src"),
  },
};

const environments: UserConfig["environments"] =
  process.env.VITEST !== "true"
    ? {
        client: {
          build: {
            sourcemap: true,
            rollupOptions: {
              output: {
                chunkFileNames: "js/[hash].js",
                entryFileNames: "js/[hash].js",
                assetFileNames: "[ext]/[hash][extname]",
              },
            },
          },
        },
        ssr: {
          build: {
            ssr: true,
            rollupOptions: {
              input: "virtual:tanstack-start-server-entry",
              output: {
                chunkFileNames: "js/[hash].js",
                entryFileNames: "js/[hash].js",
                assetFileNames: "[ext]/[hash][extname]",
              },
            },
            copyPublicDir: false,
          },
        },
      }
    : undefined;

const plugins: UserConfig["plugins"] = [
  // Runtime envionment plugins
  ...(process.env.VITEST !== "true"
    ? [
        tanstackStart({
          prerender: {
            enabled: true,
            autoSubfolderIndex: false,
            filter: ({ path }) =>
              !["/dev", "/coffee"].some((route) => path.startsWith(route)),
          },
        }),
        nitro({
          rollupConfig: {
            external: [/^@sentry\//],
            output: { sourcemap: true },
          },
        }),
        tailwindcss(),
      ]
    : []),
  // Runtime & Test environment plugins
  viteReact({
    babel: {
      plugins: ["babel-plugin-react-compiler"],
    },
  }),
];

const test: TestUserConfig = {
  environment: "jsdom",
  setupFiles: ["./src/test/setup.ts"],
  exclude: [...configDefaults.exclude, "**/.worktrees/**"],
};

const serverOptions: ServerOptions = {
  host: "0.0.0.0",
  port: 5173,
};

export default defineConfig({
  resolve,
  environments,
  plugins,
  test,
  server: serverOptions,
  preview: serverOptions,
});
