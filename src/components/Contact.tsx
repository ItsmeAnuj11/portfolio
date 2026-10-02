"use client";

import { useRef, useState } from "react";
import type { ReactNode, MouseEvent, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
} from "lucide-react";
import { identity } from "@/data/portfolio";
import SectionHeading from "@/components/SectionHeading";

/**
 * Contact card with optional copy-to-clipboard functionality.
 */
function ContactCard({
  icon,
  label,
  value,
  href,
  copyable,
  delay,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  copyable?: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: open link
      window.open(href, "_blank");
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="block rounded-2xl p-5 border border-white/6 group hover:border-violet-500/30 transition-all duration-300 relative overflow-hidden"
        style={{ background: "#0F1220" }}
        aria-label={`${label}: ${value}`}
      >
        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at 0% 100%, rgba(124,92,255,0.08) 0%, transparent 60%)",
          }}
        />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-violet-500/30 text-violet-400 flex-shrink-0 group-hover:border-violet-400/50 transition-colors"
              style={{ background: "rgba(124,92,255,0.1)" }}
            >
              {icon}
            </div>
            <div>
              <p className="text-xs text-[#8A90A8] font-['Inter',sans-serif]">
                {label}
              </p>
              <p className="text-sm font-medium text-[#E8EAF6] font-['Inter',sans-serif] truncate max-w-[180px]">
                {value}
              </p>
            </div>
          </div>

          {/* Copy button */}
          {copyable && (
            <button
              onClick={handleCopy}
              aria-label={copied ? "Copied!" : `Copy ${label}`}
              className="p-2 rounded-lg border border-white/8 text-[#8A90A8] hover:text-violet-400 hover:border-violet-500/40 transition-all duration-200 flex-shrink-0"
            >
              {copied ? <Check size={14} className="text-teal-400" /> : <Copy size={14} />}
            </button>
          )}
        </div>
      </a>
    </motion.div>
  );
}

/**
 * Contact form — uses mailto with prefilled fields.
 * No backend required.
 */
function ContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.open(
      `mailto:${identity.email}?subject=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="rounded-2xl p-6 md:p-8 border border-white/6 relative overflow-hidden"
      style={{ background: "#0F1220" }}
    >
      {/* Corner glow */}
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none rounded-2xl"
        style={{
          background:
            "radial-gradient(circle at 100% 0%, rgba(124,92,255,0.12) 0%, transparent 60%)",
        }}
      />

      <h3 className="text-lg font-bold text-[#E8EAF6] mb-6 font-['Space_Grotesk',sans-serif] flex items-center gap-2">
        <Send size={18} className="text-violet-400" />
        Send a Message
      </h3>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="contact-name"
              className="block text-xs text-[#8A90A8] mb-1.5 font-['Inter',sans-serif]"
            >
              Your Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="contact-email"
              className="block text-xs text-[#8A90A8] mb-1.5 font-['Inter',sans-serif]"
            >
              Your Email
            </label>
            <input
              id="contact-email"
              type="email"
              required
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              aria-required="true"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="block text-xs text-[#8A90A8] mb-1.5 font-['Inter',sans-serif]"
          >
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            required
            placeholder="Let's connect and work on something amazing..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="form-input"
            aria-required="true"
          />
        </div>

        <button
          type="submit"
          id="contact-submit-btn"
          className="group relative flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(124,92,255,0.3)] font-['Inter',sans-serif] mt-1"
          style={{ background: "linear-gradient(135deg, #7C5CFF, #00E5C3)" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <Send size={15} className="transition-transform group-hover:translate-x-0.5" />
            Send via Email
          </span>
          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </form>
    </motion.div>
  );
}

export default function Contact() {
  const contactCards = [
    {
      icon: <Mail size={18} />,
      label: "Email",
      value: identity.email,
      href: `mailto:${identity.email}`,
      copyable: true,
    },
    {
      icon: <Phone size={18} />,
      label: "Phone",
      value: identity.phone,
      href: `tel:${identity.phone}`,
      copyable: true,
    },
    {
      icon: <Linkedin size={18} />,
      label: "LinkedIn",
      value: "linkedin.com/in/anuj-kumar-panday",
      href: identity.linkedin,
      copyable: false,
    },
    {
      icon: <Github size={18} />,
      label: "GitHub",
      value: `github.com/${identity.githubHandle}`,
      href: identity.github,
      copyable: false,
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28"
      style={{ background: "#0A0B14" }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag="Get In Touch"
          title="Let's "
          highlight="Connect"
          subtitle="Open to exciting opportunities, collaborations, and conversations about AI and software."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Contact cards */}
          <div className="flex flex-col gap-4">
            <p className="text-sm text-[#8A90A8] font-['Inter',sans-serif] mb-2">
              Reach out through any of these channels. Email & phone numbers can be
              copied to clipboard with one click.
            </p>
            {contactCards.map((card, i) => (
              <ContactCard key={card.label} {...card} delay={i * 0.08} />
            ))}
          </div>

          {/* Right: Contact form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
