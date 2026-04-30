import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
    },
  },
  environments: {
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
  },
  plugins: [
    nitro({
      rollupConfig: { external: [/^@sentry\//], output: { sourcemap: true } },
    }),
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
