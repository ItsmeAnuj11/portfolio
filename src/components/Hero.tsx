"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { identity, typingRoles, tagline } from "@/data/portfolio";

interface HeroProps {
  onExplore: () => void;
}

// Pre-compute particles ONCE outside the component to avoid re-computation
const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  width: (((i * 7 + 3) % 3) + 1).toFixed(1),
  left: ((i * 37 + 11) % 100).toFixed(1),
  top: ((i * 53 + 7) % 100).toFixed(1),
  color: i % 2 === 0 ? "rgba(124,92,255,0.55)" : "rgba(0,229,195,0.55)",
  duration: 3 + ((i * 19) % 4),
  delay: (i * 13) % 3,
}));

function useTypingEffect(words: readonly string[], speed = 80, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, speed);
    } else if (!deleting && charIndex > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIndex((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex, words, speed, pause]);

  return text;
}

export default function Hero({ onExplore }: HeroProps) {
  const roleName = useTypingEffect(typingRoles);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExplore = useCallback(() => {
    onExplore();
  }, [onExplore]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#07080F]"
    >
      {/* Animated mesh background — GPU-composited */}
      <div className="absolute inset-0 z-0" style={{ willChange: "transform" }}>
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-violet-600/8 rounded-full blur-[140px] animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-500/8 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-violet-800/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: "0.5s" }} />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#7C5CFF 1px, transparent 1px), linear-gradient(90deg, #7C5CFF 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Floating particles — pre-computed, GPU-only transform */}
        {mounted &&
          PARTICLES.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: p.width + "px",
                height: p.width + "px",
                left: p.left + "%",
                top: p.top + "%",
                background: p.color,
                willChange: "transform, opacity",
              }}
              animate={{ y: [0, -28, 0], opacity: [0.3, 0.75, 0.3] }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16 py-20 lg:py-0 min-h-screen">
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-[#8A90A8] text-base md:text-lg tracking-[0.3em] uppercase mb-3 font-['Inter',sans-serif]"
            >
              HI, I&apos;M
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-5"
              style={{
                fontFamily: "'Space Grotesk', 'Syne', sans-serif",
                background:
                  "linear-gradient(135deg, #E8EAF6 0%, #7C5CFF 50%, #00E5C3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {identity.fullName}
            </motion.h1>

            {/* Typing role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="h-8 md:h-10 mb-5 flex items-center justify-center lg:justify-start"
            >
              <span
                className="text-lg md:text-xl lg:text-2xl font-medium"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  color: "#00E5C3",
                }}
              >
                {roleName}
                <span className="animate-pulse ml-0.5 border-r-2 border-teal-400 h-6 inline-block" />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="text-[#8A90A8] text-base md:text-lg max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-['Inter',sans-serif]"
            >
              {tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {/* Explore button */}
              <button
                onClick={handleExplore}
                id="explore-portfolio-btn"
                className="group relative px-8 py-4 rounded-xl font-semibold text-base text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(124,92,255,0.4)] font-['Inter',sans-serif]"
                style={{
                  background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
                  willChange: "transform",
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Portfolio
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform group-hover:translate-x-1"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              {/* Resume button */}
              <a
                href={identity.resumePath}
                download
                className="group flex items-center gap-2 px-6 py-4 rounded-xl border border-violet-500/30 text-[#E8EAF6] text-base font-semibold hover:border-violet-400 hover:bg-violet-500/10 transition-all duration-300 font-['Inter',sans-serif]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Resume
              </a>
            </motion.div>
          </div>

          {/* Right: Character illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0 flex items-center justify-center"
          >
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-40 scale-110 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, rgba(124,92,255,0.5) 0%, rgba(0,229,195,0.3) 60%, transparent 100%)",
                }}
              />

              {/* Floating animation — uses transform only (GPU) */}
              <motion.div
                animate={{ y: [0, -18, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
                style={{ willChange: "transform" }}
              >
                {/* Avatar */}
                <div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden border border-violet-500/20 bg-gradient-to-br from-violet-900/30 to-teal-900/30 backdrop-blur"
                  style={{ boxShadow: "0 0 60px rgba(124,92,255,0.25)" }}
                >
                  <Image
                    src={identity.heroImage}
                    alt={`${identity.fullName} - Portfolio Hero`}
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, 384px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div
                      className="w-24 h-24 rounded-full border-2 border-violet-500/50 bg-violet-600/20 flex items-center justify-center mb-4"
                      style={{ boxShadow: "0 0 30px rgba(124,92,255,0.4)" }}
                    >
                      <span
                        className="text-3xl font-bold"
                        style={{
                          fontFamily: "'Space Grotesk', sans-serif",
                          background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        AP
                      </span>
                    </div>
                    <p className="text-[#8A90A8] text-sm font-['Inter',sans-serif]">
                      Replace with hero.png
                    </p>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07080F]/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Floating badge: Hackathon */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -top-4 -right-4 bg-[#0F1220] border border-yellow-500/40 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
                  style={{ willChange: "transform" }}
                >
                  <span className="text-lg">🏆</span>
                  <div>
                    <p className="text-[#FFC857] text-xs font-bold leading-none font-['Space_Grotesk',sans-serif]">
                      2nd Rank
                    </p>
                    <p className="text-[#8A90A8] text-[10px] font-['Inter',sans-serif]">
                      Hackathon
                    </p>
                  </div>
                </motion.div>

                {/* Floating badge: CGPA */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-[#0F1220] border border-violet-500/40 rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg"
                  style={{ willChange: "transform" }}
                >
                  <span className="text-lg">📊</span>
                  <div>
                    <p className="text-violet-400 text-xs font-bold leading-none font-['Space_Grotesk',sans-serif]">
                      8.52 CGPA
                    </p>
                    <p className="text-[#8A90A8] text-[10px] font-['Inter',sans-serif]">
                      B.Tech CSE
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
          style={{ willChange: "transform" }}
        >
          <div className="w-1 h-2 rounded-full bg-violet-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
