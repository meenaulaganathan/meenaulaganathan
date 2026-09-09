// Produces plain static HTML for GitHub Pages from the client build only.
// No SSR / dist/server output is required: we generate a small shell that
// loads the client bundle, and the app renders in the browser.
import { readdir, writeFile, copyFile } from "node:fs/promises";
import { join } from "node:path";

const base = process.env.STATIC_BASE ?? "/"; // e.g. "/my-repo/" on GitHub Pages
const clientDir = "dist/client";
const assets = await readdir(join(clientDir, "assets"));

const entry = assets.find((f) => /^index-.*\.js$/.test(f));
const css = assets.filter((f) => f.endsWith(".css"));
if (!entry) {
  throw new Error("Could not find the client entry bundle in dist/client/assets");
}

const href = (file) => `${base.replace(/\/$/, "")}/assets/${file}`;

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="${base.replace(/\/$/, "")}/favicon.ico" />
${css.map((f) => `    <link rel="stylesheet" href="${href(f)}" />`).join("\n")}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${href(entry)}"></script>
  </body>
</html>
`;

await writeFile(join(clientDir, "index.html"), html);
// GitHub Pages serves 404.html for unknown paths; reuse the shell so client
// side routing keeps working on deep links and refreshes.
await copyFile(join(clientDir, "index.html"), join(clientDir, "404.html"));
// Prevent GitHub Pages' Jekyll processing from dropping files/folders.
await writeFile(join(clientDir, ".nojekyll"), "");
console.log(`Wrote ${clientDir}/index.html (base ${base})`);
