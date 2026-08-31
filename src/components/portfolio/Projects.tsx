import { motion } from "framer-motion";
import { ArrowUpRight, Check, Terminal } from "lucide-react";
import { projects } from "@/data/portfolio";
import { RevealGroup, card3d } from "./motion-primitives";
import { ActionLink, Chip, SectionHeading, SectionShell } from "./ui-bits";

export function Projects() {
  return (
    <SectionShell id="projects">
      <SectionHeading
        label="Projects"
        title="Things I've"
        accent="designed and built"
        description="Academic and self-driven projects spanning systems programming, full-stack development and applied machine learning."
      />

      <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" gap={0.12} amount={0.12}>
        {projects.map((project) => (
          <motion.article
            key={project.title}
            variants={card3d}
            whileHover={{ y: -10, rotateX: 5, rotateY: -5 }}
            transition={{ duration: 0.4 }}
            style={{ transformPerspective: 1100 }}
            className="glass card-glow flex flex-col overflow-hidden rounded-3xl"
          >
            {/* Abstract animated cover — no stock imagery needed */}
            <div className="relative h-40 overflow-hidden border-b border-border">
              <div className="bg-brand absolute inset-0 opacity-25" />
              <motion.div
                className="glow-orb bg-cyan top-0 left-1/4 h-40 w-40"
                animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <div className="grid-lines absolute inset-0 opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  whileHover={{ scale: 1.08, rotate: -4 }}
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

              {/* Rendered only when a real project link exists in data/portfolio.ts */}
              {project.link && (
                <div className="mt-6 pt-1">
                  <ActionLink
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    size="md"
                    variant="outline"
                  >
                    View Project <ArrowUpRight className="size-4" />
                  </ActionLink>
                </div>
              )}
            </div>
          </motion.article>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
