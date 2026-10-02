"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2500; // ms

    const tick = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(Math.floor((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080F]"
        >
          {/* Animated background mesh */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-xs px-8">
            {/* Logo / Brand */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center w-16 h-16 rounded-2xl border border-violet-500/30 bg-violet-600/10 backdrop-blur"
            >
              <span className="font-bold text-2xl text-violet-400 font-['Space_Grotesk',sans-serif]">
                AP
              </span>
            </motion.div>

            {/* Percentage */}
            <motion.div
              className="text-7xl font-bold tabular-nums"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "linear-gradient(135deg, #7C5CFF 0%, #00E5C3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {progress}%
            </motion.div>

            {/* Progress bar */}
            <div className="w-full h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #7C5CFF, #00E5C3)",
                }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3 }}
              className="text-sm tracking-[0.25em] uppercase text-[#8A90A8] font-['Inter',sans-serif]"
            >
              Getting things ready...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
