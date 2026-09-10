// Standalone, fully static (SPA) build used for GitHub Pages.
// Deliberately does NOT use the TanStack Start / nitro plugins, so the output
// is only static assets in dist-static — no dist/server, no SSR at runtime.
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const repoName = process.env['GITHUB_REPOSITORY']?.split("/")[1];
const base = process.env.STATIC_BASE ?? (process.env['GITHUB_ACTIONS'] && repoName ? `/${repoName}/` : "/");

export default defineConfig({
  base,
  root: fileURLToPath(new URL("./static", import.meta.url)),
  publicDir: fileURLToPath(new URL("./public", import.meta.url)),
  plugins: [react(), tailwindcss(), tsConfigPaths({ projects: ["./tsconfig.json"] })],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  build: {
    outDir: fileURLToPath(new URL("./dist-static", import.meta.url)),
    emptyOutDir: true,
  },
});
