// Produces plain static HTML for GitHub Pages.
// Preferred path: if the build emitted a server bundle, render the page HTML
// once at build time. Fallback: generate a small shell that loads the client
// bundle so the app renders in the browser. Either way the deployed output in
// dist/client is 100% static files — no server is needed at runtime.
import { readdir, writeFile, copyFile, access } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.STATIC_BASE ?? "/"; // e.g. "/my-repo/" on GitHub Pages
const basePrefix = base.replace(/\/$/, "");
const clientDir = "dist/client";

const exists = async (p) => {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
};

async function renderWithServerBundle() {
  const server = (await import("../dist/server/index.mjs")).default;
  const url = new URL(`${basePrefix}/`, "http://localhost");
  const response = await server.fetch(new Request(url), {}, { waitUntil() {}, passThroughOnException() {} });
  if (!response.ok) throw new Error(`SSR render failed: HTTP ${response.status}`);
  return await response.text();
}

async function renderShell() {
  const assets = await readdir(join(clientDir, "assets"));
  const entry = assets.find((f) => /^index-.*\.js$/.test(f));
  if (!entry) throw new Error("Could not find the client entry bundle in dist/client/assets");
  const css = assets.filter((f) => f.endsWith(".css"));
  const href = (file) => `${basePrefix}/assets/${file}`;
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${basePrefix}/favicon.ico" />
${css.map((f) => `    <link rel="stylesheet" href="${href(f)}" />`).join("\n")}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${href(entry)}"></script>
  </body>
</html>
`;
}

let html;
if (await exists("dist/server/index.mjs")) {
  try {
    html = await renderWithServerBundle();
    console.log("Rendered / from the server bundle");
  } catch (error) {
    console.warn(`Server render unavailable (${error.message}); falling back to client shell`);
  }
}
if (!html) {
  html = await renderShell();
  console.log("Generated static client shell");
}

await writeFile(join(clientDir, "index.html"), html);
// GitHub Pages serves 404.html for unknown paths; reuse the page so client
// side routing keeps working on deep links and refreshes.
await copyFile(join(clientDir, "index.html"), join(clientDir, "404.html"));
// Prevent GitHub Pages' Jekyll processing from dropping files/folders.
await writeFile(join(clientDir, ".nojekyll"), "");
console.log(`Wrote ${clientDir}/index.html and 404.html (base ${base})`);
