import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useRef } from "react";
import { education } from "@/data/portfolio";
import { EASE } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

export function Education() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <SectionShell id="education">
      <SectionHeading label="Education" title="Academic" accent="background" />

      <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
        {/* Timeline rail that draws itself as the section scrolls */}
        <div className="absolute top-0 bottom-0 left-4 w-px bg-border md:left-1/2" />
        <motion.div
          style={{ scaleY: reduced ? 1 : lineScale }}
          className="bg-brand absolute top-0 bottom-0 left-4 w-px origin-top md:left-1/2"
        />

        <ol className="space-y-10">
          {education.map((item, i) => (
            <li key={item.degree} className="relative pl-12 md:pl-0">
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="bg-brand absolute top-6 left-4 z-10 flex size-8 -translate-x-1/2 items-center justify-center rounded-full text-primary-foreground md:left-1/2"
              >
                <GraduationCap className="size-4" />
              </motion.span>

              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.65, ease: EASE }}
                whileHover={{ y: -5 }}
                className={`glass card-glow rounded-2xl p-6 md:w-[calc(50%-2.5rem)] ${
                  i % 2 === 0 ? "md:mr-auto md:text-right" : "md:ml-auto"
                }`}
              >
                <span className="font-mono text-xs tracking-widest text-accent uppercase">
                  {item.period}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold">{item.degree}</h3>
                <p className="mt-1 text-sm text-foreground/80">{item.institution}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </motion.div>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
