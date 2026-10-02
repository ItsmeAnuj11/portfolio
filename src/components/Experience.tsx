"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react";
import { experiences } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div
          className="relative z-10 w-12 h-12 rounded-xl flex items-center justify-center border border-violet-500/40 flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(0,229,195,0.1))",
            boxShadow: "0 0 20px rgba(124,92,255,0.25)",
          }}
        >
          <Briefcase size={20} className="text-violet-400" />
        </div>
        {/* Vertical line */}
        {index < experiences.length - 1 && (
          <div
            className="w-[2px] flex-1 mt-2 rounded-full opacity-30"
            style={{ background: "linear-gradient(to bottom, #7C5CFF, #00E5C3)" }}
          />
        )}
      </div>

      {/* Card */}
      <div
        className="flex-1 rounded-2xl p-6 md:p-8 border border-white/6 mb-8 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300"
        style={{ background: "#0F1220" }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: "radial-gradient(circle at 0% 0%, rgba(124,92,255,0.08) 0%, transparent 60%)" }}
        />

        {/* Current badge */}
        {experience.current && (
          <span
            className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full border font-['Inter',sans-serif]"
            style={{
              color: "#00E5C3",
              borderColor: "rgba(0,229,195,0.3)",
              background: "rgba(0,229,195,0.08)",
            }}
          >
            Current
          </span>
        )}

        {/* Role + Company */}
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-bold text-[#E8EAF6] mb-1 font-['Space_Grotesk',sans-serif]">
            {experience.role}
          </h3>
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors font-['Inter',sans-serif]"
          >
            {experience.company}
          </a>
        </div>

        {/* Duration */}
        <div className="flex items-center gap-2 text-xs text-[#8A90A8] mb-5 font-['Inter',sans-serif]">
          <Calendar size={13} />
          <span>{experience.duration}</span>
        </div>

        {/* Bullets */}
        <ul className="flex flex-col gap-3">
          {experience.bullets.map((bullet, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[#8A90A8] leading-relaxed font-['Inter',sans-serif]"
            >
              <CheckCircle2
                size={15}
                className="mt-0.5 flex-shrink-0 text-teal-400"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-28"
      style={{ background: "#0A0B14" }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[130px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Where I've Worked"
          title="Work "
          highlight="Experience"
          subtitle="Real-world experience building software products from idea to deployment."
        />

        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
