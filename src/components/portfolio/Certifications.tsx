import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Award, BadgeCheck, BookOpen, GraduationCap, ShieldCheck } from "lucide-react";
import { certifications } from "@/data/portfolio";
import { EASE } from "./motion-primitives";

const certificationIcons = [ShieldCheck, BadgeCheck, Award];

export function Certifications() {
  const reduced = useReducedMotion();

  return (
    <section id="certifications" className="certifications-stage relative isolate scroll-mt-24 overflow-hidden px-5 py-24 sm:px-8 md:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {["left-[8%] top-[16%]", "right-[12%] top-[28%]", "left-[18%] bottom-[14%]", "right-[28%] bottom-[9%]"].map((position, index) => (
          <motion.span
            key={position}
            className={`absolute size-1 rounded-full bg-cert-accent/45 ${position}`}
            animate={reduced ? undefined : { y: [0, -9, 0], opacity: [0.28, 0.7, 0.28] }}
            transition={{ duration: 4.5 + index * 0.7, repeat: Infinity, ease: "easeInOut", delay: index * 0.45 }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:gap-20">
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <p className="font-mono text-xs font-semibold tracking-[0.18em] text-cert-accent uppercase">
              My Education &amp; Certifications
            </p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl leading-tight font-bold text-cert-foreground sm:text-5xl md:text-6xl">
              Professional Certifications
            </h2>
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.65, delay: reduced ? 0 : 0.12, ease: EASE }}
              className="mt-6 max-w-2xl text-base leading-8 text-cert-muted sm:text-lg"
            >
              Focused learning in privacy, Python and data analytics, complementing my academic foundation in information technology.
            </motion.p>
          </motion.div>

          <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, x: 28, rotateY: -12 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            animate={reduced ? undefined : { y: [0, -8, 0] }}
            transition={reduced ? { duration: 0 } : { opacity: { duration: 0.75, ease: EASE }, x: { duration: 0.75, ease: EASE }, rotateY: { duration: 0.75, ease: EASE }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
            className="relative mx-auto aspect-[4/3] w-full max-w-md [perspective:1000px]"
          >
            <div className="certification-glass absolute inset-x-[9%] top-[8%] bottom-[13%] rotate-[-4deg] rounded-lg" />
            <div className="absolute inset-x-[15%] top-[15%] bottom-[6%] rotate-[5deg] rounded-lg border border-cert-border bg-cert-surface shadow-[var(--shadow-certification)]" />
            <div className="certification-glass absolute inset-x-[12%] top-[11%] bottom-[10%] flex rotate-[1deg] flex-col items-center justify-center rounded-lg px-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full border border-cert-border bg-cert-accent/15 text-cert-accent">
                <GraduationCap className="size-8" />
              </div>
              <div className="mt-6 h-px w-3/5 bg-cert-border" />
              <div className="mt-4 h-1.5 w-2/5 rounded-full bg-cert-accent/45" />
              <div className="mt-3 h-1 w-3/5 rounded-full bg-cert-muted/25" />
              <BookOpen className="mt-6 size-5 text-cert-muted" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid gap-5 lg:grid-cols-3">
          {certifications.map((certification, i) => {
            const Icon = certificationIcons[i] ?? Award;
            return (
              <motion.article
                key={certification.name}
                initial={reduced ? false : { opacity: 0, y: 34, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.28 }}
                whileHover={reduced ? undefined : { y: -7, rotateX: 1.5 }}
                transition={{ duration: 0.58, delay: reduced ? 0 : i * 0.1, ease: EASE }}
                className="certification-glass group relative flex min-h-72 flex-col rounded-lg p-7 transition-[border-color,box-shadow] duration-300 hover:border-cert-accent/55 hover:shadow-[var(--shadow-certification-hover)] sm:p-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-md border border-cert-border bg-cert-accent/10 text-cert-accent">
                    <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                  </div>
                  <time dateTime={certification.year} className="rounded-full border border-cert-border bg-cert-background/35 px-3 py-1 font-mono text-xs font-semibold text-cert-muted">
                    {certification.year}
                  </time>
                </div>

                <h3 className="mt-8 font-display text-xl leading-snug font-semibold text-cert-foreground sm:text-2xl">
                  {certification.name}
                </h3>

                <div className="mt-auto flex items-end justify-between gap-5 pt-8">
                  <div>
                    <p className="text-[0.68rem] font-semibold tracking-[0.16em] text-cert-muted uppercase">Provider</p>
                    <p className="mt-1 text-sm font-semibold tracking-wide text-cert-accent uppercase">{certification.organization}</p>
                  </div>
                  <motion.span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-full border border-cert-border text-cert-accent"
                    whileHover={reduced ? undefined : { x: 2, y: -2 }}
                    transition={{ duration: 0.22 }}
                  >
                    <ArrowUpRight className="size-4" />
                  </motion.span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>