"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, MapPin } from "lucide-react";
import { education } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

/**
 * Animated SVG ring showing CGPA progress.
 */
function CgpaRing({
  cgpa,
  max,
  inView,
}: {
  cgpa: number;
  max: number;
  inView: boolean;
}) {
  const [progress, setProgress] = useState(0);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / max);

  useEffect(() => {
    if (!inView) return;
    // Animate from 0 to cgpa over ~1.5s
    let start: number | null = null;
    const duration = 1500;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const val = Math.min((elapsed / duration) * cgpa, cgpa);
      setProgress(val);
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, cgpa]);

  return (
    <div className="relative flex items-center justify-center w-28 h-28 flex-shrink-0">
      <svg
        width="112"
        height="112"
        viewBox="0 0 112 112"
        fill="none"
        aria-label={`CGPA ${cgpa} out of ${max}`}
        role="img"
      >
        {/* Track */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress */}
        <circle
          cx="56"
          cy="56"
          r={radius}
          stroke="url(#ring-grad)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform="rotate(-90 56 56)"
          style={{ transition: "stroke-dashoffset 0.05s linear" }}
        />
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7C5CFF" />
            <stop offset="100%" stopColor="#00E5C3" />
          </linearGradient>
        </defs>
      </svg>
      {/* Centre text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-lg font-bold leading-none font-['Space_Grotesk',sans-serif]"
          style={{
            background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {progress.toFixed(2)}
        </span>
        <span className="text-[10px] text-[#8A90A8] font-['Inter',sans-serif]">
          / {max}
        </span>
      </div>
    </div>
  );
}

function EducationCard({
  edu,
  index,
}: {
  edu: (typeof education)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline icon */}
      <div className="flex flex-col items-center flex-shrink-0">
        <div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border border-teal-500/40 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,195,0.15), rgba(124,92,255,0.1))",
            boxShadow: "0 0 20px rgba(0,229,195,0.2)",
          }}
        >
          <GraduationCap size={20} className="text-teal-400" />
        </div>
        {index < education.length - 1 && (
          <div
            className="w-[2px] flex-1 mt-2 rounded-full opacity-30"
            style={{ background: "linear-gradient(to bottom, #00E5C3, #7C5CFF)" }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-2xl p-6 md:p-8 border border-white/6 mb-8 relative overflow-hidden group hover:border-teal-500/25 transition-all duration-300"
        style={{ background: "#0F1220" }}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background: "radial-gradient(circle at 100% 0%, rgba(0,229,195,0.07) 0%, transparent 60%)",
          }}
        />

        {/* Current badge */}
        {edu.current && (
          <span
            className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border font-['Inter',sans-serif]"
            style={{
              color: "#00E5C3",
              borderColor: "rgba(0,229,195,0.3)",
              background: "rgba(0,229,195,0.08)",
            }}
          >
            Ongoing
          </span>
        )}

        <div className="flex items-start gap-5 md:gap-6 flex-col sm:flex-row">
          {/* Ring (only if CGPA exists) */}
          {edu.cgpa !== null && edu.cgpaMax !== null && (
            <CgpaRing cgpa={edu.cgpa} max={edu.cgpaMax} inView={inView} />
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-bold text-[#E8EAF6] mb-1 font-['Space_Grotesk',sans-serif]">
              {edu.institution}
            </h3>
            <p className="text-sm font-medium text-violet-400 mb-3 font-['Inter',sans-serif]">
              {edu.degree}
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-[#8A90A8] font-['Inter',sans-serif]">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {edu.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={12} />
                {edu.duration}
              </span>
            </div>

            {edu.cgpa !== null && (
              <div className="mt-4">
                <span
                  className="text-xs font-semibold px-3 py-1.5 rounded-full border font-['Inter',sans-serif]"
                  style={{
                    color: "#FFC857",
                    borderColor: "rgba(255,200,87,0.3)",
                    background: "rgba(255,200,87,0.08)",
                  }}
                >
                  🎓 CGPA: {edu.cgpa} / {edu.cgpaMax}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Education() {
  return (
    <section
      id="education"
      className="relative py-20 md:py-28 bg-[#07080F]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="My Academic Path"
          title="Education & "
          highlight="Qualifications"
          subtitle="Building a strong theoretical foundation alongside hands-on practical skills."
        />

        <div>
          {education.map((edu, i) => (
            <EducationCard key={edu.id} edu={edu} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
