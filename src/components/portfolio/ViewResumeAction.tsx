import { FileText } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { ActionButton } from "./ui-bits";

const BLOB_LIFETIME_MS = 10 * 60 * 1000;

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
    if (resumeTab) {
      resumeTab.document.title = "Opening resume…";
      resumeTab.document.body.textContent = "Opening resume…";
    }

    setLoading(true);
    try {
      const resumeSource = profile.resumeViewPath.split("#", 1)[0];
      const response = await fetch(resumeSource, { cache: "force-cache" });
      if (!response.ok) throw new Error(`Resume request failed (${response.status})`);

      const bytes = await response.blob();
      if (bytes.size === 0) throw new Error("The resume file is empty");

      const pdf = bytes.type === "application/pdf" ? bytes : bytes.slice(0, bytes.size, "application/pdf");
      const blobUrl = URL.createObjectURL(pdf);
      blobUrls.current.add(blobUrl);

      if (resumeTab && !resumeTab.closed) {
        resumeTab.location.replace(`${blobUrl}#view=FitH`);
        resumeTab.opener = null;
      } else {
        // Fallback when the browser blocks new tabs: keep the PDF visible by
        // opening it in the current tab instead of failing silently.
        window.location.assign(`${blobUrl}#view=FitH`);
      }

      window.setTimeout(() => revokeBlobUrl(blobUrl), BLOB_LIFETIME_MS);
    } catch (error) {
      if (resumeTab && !resumeTab.closed) resumeTab.close();
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