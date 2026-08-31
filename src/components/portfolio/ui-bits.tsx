import { motion } from "framer-motion";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE, Reveal, fadeUp } from "./motion-primitives";

/** Small uppercase label above section titles. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 font-mono text-xs tracking-widest text-muted-foreground uppercase">
      <span className="bg-brand size-1.5 rounded-full" />
      {children}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent?: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <Reveal variants={fadeUp}>
        <SectionLabel>{label}</SectionLabel>
      </Reveal>
      <Reveal variants={fadeUp} delay={0.08}>
        <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-[2.75rem]">
          {title} {accent && <span className="text-gradient">{accent}</span>}
        </h2>
      </Reveal>
      {description && (
        <Reveal variants={fadeUp} delay={0.16}>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

type ButtonBase = {
  variant?: "primary" | "outline" | "ghost";
  size?: "md" | "lg";
  children: ReactNode;
  className?: string;
};

const styles = {
  base: "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none disabled:opacity-60",
  size: { md: "px-5 py-2.5 text-sm", lg: "px-6 py-3.5 text-sm sm:text-base" },
  variant: {
    primary: "bg-brand text-primary-foreground shadow-[var(--shadow-glow)]",
    outline: "glass text-foreground hover:border-primary/60",
    ghost: "text-muted-foreground hover:text-foreground",
  },
};

function classesFor({ variant = "primary", size = "lg", className }: ButtonBase) {
  return cn(styles.base, styles.size[size], styles.variant[variant], className);
}

const hover = { scale: 1.04, y: -2 };
const tap = { scale: 0.97 };
const transition = { duration: 0.25, ease: EASE };

/** Animated anchor-style action (links, downloads). */
export function ActionLink({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonBase & ComponentProps<"a">) {
  return (
    <motion.a
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      className={classesFor({ variant, size, className })}
      {...rest}
    >
      {children}
    </motion.a>
  );
}

/** Animated button-style action. */
export function ActionButton({
  variant,
  size,
  className,
  children,
  ...rest
}: ButtonBase & ComponentProps<"button">) {
  return (
    <motion.button
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      className={classesFor({ variant, size, className })}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-[0.7rem] tracking-wide text-muted-foreground">
      {children}
    </span>
  );
}

/** Consistent section wrapper with generous vertical rhythm. */
export function SectionShell({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("relative scroll-mt-24 px-5 py-24 sm:px-8 md:py-32", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
