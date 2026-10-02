"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github } from "lucide-react";
import { identity } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";
export default function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="github"
      className="relative py-20 md:py-28 bg-[#07080F]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-600/5 rounded-full blur-[140px]" />
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Open Source"
          title="GitHub "
          highlight="Profile"
          subtitle="Exploring ideas, contributing code, and building in the open."
          centered
        />

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/8 p-6 md:p-8 mb-10 relative overflow-hidden"
          style={{ background: "#0F1220" }}
        >
          {/* Subtle glow */}
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(124,92,255,0.1) 0%, transparent 60%)",
            }}
          />

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar placeholder */}
            <div
              className="w-20 h-20 rounded-2xl border border-violet-500/30 flex items-center justify-center flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124,92,255,0.2), rgba(0,229,195,0.1))",
              }}
            >
              <Github size={36} className="text-violet-400" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-[#E8EAF6] mb-1 font-['Space_Grotesk',sans-serif]">
                @{identity.githubHandle}
              </h3>
              <p className="text-sm text-[#8A90A8] mb-4 font-['Inter',sans-serif]">
                {identity.fullName} — Software Engineer · Data Science & AI
              </p>

              <a
                href={identity.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02] font-['Inter',sans-serif]"
                style={{
                  background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
                }}
              >
                <Github size={15} />
                View Profile
              </a>
            </div>
          </div>

          {/* Contribution graph */}
          <div className="relative mt-8 rounded-xl overflow-hidden bg-white/2 border border-white/4 p-4">
            <p className="text-xs text-[#8A90A8] mb-3 font-['Inter',sans-serif]">
              Contribution Activity
            </p>
            {/* ghchart.rshah.org — safe, public, no auth required */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/7C5CFF/${identity.githubHandle}`}
              alt={`GitHub contribution graph for ${identity.githubHandle}`}
              className="w-full rounded-lg opacity-80"
              loading="lazy"
              onError={(e) => {
                // Hide gracefully if chart fails to load
                const target = e.target as HTMLImageElement;
                target.closest("div.relative")!.innerHTML =
                  '<p class="text-xs text-center text-[#8A90A8] py-4 font-[\'Inter\',sans-serif]">Contribution graph unavailable — visit GitHub to view activity.</p>';
              }}
            />
          </div>
        </motion.div>


      </div>
    </section>
  );
}
