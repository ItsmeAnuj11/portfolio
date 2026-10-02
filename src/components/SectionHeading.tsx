"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({
  tag,
  title,
  highlight,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const align = centered ? "items-center text-center" : "items-start text-left";

  // Split title around highlight
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-3 mb-12 md:mb-16 ${align}`}
    >
      {tag && (
        <span
          className="text-xs font-semibold tracking-[0.3em] uppercase px-3 py-1 rounded-full border w-fit font-['Inter',sans-serif]"
          style={{
            color: "#00E5C3",
            borderColor: "rgba(0,229,195,0.3)",
            background: "rgba(0,229,195,0.08)",
          }}
        >
          {tag}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight font-['Space_Grotesk',sans-serif]"
      >
        {parts[0]}
        {highlight && (
          <span
            style={{
              background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {highlight}
          </span>
        )}
        {parts[1]}
      </h2>
      {subtitle && (
        <p className="text-[#8A90A8] text-base md:text-lg max-w-2xl leading-relaxed font-['Inter',sans-serif]">
          {subtitle}
        </p>
      )}
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`h-[2px] w-16 rounded-full origin-left ${centered ? "mx-auto" : ""}`}
        style={{ background: "linear-gradient(90deg, #7C5CFF, #00E5C3)" }}
      />
    </motion.div>
  );
}
