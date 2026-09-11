import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Check, Terminal } from "lucide-react";
import { projects } from "@/data/portfolio";
import { useIsMobile } from "@/hooks/use-mobile";
import { EASE } from "./motion-primitives";
import { Chip, SectionHeading, SectionShell } from "./ui-bits";

const mobileVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const reducedVariant: Variants = {
  hidden: { opacity: 1, x: 0, y: 0 },
  visible: { opacity: 1, x: 0, y: 0 },
};

function desktopVariant(index: number): Variants {
  switch (index) {
    case 0:
      return { hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0 } };
    case 1:
      return { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } };
    default:
      return { hidden: { opacity: 0, x: 60 }, visible: { opacity: 1, x: 0 } };
  }
}

export function Projects() {
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  return (
    <SectionShell id="projects">
      <SectionHeading
        label="Projects"
        title="Things I've"
        accent="designed and built"
        description="Academic and self-driven projects spanning systems programming, full-stack development and applied machine learning."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {projects.map((project, i) => {
          const variants = reduced
            ? reducedVariant
            : isMobile
              ? mobileVariant
              : desktopVariant(i);

          return (
            <motion.article
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={variants}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.12 }}
              whileHover={reduced ? {} : { y: -10, rotateX: 5, rotateY: -5 }}
              style={{ transformPerspective: 1100 }}
              className="glass card-glow flex flex-col overflow-hidden rounded-3xl"
            >
              {/* Abstract animated cover */}
              <div className="relative h-40 overflow-hidden border-b border-border">
                <div className="bg-brand absolute inset-0 opacity-25" />
                <div className="grid-lines absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    animate={reduced ? {} : { y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    whileHover={reduced ? {} : { scale: 1.08, rotate: -4 }}
                    className="glass inline-flex size-14 items-center justify-center rounded-2xl"
                  >
                    <Terminal className="size-6 text-accent" />
                  </motion.span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="font-mono text-[0.7rem] tracking-widest text-muted-foreground uppercase">
                  {project.tagline}
                </p>
                <h3 className="mt-3 font-display text-xl leading-snug font-semibold">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5 text-sm text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}
