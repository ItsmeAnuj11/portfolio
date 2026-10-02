"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { Mail, Phone, Linkedin, Github } from "lucide-react";
import { identity, summary, stats } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

function CountUp({ target, suffix = "" }: { target: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numericTarget = parseFloat(target);
    if (isNaN(numericTarget)) {
      setDisplayed(target);
      return;
    }
    const isDecimal = target.includes(".");
    const decimals = isDecimal ? target.split(".")[1].length : 0;
    const mv = { val: 0 };
    const anim = animate(mv.val, numericTarget, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate(v) {
        setDisplayed(v.toFixed(decimals));
      },
    });
    return () => anim.stop();
  }, [inView, target]);

  return (
    <span ref={ref}>
      {displayed}
      {suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const chips = [
    { icon: "📍", label: identity.location },
    { icon: "🎓", label: "B.Tech CSE (Data Science & AI)" },
    {
      icon: identity.openToOpportunities ? "🟢" : "🔴",
      label: identity.statusLabel,
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#07080F]"
    >
      {/* Subtle section gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Who I Am"
          title="About "
          highlight="Me"
          subtitle="A passionate engineer bridging the gap between data and intelligent solutions."
        />

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          {/* Summary card — spans 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl p-6 md:p-8 border border-white/6 relative overflow-hidden"
            style={{ background: "#0F1220" }}
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />
            <h3
              className="text-lg font-semibold text-[#E8EAF6] mb-4 font-['Space_Grotesk',sans-serif]"
            >
              Professional Summary
            </h3>
            <p className="text-[#8A90A8] leading-relaxed text-sm md:text-base font-['Inter',sans-serif]">
              {summary}
            </p>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-6">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/8 bg-white/4 text-[#E8EAF6] font-['Inter',sans-serif]"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Contact info card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl p-1 border border-white/10 relative overflow-hidden group"
            style={{ 
              background: "linear-gradient(145deg, rgba(15,18,32,1) 0%, rgba(7,8,15,1) 100%)",
            }}
          >
            {/* Animated glowing border effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-transparent to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="bg-[#0F1220]/90 backdrop-blur-md rounded-xl h-full p-6 relative z-10 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-[#E8EAF6] mb-6 font-['Space_Grotesk',sans-serif] flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
                </span>
                Let's Connect
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Mail size={20} />, label: "Email", href: `mailto:${identity.email}`, color: "group-hover/btn:text-rose-400", bg: "group-hover/btn:bg-rose-500/10", border: "group-hover/btn:border-rose-500/30", shadow: "group-hover/btn:shadow-[0_0_15px_rgba(244,63,94,0.2)]" },
                  { icon: <Phone size={20} />, label: "Phone", href: `tel:${identity.phone}`, color: "group-hover/btn:text-emerald-400", bg: "group-hover/btn:bg-emerald-500/10", border: "group-hover/btn:border-emerald-500/30", shadow: "group-hover/btn:shadow-[0_0_15px_rgba(16,185,129,0.2)]" },
                  { icon: <Linkedin size={20} />, label: "LinkedIn", href: identity.linkedin, color: "group-hover/btn:text-blue-400", bg: "group-hover/btn:bg-blue-500/10", border: "group-hover/btn:border-blue-500/30", shadow: "group-hover/btn:shadow-[0_0_15px_rgba(59,130,246,0.2)]" },
                  { icon: <Github size={20} />, label: "GitHub", href: identity.github, color: "group-hover/btn:text-violet-400", bg: "group-hover/btn:bg-violet-500/10", border: "group-hover/btn:border-violet-500/30", shadow: "group-hover/btn:shadow-[0_0_15px_rgba(139,92,246,0.2)]" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`group/btn relative flex flex-col items-center justify-center gap-2.5 p-4 rounded-xl border border-white/5 bg-white/2 transition-all duration-300 ${item.bg} ${item.border} ${item.shadow}`}
                  >
                    <div className={`text-[#8A90A8] transition-colors duration-300 ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className={`text-[11px] uppercase tracking-wider font-bold text-[#8A90A8] transition-colors duration-300 ${item.color} font-['Space_Grotesk',sans-serif]`}>
                      {item.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Stats strip — spans full width */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl p-5 border border-white/6 flex flex-col items-center gap-2 relative overflow-hidden group hover:border-violet-500/30 transition-all duration-300"
                style={{ background: "#0F1220" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-600/0 to-teal-500/0 group-hover:from-violet-600/5 group-hover:to-teal-500/5 transition-all duration-500 pointer-events-none" />
                <span className="text-2xl">{stat.icon}</span>
                <p
                  className="text-2xl md:text-3xl font-bold font-['Space_Grotesk',sans-serif]"
                  style={{
                    background: "linear-gradient(135deg, #7C5CFF, #00E5C3)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-[#8A90A8] text-xs text-center font-['Inter',sans-serif]">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
