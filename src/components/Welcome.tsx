"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letters = "MY PORTFOLIO".split("");

interface WelcomeProps {
  onComplete: () => void;
}

export default function Welcome({ onComplete }: WelcomeProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto-advance after 2.8 s (stagger reveal + hold time)
    const t = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 700);
    }, 2800);
    return () => clearTimeout(t);
  }, [onComplete]);

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06, delayChildren: 0.4 },
    },
    exit: {
      transition: { staggerChildren: 0.03, staggerDirection: -1 },
    },
  };

  const letterVariant = {
    hidden: { opacity: 0, y: 60, rotateX: -90 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      y: -40,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[9998] flex flex-col items-center justify-center bg-[#07080F] overflow-hidden"
        >
          {/* Animated gradient blobs */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-600/15 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px] animate-pulse delay-500" />
          </div>

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(#7C5CFF 1px, transparent 1px), linear-gradient(90deg, #7C5CFF 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          <div className="relative z-10 text-center px-4">
            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-[#8A90A8] text-sm md:text-base tracking-[0.3em] uppercase mb-6 font-['Inter',sans-serif]"
            >
              Welcome to
            </motion.p>

            {/* Big staggered heading */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex flex-wrap justify-center"
              style={{ perspective: "800px" }}
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  variants={letterVariant}
                  className={`inline-block font-bold leading-none select-none ${
                    char === " " ? "w-6 md:w-10" : ""
                  }`}
                  style={{
                    fontFamily: "'Space Grotesk', 'Syne', sans-serif",
                    fontSize: "clamp(3rem, 10vw, 8rem)",
                    background:
                      "linear-gradient(135deg, #7C5CFF 0%, #00E5C3 60%, #E8EAF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.div>

            {/* Tagline fade in */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-6 text-[#8A90A8] text-sm md:text-base tracking-widest font-['Inter',sans-serif]"
            >
              Anuj Kumar Panday M
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
