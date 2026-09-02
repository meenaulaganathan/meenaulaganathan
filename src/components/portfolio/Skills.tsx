import { motion } from "framer-motion";
import { Boxes, Code2, Database, Github, Globe, Wrench, type LucideIcon } from "lucide-react";
import { skills } from "@/data/portfolio";
import { RevealGroup, card3d } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

const skillIcon: Record<string, LucideIcon> = {
  Java: Code2,
  C: Code2,
  SQL: Database,
  HTML: Globe,
  CSS: Globe,
  JavaScript: Code2,
  "React.js": Boxes,
  Git: Wrench,
  GitHub: Github,
};

export function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading
        label="Skills"
        title="Technologies I"
        accent="work with"
        description="Languages, frameworks and tools I use to build software and backend systems."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {skills.map((skill) => {
          const Icon = skillIcon[skill] ?? Code2;
          return (
            <motion.article
              key={skill}
              variants={card3d}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ duration: 0.35 }}
              style={{ transformPerspective: 900 }}
              className="glass card-glow group flex flex-col items-center justify-center rounded-2xl p-6 text-center"
            >
              <span className="glass inline-flex size-11 items-center justify-center rounded-xl">
                <Icon className="size-5 text-accent" />
              </span>
              <h3 className="font-display mt-4 text-lg font-semibold">{skill}</h3>
            </motion.article>
          );
        })}
      </RevealGroup>
    </SectionShell>
  );
}
