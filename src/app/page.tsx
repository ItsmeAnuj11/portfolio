"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";


import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Activities from "@/components/Activities";
import Certificates from "@/components/Certificates";
import GitHubSection from "@/components/GitHubSection";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";

// Flow stages
type Stage = "loading" | "welcome" | "hero" | "main";

export default function Home() {
  const [stage, setStage] = useState<Stage>("hero");
  const handleExplore = useCallback(() => setStage("main"), []);

  return (
    <>
      {/* Custom cursor glow — desktop only */}
      <CursorGlow />



      {/* ── Hero ── */}
      <AnimatePresence>
        {(stage === "hero" || stage === "main") && (
          <motion.div
            key="hero-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Hero onExplore={handleExplore} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main site ── */}
      <AnimatePresence>
        {stage === "main" && (
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Navbar visible={true} />
            <main>
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Education />
              <Activities />
              <Certificates />
              <GitHubSection />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
