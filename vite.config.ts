import { createRequire } from "module";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import preact from "@preact/preset-vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@components": path.resolve(__dirname, "./src/components"),
      "~assets": path.resolve(__dirname, "/assets"),
    },
  },
  build: {
    outDir: "build",
    emptyOutDir: true,
  },
  plugins: [
    preact({
      babel: {
        cwd: createRequire(import.meta.url).resolve("@preact/preset-vite"),
      },
      prerender: { enabled: true, renderTarget: "#app" },
    }),
    tailwindcss(),
  ],
});
