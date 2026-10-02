"use client";

import { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform } from "framer-motion";
import { projects } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

function TiltCard({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  function handleMouse(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const mx = e.clientX - rect.left - rect.width / 2;
    const my = e.clientY - rect.top - rect.height / 2;
    x.set(mx);
    y.set(my);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltCard
        className="rounded-2xl border border-white/8 overflow-hidden group cursor-default relative"
        style={{ background: "#0F1220" }}
      >


        {/* Spotlight on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${
              index === 0 ? "rgba(124,92,255,0.12)" : "rgba(0,229,195,0.12)"
            } 0%, transparent 70%)`,
          }}
        />

        {/* Gradient header bar */}
        <div
          className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`}
        />

        <div className="p-6 md:p-8">
          {/* Title + subtitle */}
          <div className="mb-5">
            <h3
              className="text-xl md:text-2xl font-bold text-[#E8EAF6] mb-1 font-['Space_Grotesk',sans-serif]"
            >
              {project.title}
            </h3>
            <p className="text-sm text-[#8A90A8] font-['Inter',sans-serif]">
              {project.subtitle}
            </p>
          </div>

          {/* Bullets */}
          <ul className="flex flex-col gap-2.5 mb-6">
            {project.bullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 text-sm text-[#8A90A8] font-['Inter',sans-serif] leading-relaxed"
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{
                    background: index === 0 ? "#7C5CFF" : "#00E5C3",
                  }}
                />
                {b}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full border font-['Inter',sans-serif]"
                style={{
                  borderColor:
                    index === 0
                      ? "rgba(124,92,255,0.3)"
                      : "rgba(0,229,195,0.3)",
                  color: index === 0 ? "#7C5CFF" : "#00E5C3",
                  background:
                    index === 0
                      ? "rgba(124,92,255,0.08)"
                      : "rgba(0,229,195,0.08)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-white/10 text-[#E8EAF6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 font-['Inter',sans-serif]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 font-['Inter',sans-serif]"
                style={{
                  background: index === 0
                    ? "linear-gradient(135deg, #7C5CFF, #5B3FD4)"
                    : "linear-gradient(135deg, #00E5C3, #009B85)",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/>
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}


export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-20 md:py-28 bg-[#07080F]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="What I've Built"
          title="Featured "
          highlight="Projects"
          subtitle="Real-world AI and web applications built through passion and purpose."
        />

        {/* Main project cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
