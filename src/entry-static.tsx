// Client-only entry used for the fully static build (e.g. GitHub Pages).
// No server bundle and no SSR are involved: the app boots in the browser.
import { RouterProvider } from "@tanstack/react-router";
import { hydrateRoot } from "react-dom/client";

import { getRouter } from "./router";

const router = getRouter();

hydrateRoot(document, <RouterProvider router={router} />);
