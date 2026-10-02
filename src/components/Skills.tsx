"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

// Flat list of all skills for the marquee
const allSkills = skillCategories.flatMap((c) => c.skills);

function SkillChip({ label }: { label: string }) {
  return (
    <span
      className="inline-block text-xs font-medium px-2.5 py-1 rounded-full border border-white/8 bg-white/4 text-[#E8EAF6] font-['Inter',sans-serif] whitespace-nowrap"
    >
      {label}
    </span>
  );
}

function SkillCard({
  category,
  delay,
}: {
  category: (typeof skillCategories)[number];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isViolet = category.color === "violet";
  const glow = isViolet ? "rgba(124,92,255,0.12)" : "rgba(0,229,195,0.12)";
  const hoverBorder = isViolet ? "rgba(124,92,255,0.4)" : "rgba(0,229,195,0.4)";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6, boxShadow: `0 20px 60px ${glow}` }}
      className="rounded-2xl p-5 md:p-6 border border-white/6 flex flex-col gap-4 cursor-default transition-all duration-300 group"
      style={{ background: "#0F1220" }}
      tabIndex={0}
      role="article"
      aria-label={`${category.label} skills`}
    >
      {/* Icon + label */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border border-white/8"
          style={{ background: glow }}
        >
          {category.icon}
        </div>
        <h3
          className="text-sm font-semibold text-[#E8EAF6] font-['Space_Grotesk',sans-serif] leading-tight"
        >
          {category.label}
        </h3>
      </div>

      {/* Skill chips */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillChip key={skill} label={skill} />
        ))}
      </div>

      {/* Bottom glow line */}
      <div
        className="h-[1px] w-0 group-hover:w-full rounded-full transition-all duration-500"
        style={{
          background: isViolet
            ? "linear-gradient(90deg, #7C5CFF, transparent)"
            : "linear-gradient(90deg, #00E5C3, transparent)",
        }}
      />
    </motion.div>
  );
}

// Infinite marquee of skill names
function SkillMarquee() {
  const repeated = [...allSkills, ...allSkills, ...allSkills];
  return (
    <div
      className="relative mt-10 overflow-hidden py-4"
      aria-hidden="true"
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, #07080F, transparent)" }}
      />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, #07080F, transparent)" }}
      />

      <motion.div
        className="flex gap-3 w-max"
        animate={{ x: [0, "-33.33%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {repeated.map((skill, i) => (
          <span
            key={i}
            className="flex-shrink-0 px-4 py-2 rounded-full border border-white/8 bg-white/3 text-[#8A90A8] text-sm font-['Inter',sans-serif]"
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-20 md:py-28"
      style={{ background: "#0A0B14" }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="What I Know"
          title="Technical "
          highlight="Skills"
          subtitle="A curated toolkit built through projects, hackathons, and continuous learning."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} delay={i * 0.08} />
          ))}
        </div>

        <SkillMarquee />
      </div>
    </section>
  );
}
