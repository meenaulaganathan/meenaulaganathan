import { FileText } from "lucide-react";
import pdfWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { ActionButton } from "./ui-bits";

const BLOB_LIFETIME_MS = 10 * 60 * 1000;
const RESUME_SOURCE = "/resume/Meena-Resume.pdf";

function prepareViewer(viewerWindow: Window, message: string) {
  const viewer = viewerWindow.document;
  viewer.title = `${profile.fullName} — Resume`;
  viewer.documentElement.style.background = "#303030";
  viewer.body.replaceChildren();
  viewer.body.style.margin = "0";
  viewer.body.style.padding = "24px 12px";
  viewer.body.style.minHeight = "100vh";
  viewer.body.style.boxSizing = "border-box";

  const status = viewer.createElement("p");
  status.textContent = message;
  status.style.margin = "40px auto";
  status.style.color = "#ffffff";
  status.style.font = "16px system-ui, sans-serif";
  status.style.textAlign = "center";
  viewer.body.append(status);
  return status;
}

export function ViewResumeAction() {
  const [loading, setLoading] = useState(false);
  const blobUrls = useRef(new Set<string>());

  const revokeBlobUrl = useCallback((url: string) => {
    if (!blobUrls.current.delete(url)) return;
    URL.revokeObjectURL(url);
  }, []);

  useEffect(
    () => () => {
      for (const url of blobUrls.current) URL.revokeObjectURL(url);
      blobUrls.current.clear();
    },
    [],
  );

  const viewResume = useCallback(async () => {
    if (loading) return;

    // Open during the click event so browser popup protection does not block it
    // while the PDF is being fetched.
    const resumeTab = window.open("", "_blank");
    const viewerWindow = resumeTab ?? window;
    const status = prepareViewer(viewerWindow, "Opening resume…");

    setLoading(true);
    try {
      const response = await fetch(RESUME_SOURCE, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Resume request failed (${response.status})`);

      const bytes = await response.blob();
      if (bytes.size === 0) throw new Error("The resume file is empty");

      const pdf = bytes.type === "application/pdf" ? bytes : bytes.slice(0, bytes.size, "application/pdf");
      const blobUrl = URL.createObjectURL(pdf);
      blobUrls.current.add(blobUrl);

      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;
      const documentTask = pdfjs.getDocument({
        data: new Uint8Array(await pdf.arrayBuffer()),
        ownerDocument: viewerWindow.document,
      });
      const pdfDocument = await documentTask.promise;
      const viewer = viewerWindow.document;
      const pages = viewer.createElement("main");
      pages.setAttribute("aria-label", `${profile.fullName} resume PDF`);
      pages.style.display = "grid";
      pages.style.justifyItems = "center";
      pages.style.gap = "16px";

      for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
        const page = await pdfDocument.getPage(pageNumber);
        const baseViewport = page.getViewport({ scale: 1 });
        const availableWidth = Math.min(1100, viewerWindow.innerWidth - 24);
        const scale = Math.max(0.5, availableWidth / baseViewport.width);
        const viewport = page.getViewport({ scale });
        const canvas = viewer.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Unable to create the resume canvas");
        canvas.width = Math.ceil(viewport.width);
        canvas.height = Math.ceil(viewport.height);
        canvas.style.width = "min(100%, 1100px)";
        canvas.style.height = "auto";
        canvas.style.background = "#ffffff";
        canvas.style.boxShadow = "0 2px 12px rgba(0, 0, 0, 0.35)";
        canvas.setAttribute("aria-label", `Resume page ${pageNumber} of ${pdfDocument.numPages}`);
        pages.append(canvas);
        await page.render({ canvas, canvasContext: context, viewport }).promise;
      }

      status.replaceWith(pages);
      if (resumeTab) resumeTab.opener = null;

      window.setTimeout(() => revokeBlobUrl(blobUrl), BLOB_LIFETIME_MS);
    } catch (error) {
      status.textContent = "Unable to open the resume. Please close this tab and try again.";
      toast.error("Unable to open the resume. Please try again.");
      console.error("Failed to open resume", error);
    } finally {
      setLoading(false);
    }
  }, [loading, revokeBlobUrl]);

  return (
    <ActionButton type="button" onClick={viewResume} disabled={loading} aria-busy={loading}>
      <FileText className="size-4" /> View Resume
    </ActionButton>
  );
}