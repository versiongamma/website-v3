import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import { defineConfig, type AliasOptions } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export const aliases: AliasOptions = {
  "~": path.resolve(__dirname, "./src"),
};

export default defineConfig({
  resolve: {
    alias: aliases,
  },
  environments: {
    client: {
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
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
            format: "esm",
            chunkFileNames: "js/[hash].js",
            entryFileNames: "js/[hash].js",
            assetFileNames: "[ext]/[hash][extname]",
          },
        },
        minify: true,
        sourcemap: false,
        copyPublicDir: false,
      },
    },
  },
  plugins: [
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // Disable TS start plugin in test environment
    // https://github.com/TanStack/router/issues/6246
    process.env.VITEST !== "true" &&
      tanstackStart({
        prerender: {
          enabled: true,
          autoSubfolderIndex: false,
          filter: ({ path }) =>
            !["/dev", "/coffee"].some((route) => path.startsWith(route)),
        },
      }),
    viteReact({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    port: 5173,
  },
});
