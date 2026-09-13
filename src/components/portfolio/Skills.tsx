import { motion } from "framer-motion";
import { skills } from "@/data/portfolio";
import { RevealGroup, fadeUp } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

export function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading
        label="Skills"
        title="Technologies I"
        accent="work with"
        description="Languages, frameworks and tools I use to build software and backend systems."
      />

      <RevealGroup
        className="mt-16 grid gap-x-16 gap-y-0 md:grid-cols-2"
        gap={0.09}
      >
        {skills.map((skill) => (
          <motion.article
            key={skill.name}
            variants={fadeUp}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.3 }}
            className="group border-b border-border py-8 first:pt-0 md:[&:nth-child(2)]:pt-0"
          >
            <h3 className="font-display text-2xl font-semibold text-foreground transition-colors duration-300 group-hover:text-accent">
              {skill.name}
            </h3>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-muted-foreground">
              {skill.purpose}
            </p>
          </motion.article>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
