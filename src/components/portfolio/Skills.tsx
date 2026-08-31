import { motion } from "framer-motion";
import { Boxes, Code2, Database, Globe, Lightbulb, Wrench } from "lucide-react";
import { skillGroups } from "@/data/portfolio";
import { RevealGroup, card3d } from "./motion-primitives";
import { SectionHeading, SectionShell } from "./ui-bits";

const icons = [Code2, Database, Globe, Boxes, Wrench, Lightbulb];

export function Skills() {
  return (
    <SectionShell id="skills">
      <SectionHeading
        label="Skills"
        title="The toolkit I"
        accent="build with"
        description="Grouped by what they're used for — no invented proficiency percentages, just the technologies I actually work in."
      />

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
        {skillGroups.map((group, i) => {
          const Icon = icons[i % icons.length];
          return (
            <motion.article
              key={group.category}
              variants={card3d}
              whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
              transition={{ duration: 0.35 }}
              style={{ transformPerspective: 900 }}
              className="glass card-glow group rounded-2xl p-6"
            >
              <div className="flex items-center gap-3">
                <span className="glass inline-flex size-11 items-center justify-center rounded-xl">
                  <Icon className="size-5 text-accent" />
                </span>
                <h3 className="font-display text-lg font-semibold">{group.category}</h3>
              </div>

              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item}>
                    <div className="flex items-center justify-between text-sm">
                      <span>{item}</span>
                      <span className="font-mono text-[0.7rem] text-muted-foreground">
                        ▚▚▚
                      </span>
                    </div>
                    {/* Decorative capability bar — not a proficiency score */}
                    <motion.div
                      className="mt-2 h-[3px] overflow-hidden rounded-full bg-secondary"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                    >
                      <motion.span
                        className="bg-brand block h-full origin-left rounded-full"
                        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </RevealGroup>
    </SectionShell>
  );
}
