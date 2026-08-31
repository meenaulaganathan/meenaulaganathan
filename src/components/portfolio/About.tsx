import { motion } from "framer-motion";
import { Braces, Database, Rocket, Server } from "lucide-react";
import { highlights, profile } from "@/data/portfolio";
import { Reveal, RevealGroup, fadeUp, slideLeft, slideRight } from "./motion-primitives";
import { Chip, SectionHeading, SectionShell } from "./ui-bits";

const icons = [Server, Braces, Database, Rocket];

export function About() {
  return (
    <SectionShell id="about">
      <SectionHeading
        label="About"
        title="A developer who cares about"
        accent="what happens behind the screen"
      />

      <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal variants={slideLeft} className="glass card-glow rounded-3xl p-7 sm:p-9">
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            I'm an <span className="text-foreground">Information Technology graduate</span> with a
            strong interest in software and backend development. Most of my time goes into writing
            Java, modelling data with SQL, and understanding how requests, logic and storage fit
            together inside an application.
          </p>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Alongside the fundamentals — object-oriented design, data structures and algorithms — I
            build interfaces with React.js so I can ship a feature end to end. I like clean code,
            readable structure, and solving problems that have a measurable outcome.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {["Java", "SQL", "React.js", "Data Structures", "Backend", "Git"].map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-5 border-t border-border pt-7 sm:grid-cols-3">
            {[
              { k: "Degree", v: "B.Tech IT" },
              { k: "Focus", v: "Backend" },
              { k: "Based in", v: profile.location },
            ].map((item) => (
              <div key={item.k}>
                <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                  {item.k}
                </dt>
                <dd className="mt-1.5 font-display text-base font-semibold">{item.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <RevealGroup className="grid gap-4 sm:grid-cols-2" gap={0.1}>
          {highlights.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <motion.article
                key={item.title}
                variants={i % 2 === 0 ? slideRight : fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="glass card-glow rounded-2xl p-6"
              >
                <span className="bg-brand inline-flex size-10 items-center justify-center rounded-xl text-primary-foreground">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </motion.article>
            );
          })}
        </RevealGroup>
      </div>
    </SectionShell>
  );
}
