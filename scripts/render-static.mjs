// Renders the built TanStack Start server to static HTML for GitHub Pages.
// The normal `bun run build` output (dist/server/index.mjs) exposes a
// fetch-style handler; we call it for each route and write the HTML into
// dist/client so the whole site can be served as plain static files.
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const base = process.env.STATIC_BASE ?? "/"; // e.g. "/my-repo/" on GitHub Pages
const routes = ["/"];

const server = (await import("../dist/server/index.mjs")).default;

for (const route of routes) {
  const url = new URL(join(base, route).replaceAll("\\", "/"), "http://localhost");
  const response = await server.fetch(new Request(url));
  if (!response.ok) {
    throw new Error(`Failed to render ${url.pathname}: HTTP ${response.status}`);
  }
  const html = await response.text();
  // Strip the base prefix so "/<repo>/" maps to dist/client/index.html.
  const relative = url.pathname.slice(base.length - 1).replace(/^\//, "");
  const outFile = join("dist/client", relative || "", "index.html");
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`Rendered ${url.pathname} -> ${outFile}`);
}
