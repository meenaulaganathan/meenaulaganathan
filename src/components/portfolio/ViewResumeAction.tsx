import { FileText } from "lucide-react";
import { useCallback } from "react";
import { toast } from "sonner";
import { profile } from "@/data/portfolio";
import { ActionButton } from "./ui-bits";

export function ViewResumeAction() {
  const viewResume = useCallback(() => {
    // Resolve against the current origin + base path so this works locally,
    // on Lovable and on GitHub Pages (/meenaulaganathan/).
    const url = new URL(profile.resumeViewPath, window.location.href).toString();
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      toast.error("Please allow pop-ups to open the resume in a new tab.");
    }
  }, []);

  return (
    <ActionButton type="button" onClick={viewResume}>
      <FileText className="size-4" /> View Resume
    </ActionButton>
  );
}
