import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { RevealGroup, fadeUp } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

export function Certifications() {
  return (
    <SectionShell id="certifications" className="pt-8 md:pt-12">
      <SectionHeading label="Certifications" title="Professional" accent="certifications" />

      <RevealGroup className="mx-auto mt-14 max-w-4xl" gap={0.1} amount={0.15}>
        {certifications.map((certification) => (
          <motion.article
            key={certification.name}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
            className="group grid gap-4 border-b border-border py-7 first:border-t sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-center sm:gap-6"
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-border bg-secondary/60 text-brand transition-colors duration-300 group-hover:border-primary/60 group-hover:bg-brand/10">
              <Award className="size-4" aria-hidden="true" />
            </span>

            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl">
                {certification.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-accent">{certification.organization}</p>
            </div>

            <time
              dateTime={certification.year}
              className="font-mono text-sm font-medium text-muted-foreground sm:text-right"
            >
              {certification.year}
            </time>
          </motion.article>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}