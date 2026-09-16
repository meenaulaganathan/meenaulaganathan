import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Braces, Coffee, Database, Download, FolderCode, Mail } from "lucide-react";
import { useRef } from "react";
import portraitAsset from "@/assets/meena-portrait.jpg.asset.json";
import { profile } from "@/data/portfolio";
import { EASE, stagger } from "./motion-primitives";
import { ActionLink, SectionLabel } from "./ui-bits";
import { ViewResumeAction } from "./ViewResumeAction";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function PortraitVisual({ reduced }: { reduced: boolean }) {
  const float = (delay: number, distance = 7) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -distance, 0] },
          transition: { duration: 4, delay, repeat: Infinity, ease: "easeInOut" as const },
        };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
      className="relative mx-auto flex h-full w-full max-w-[27rem] items-center justify-center px-8 py-5 sm:px-10"
    >
      <motion.figure
        {...(reduced ? {} : { whileHover: { y: -5, rotate: 0.5 } })}
        transition={{ duration: 0.35, ease: EASE }}
        className="portrait-frame relative aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-[1.75rem] border border-primary/70 p-2 sm:max-w-[22rem]"
      >
        <div className="h-full overflow-hidden rounded-[1.35rem] bg-card">
          <img
            src={portraitAsset.url}
            alt={`${profile.fullName}, aspiring software and backend developer`}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </motion.figure>

      <motion.div
        {...float(0.1)}
        aria-hidden
        className="glass absolute top-[15%] left-0 flex size-12 items-center justify-center rounded-lg text-accent sm:size-14"
      >
        <Coffee className="size-5 sm:size-6" />
      </motion.div>
      <motion.div
        {...float(0.7, 6)}
        aria-hidden
        className="glass absolute top-[31%] right-0 flex size-11 items-center justify-center rounded-lg text-accent sm:size-13"
      >
        <Braces className="size-5" />
      </motion.div>
      <motion.div
        {...float(1.25, 8)}
        aria-hidden
        className="glass absolute right-[3%] bottom-[16%] flex size-12 items-center justify-center rounded-lg text-accent sm:size-14"
      >
        <Database className="size-5 sm:size-6" />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

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

        {/* Professional portrait */}
        <div className="relative h-[24rem] w-full sm:h-[29rem] lg:h-[34rem]">
          <PortraitVisual reduced={reduced} />
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
