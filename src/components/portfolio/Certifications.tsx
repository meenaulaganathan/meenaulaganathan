import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Award, BadgeCheck, ShieldCheck } from "lucide-react";
import { useRef } from "react";
import { certifications } from "@/data/portfolio";
import { EASE } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

const certificationIcons = [ShieldCheck, BadgeCheck, Award];

export function Certifications() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 82%", "end 42%"] });
  const lineScale = useTransform(scrollYProgress, [0, 0.92], [0, 1]);

  return (
    <SectionShell id="certifications" className="pt-8 md:pt-12">
      <SectionHeading label="Certifications" title="Professional" accent="certifications" />

      <div ref={ref} className="mx-auto mt-16 max-w-5xl">
        <div className="relative h-px overflow-hidden bg-border" aria-hidden="true">
          <motion.div style={{ scaleX: reduced ? 1 : lineScale }} className="bg-brand absolute inset-0 origin-left" />
        </div>
        {certifications.map((certification, i) => {
          const Icon = certificationIcons[i] ?? Award;
          return (
          <motion.article
            key={certification.name}
            initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -34 : 34, y: 18, scale: 0.985 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            whileHover={reduced ? undefined : { x: i % 2 === 0 ? 5 : -5 }}
            transition={{ duration: 0.58, delay: reduced ? 0 : i * 0.09, ease: EASE }}
            className="group grid gap-4 border-b border-border py-8 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:gap-7 md:py-10"
          >
            <Icon className="size-5 text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105" aria-hidden="true" />

            <div className="min-w-0">
              <h3 className="font-display text-lg font-semibold text-foreground sm:text-xl md:text-2xl">
                {certification.name}
              </h3>
              <p className="mt-2 text-sm font-semibold tracking-wide text-accent uppercase">{certification.organization}</p>
            </div>

            <time
              dateTime={certification.year}
              className="font-mono text-sm font-medium text-muted-foreground sm:text-right"
            >
              {certification.year}
            </time>
          </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}