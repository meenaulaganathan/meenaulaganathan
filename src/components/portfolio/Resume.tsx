import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Reveal, scaleFade } from "./motion-primitives";
import { ActionLink, SectionHeading, SectionShell } from "./ui-bits";
import { ViewResumeAction } from "./ViewResumeAction";

export function Resume() {
  return (
    <SectionShell id="resume">
      <SectionHeading
        label="Resume"
        title="My complete"
        accent="profile in one page"
        description="Skills, projects, education and coursework — open it in the browser or download a copy."
      />

      <Reveal variants={scaleFade} className="mx-auto mt-14 max-w-4xl">
        <div className="glass card-glow relative overflow-hidden rounded-3xl p-7 sm:p-10">
          <div className="glow-orb bg-violet -top-24 -right-16 h-64 w-64" />

          <div className="relative grid items-center gap-8 sm:grid-cols-[auto_1fr]">
            {/* Resume preview card */}
            <motion.div
              whileHover={{ rotateY: -10, rotateX: 6, y: -6 }}
              transition={{ duration: 0.4 }}
              style={{ transformPerspective: 900 }}
              className="glass mx-auto w-40 shrink-0 overflow-hidden rounded-xl p-2 sm:w-48"
            >
              <img
                src={resumePreview.url}
                alt={`First page of ${profile.fullName}'s resume`}
                loading="lazy"
                className="w-full rounded-lg"
              />
              <div className="mt-2 flex items-center justify-center gap-2 text-muted-foreground">
                <FileText className="size-3.5" />
                <span className="font-mono text-[0.6rem] tracking-wide">PDF</span>
              </div>
            </motion.div>


            <div>
              <h3 className="font-display text-2xl font-semibold">{profile.fullName}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {profile.title} · {profile.subtitle}
              </p>
              <ul className="mt-5 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                <li>• Java, C, SQL fundamentals</li>
                <li>• React.js, HTML, CSS, JavaScript</li>
                <li>• 3 hands-on academic projects</li>
                <li>• Git &amp; GitHub workflow</li>
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <ViewResumeAction />
                <ActionLink
                  href={profile.resumePath}
                  download={profile.resumeFileName}
                  variant="outline"
                >
                  <Download className="size-4" /> Download Resume
                </ActionLink>
              </div>

              {/* Update the resume file by replacing the asset in src/assets/Meena-Resume.pdf.asset.json */}
              <p className="mt-4 font-mono text-xs text-muted-foreground">
                {profile.resumeViewPath}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}
