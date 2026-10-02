"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { identity } from "@/data/portfolio";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    {
      label: "GitHub",
      href: identity.github,
      icon: <Github size={18} />,
    },
    {
      label: "LinkedIn",
      href: identity.linkedin,
      icon: <Linkedin size={18} />,
    },
    {
      label: "Email",
      href: `mailto:${identity.email}`,
      icon: <Mail size={18} />,
    },
  ];

  return (
    <footer
      className="relative py-10 border-t"
      style={{
        background: "#07080F",
        borderColor: "rgba(255,255,255,0.05)",
      }}
    >
      {/* Subtle top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(124,92,255,0.4), transparent)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          {/* Copyright */}
          <p
            className="text-sm text-[#8A90A8] font-['Inter',sans-serif] text-center sm:text-left"
          >
            © {year}{" "}
            <span className="text-[#E8EAF6] font-medium">{identity.fullName}</span>.
            {" "}All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="w-9 h-9 rounded-lg border border-white/8 flex items-center justify-center text-[#8A90A8] hover:text-violet-400 hover:border-violet-500/40 hover:bg-violet-600/10 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            id="back-to-top-btn"
            className="flex items-center gap-2 text-xs font-medium text-[#8A90A8] hover:text-violet-400 transition-colors font-['Inter',sans-serif] px-3 py-2 rounded-lg border border-white/6 hover:border-violet-500/30"
          >
            <ArrowUp size={14} />
            Back to top
          </motion.button>
        </div>

        {/* Built with line */}
        <div className="mt-6 pt-5 border-t border-white/4 text-center">
          <p className="text-xs text-[#8A90A8]/60 font-['Inter',sans-serif]">
            Built with{" "}
            <span className="text-violet-400">Next.js 14</span>,{" "}
            <span className="text-teal-400">Framer Motion</span>, and{" "}
            <span className="text-[#FFC857]">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
