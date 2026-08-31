import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed, non-interactive background: dark base + slowly drifting gradient orbs
 * and a masked grid for depth. Purely decorative.
 */
export function AnimatedBackground() {
  const reduced = useReducedMotion();

  const orbs = [
    {
      className: "h-[38rem] w-[38rem] -left-40 -top-40 bg-primary",
      drift: { x: [0, 70, 0], y: [0, 50, 0] },
      duration: 22,
    },
    {
      className: "h-[32rem] w-[32rem] right-[-8rem] top-[12%] bg-violet",
      drift: { x: [0, -60, 0], y: [0, 70, 0] },
      duration: 26,
    },
    {
      className: "h-[30rem] w-[30rem] left-[20%] top-[55%] bg-cyan",
      drift: { x: [0, 90, 0], y: [0, -60, 0] },
      duration: 30,
    },
    {
      className: "h-[34rem] w-[34rem] right-[10%] bottom-[-10rem] bg-primary",
      drift: { x: [0, -50, 0], y: [0, -40, 0] },
      duration: 28,
    },
  ];

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-background" />
      <div className="grid-lines absolute inset-0" />
      {orbs.map((orb, i) =>
        reduced ? (
          <div key={i} className={`glow-orb opacity-25 ${orb.className}`} />
        ) : (
          <motion.div
            key={i}
            className={`glow-orb ${orb.className}`}
            animate={{ ...orb.drift, opacity: [0.22, 0.4, 0.22] }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ),
      )}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_100%)]" />
    </div>
  );
}
