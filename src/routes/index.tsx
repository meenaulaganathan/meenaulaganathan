import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import { AnimatedBackground } from "@/components/portfolio/AnimatedBackground";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Education } from "@/components/portfolio/Education";
import { Resume } from "@/components/portfolio/Resume";
import { Contact } from "@/components/portfolio/Contact";
import { profile } from "@/data/portfolio";

const title = "Meena — B.Tech IT Graduate & Aspiring Backend Developer";
const description =
  "Portfolio of Meena, a B.Tech Information Technology graduate and aspiring software / backend developer working with Java, SQL and React.js.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      {/* Cinematic page entrance */}
      <motion.main
        initial={{ opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Resume />
        <Contact />
      </motion.main>

      <footer className="border-t border-border px-5 py-8 text-center text-sm text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} {profile.fullName}. Built with React, Framer Motion and Three.js.
      </footer>
      <Toaster />
    </>
  );
}
