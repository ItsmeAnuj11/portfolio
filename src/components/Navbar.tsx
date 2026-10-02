"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { identity, navLinks } from "@/data/portfolio";

interface NavbarProps {
  visible: boolean;
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return progress;
}

function useActiveSection(links: readonly { label: string; href: string }[]) {
  const [active, setActive] = useState(links[0].href.slice(1));

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [links]);

  return active;
}

export default function Navbar({ visible }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();
  const active = useActiveSection(navLinks);

  const scrollTo = useCallback((href: string) => {
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Scroll progress bar — very top */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-white/5">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: scrollProgress / 100,
            background: "linear-gradient(90deg, #7C5CFF, #00E5C3)",
          }}
        />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-[2px] left-0 right-0 z-[99] flex items-center justify-between px-4 sm:px-6 lg:px-10 py-3"
        style={{
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(7,8,15,0.75)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg"
          aria-label="Go to top"
        >
          <div
            className="w-9 h-9 rounded-lg border border-violet-500/40 bg-violet-600/15 flex items-center justify-center group-hover:border-violet-400 group-hover:bg-violet-600/25 transition-all duration-300"
          >
            <span
              className="text-sm font-bold text-violet-400 font-['Space_Grotesk',sans-serif]"
            >
              AP
            </span>
          </div>
          <span
            className="hidden sm:block text-[#E8EAF6] text-base font-semibold font-['Space_Grotesk',sans-serif] group-hover:text-violet-400 transition-colors"
          >
            {identity.shortName}
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 font-['Inter',sans-serif] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 ${
                    isActive
                      ? "text-violet-400"
                      : "text-[#8A90A8] hover:text-[#E8EAF6]"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-violet-600/15 border border-violet-500/30"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Resume button + hamburger */}
        <div className="flex items-center gap-3">
          <a
            href={identity.resumePath}
            download
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white border border-violet-500/40 hover:border-violet-400 hover:bg-violet-600/15 transition-all duration-200 font-['Inter',sans-serif]"
            aria-label="Download resume"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            Resume
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg border border-white/10 text-[#8A90A8] hover:text-[#E8EAF6] hover:border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-0.5 w-full bg-current rounded-full"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-current rounded-full"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 z-[98] w-72 flex flex-col pt-20 pb-8 px-6"
            style={{
              background: "rgba(15,18,32,0.97)",
              backdropFilter: "blur(20px)",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <ul className="flex flex-col gap-1 flex-1">
              {navLinks.map((link, i) => {
                const isActive = active === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ x: 30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => scrollTo(link.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all font-['Inter',sans-serif] ${
                        isActive
                          ? "bg-violet-600/15 text-violet-400 border border-violet-500/30"
                          : "text-[#8A90A8] hover:text-[#E8EAF6] hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
            <a
              href={identity.resumePath}
              download
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white font-['Inter',sans-serif]"
              style={{ background: "linear-gradient(135deg, #7C5CFF, #00E5C3)" }}
              onClick={() => setMenuOpen(false)}
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu backdrop */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-[97] bg-black/40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
