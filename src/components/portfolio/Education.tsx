import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { BookOpen, GraduationCap, School } from "lucide-react";
import { useRef } from "react";
import { education } from "@/data/portfolio";
import { EASE } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

const educationIcons = [School, BookOpen, GraduationCap];

export function Education() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 42%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 0.92], [0, 1]);

  return (
    <SectionShell id="education">
      <SectionHeading label="Education" title="Academic" accent="background" />

      <div ref={ref} className="relative mx-auto mt-16 max-w-5xl">
        <div className="relative h-px overflow-hidden bg-border" aria-hidden="true">
          <motion.div
            style={{ scaleX: reduced ? 1 : lineScale }}
            className="bg-brand absolute inset-0 origin-left"
          />
        </div>

        <ol>
          {education.map((item, i) => (
            <li key={item.degree} className="border-b border-border">
              <motion.article
                initial={reduced ? false : { opacity: 0, x: i % 2 === 0 ? -28 : 28, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.62, delay: reduced ? 0 : i * 0.08, ease: EASE }}
                whileHover={reduced ? {} : { x: 5 }}
                className="group grid gap-6 py-9 sm:grid-cols-[7rem_minmax(0,1fr)] md:grid-cols-[9rem_minmax(0,0.9fr)_minmax(16rem,1.1fr)] md:gap-10 md:py-11"
              >
                <div className="flex items-start justify-between gap-4 sm:block">
                  <span className="font-mono text-xs tracking-widest text-accent uppercase">{item.period}</span>
                  <span className="font-display text-sm text-muted-foreground sm:mt-4 sm:block">0{i + 1}</span>
                </div>
                <div>
                  {(() => {
                    const Icon = educationIcons[i] ?? GraduationCap;
                    return <Icon className="mb-4 size-5 text-brand transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />;
                  })()}
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{item.degree}</h3>
                  {item.institution && <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.institution}</p>}
                </div>
                <div className="md:pt-9">
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-brand">
                    {item.percentage && <span>Percentage: {item.percentage}</span>}
                    {item.stream && <span>Stream: {item.stream}</span>}
                    {item.cgpa && <span>CGPA: {item.cgpa}</span>}
                  </div>
                  {item.coursework && item.coursework.length > 0 && (
                    <ul className="mt-4 grid gap-x-6 gap-y-2 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                      {item.coursework.map((course) => <li key={course}>— {course}</li>)}
                    </ul>
                  )}
                  {item.detail && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>}
                </div>
              </motion.article>
            </li>
          ))}
        </ol>
      </div>
    </SectionShell>
  );
}
