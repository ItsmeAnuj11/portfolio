"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { certificates } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

export default function Certificates() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certificates" className="relative py-20 md:py-28 bg-[#07080F]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Continuous Learning"
          title="My "
          highlight="Certificates"
          subtitle="Professional certifications and credentials I've earned."
        />

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.a
              key={cert.id}
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -5, borderColor: "rgba(124,92,255,0.4)" }}
              className="block rounded-2xl p-6 border border-white/10 group transition-all duration-300"
              style={{ background: "#0F1220" }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:bg-violet-500/20 group-hover:scale-110 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 15l-2 5-9-5 9-5 2 5z" />
                    <circle cx="12" cy="8" r="7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[#E8EAF6] font-semibold text-lg leading-tight group-hover:text-violet-400 transition-colors font-['Space_Grotesk',sans-serif]">
                    {cert.title}
                  </h3>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-[#8A90A8] text-sm font-['Inter',sans-serif]">
                  {cert.issuer}
                </p>
                <span className="text-teal-400 text-xs font-bold font-['Space_Grotesk',sans-serif] px-2.5 py-1 rounded-full bg-teal-400/10">
                  {cert.date}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
