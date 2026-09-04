import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, FolderCode, Mail } from "lucide-react";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { profile } from "@/data/portfolio";
import { EASE, stagger } from "./motion-primitives";
import { ActionLink, SectionLabel } from "./ui-bits";
import { ViewResumeAction } from "./ViewResumeAction";

// Heavy 3D scene: loaded only in the browser, after hydration.
const HeroScene = lazy(() => import("@/components/three/HeroScene"));

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")),
    );
  } catch {
    return false;
  }
}

/** Static, always-visible fallback for no-WebGL / reduced-motion / low-end devices. */
function SceneFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="bg-brand size-40 rounded-[2rem] opacity-70 blur-[2px] sm:size-56" />
      <div className="glass absolute size-40 rotate-45 rounded-[2rem] sm:size-56" />
      <span className="font-mono absolute text-sm text-muted-foreground">&lt;/&gt;</span>
    </div>
  );
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const [scene, setScene] = useState<"pending" | "on" | "off">("pending");
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    // Skip the 3D scene on low-core devices to keep animations smooth.
    const lowEnd = (navigator.hardwareConcurrency ?? 8) <= 4;
    setScene(hasWebGL() && !lowEnd ? "on" : "off");
  }, []);

  const lines = [
    { text: `Hi, I'm ${profile.firstName}`, className: "text-4xl sm:text-6xl md:text-7xl" },
    { text: profile.title, className: "mt-3 text-lg sm:text-2xl md:text-3xl text-foreground/90" },
    {
      text: profile.subtitle,
      className: "mt-1 text-lg sm:text-2xl md:text-3xl",
      gradient: true,
    },
  ];

  return (
    <section id="home" ref={ref} className="relative min-h-screen scroll-mt-0 overflow-hidden">
      <motion.div
        {...(reduced ? {} : { style: { y: parallaxY, opacity: fade } })}
        className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-5 pt-28 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6"
      >
        {/* Copy */}
        <motion.div
          variants={stagger(0.12, 0.15)}
          initial="hidden"
          animate="show"
          className="relative z-10"
        >
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <SectionLabel>Open to software / backend roles</SectionLabel>
          </motion.div>

          {lines.map((line) => (
            <motion.h1
              key={line.text}
              variants={{
                hidden: { opacity: 0, y: 26, filter: "blur(8px)" },
                show: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.8, ease: EASE }}
              className={`font-bold leading-[1.08] ${line.className}`}
            >
              {line.gradient ? <span className="text-gradient">{line.text}</span> : line.text}
            </motion.h1>
          ))}

          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.7, ease: EASE }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <ViewResumeAction />
            <ActionLink
              href={profile.resumePath}
              download={profile.resumeFileName}
              variant="outline"
            >
              <Download className="size-4" /> Download Resume
            </ActionLink>
            <ActionLink
              href="#projects"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("projects");
              }}
            >
              <FolderCode className="size-4" /> View Projects
            </ActionLink>
            <ActionLink
              href="#contact"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("contact");
              }}
            >
              <Mail className="size-4" /> Contact Me
            </ActionLink>
          </motion.div>
        </motion.div>

        {/* Interactive 3D object */}
        <div className="relative h-[22rem] w-full sm:h-[26rem] lg:h-[34rem]">
          {scene === "on" && !reduced ? (
            <Suspense fallback={<SceneFallback />}>
              <HeroScene reduced={reduced} />
            </Suspense>
          ) : (
            <SceneFallback />
          )}
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll to About"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <motion.span
          {...(reduced ? {} : { animate: { y: [0, 8, 0] } })}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ArrowDown className="size-5" />
        </motion.span>
      </motion.button>
    </section>
  );
}
