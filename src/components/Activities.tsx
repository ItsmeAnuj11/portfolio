"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Trophy, Zap, Code2 } from "lucide-react";
import { activities } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

const iconMap: Record<string, ReactNode> = {
  trophy: <Trophy size={22} />,
  zap: <Zap size={22} />,
  code: <Code2 size={22} />,
};

function ActivityCard({
  activity,
  index,
}: {
  activity: (typeof activities)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const isHighlight = activity.highlight;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl p-6 md:p-8 border overflow-hidden group transition-all duration-300 ${
        isHighlight
          ? "border-yellow-500/30 hover:border-yellow-400/50"
          : "border-white/6 hover:border-violet-500/25"
      }`}
      style={{
        background: isHighlight
          ? "linear-gradient(135deg, rgba(255,200,87,0.06) 0%, #0F1220 60%)"
          : "#0F1220",
        boxShadow: isHighlight ? "0 0 40px rgba(255,200,87,0.08)" : "none",
      }}
    >
      {/* Animated glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: isHighlight
            ? "radial-gradient(circle at 0% 0%, rgba(255,200,87,0.1) 0%, transparent 60%)"
            : "radial-gradient(circle at 0% 0%, rgba(124,92,255,0.08) 0%, transparent 60%)",
        }}
      />

      {/* Top-right decorative glow for highlight card */}
      {isHighlight && (
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-yellow-400/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${
          isHighlight
            ? "border-yellow-500/40 text-yellow-400"
            : "border-white/8 text-violet-400"
        }`}
        style={{
          background: isHighlight
            ? "rgba(255,200,87,0.1)"
            : "rgba(124,92,255,0.1)",
        }}
      >
        {iconMap[activity.icon] ?? <Zap size={22} />}
      </div>

      {/* Title */}
      <h3
        className={`text-lg font-bold mb-3 font-['Space_Grotesk',sans-serif] ${
          isHighlight ? "text-yellow-400" : "text-[#E8EAF6]"
        }`}
      >
        {activity.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#8A90A8] leading-relaxed font-['Inter',sans-serif]">
        {activity.description}
      </p>

      {/* Gold accent bottom line for highlight */}
      {isHighlight && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] rounded-b-2xl"
          style={{ background: "linear-gradient(90deg, #FFC857, transparent)" }}
        />
      )}
    </motion.div>
  );
}

export default function Activities() {
  return (
    <section
      id="activities"
      className="relative py-20 md:py-28"
      style={{ background: "#0A0B14" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/4 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Beyond Code"
          title="Activities & "
          highlight="Achievements"
          subtitle="Pushing boundaries through competitions, workshops, and continuous growth."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activities.map((activity, i) => (
            <ActivityCard key={activity.id} activity={activity} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
