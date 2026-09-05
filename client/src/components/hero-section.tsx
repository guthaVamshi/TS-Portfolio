import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import Hero3D from "./hero-3d";
import { AnimatedCounter } from "./ui/animated-counter";

const SOCIALS = [
  { icon: "fab fa-github", href: "https://github.com/guthaVamshi", label: "GitHub" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", label: "LinkedIn" },
  { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", label: "Email" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Introduction"
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 pb-16"
      style={{ background: "transparent" }}
    >
      {/* Ambient Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-purple-600/10 via-indigo-500/10 to-sky-500/10 rounded-full blur-[100px] pointer-events-none -z-10"
      />

      {/* Hero Content Container */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="content-container relative z-10 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Narrative & Command Deck */}
          <div className="lg:col-span-6 flex flex-col items-start pt-4">
            {/* Live System Status Kicker */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-2 mb-6"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available for Opportunities</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono text-slate-300 bg-slate-900/60 border border-white/10 backdrop-blur-md">
                <i className="fas fa-layer-group text-purple-400 text-[10px]" />
                Software Engineer @ Macy's
              </span>

            </motion.div>

            {/* Authoritative Architectural Headline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4"
            >
              <h1 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.06] text-white">
                Engineering resilient systems at{" "}
                <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
                  scale.
                </span>
              </h1>
            </motion.div>

            {/* Concise Value Proposition */}
            <motion.p
              className="text-sm sm:text-base leading-relaxed text-slate-300 max-w-xl mb-8 font-normal"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hi, I'm <strong className="text-white font-semibold">Vamshi Gutha</strong>. I design and build high-throughput{" "}
              <span className="text-purple-300 font-medium">Java 17 & Spring Boot microservices</span>, reactive{" "}
              <span className="text-sky-300 font-medium">React frontends</span>, and complex{" "}
              <span className="text-indigo-300 font-medium">Salesforce CRM architectures</span> that handle mission-critical enterprise workloads.
            </motion.p>

            {/* Interactive Traffic Simulator Control & CTAs */}
            <motion.div
              className="flex flex-wrap items-center gap-3.5 mb-8 w-full"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a href="#projects" className="btn-primary btn-glow group text-xs sm:text-sm px-5 py-2.5">
                <span>Explore Projects</span>
                <i className="fas fa-arrow-down text-xs transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
              </a>

              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group text-xs sm:text-sm px-5 py-2.5"
              >
                <i className="fas fa-file-arrow-down text-xs transition-transform duration-300 group-hover:-translate-y-0.5" aria-hidden="true" />
                <span>Resume</span>
              </a>

              {/* Interactive Traffic Spike Toggle */}

            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-2.5 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              aria-label="Social channels"
            >
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 hover:bg-purple-950/30 text-slate-300 hover:text-white flex items-center justify-center text-xs transition-all duration-200"
                >
                  <i className={s.icon} aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 w-full max-w-xl border-t border-white/10"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {[
                { value: "4+", label: "Years Experience" },
                { value: "20+", label: "Projects Delivered" },
                { value: "5", label: "Certifications" },
                { value: "Macy's", label: "Production Tech" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <div className="font-outfit font-black text-xl sm:text-2xl text-white tracking-tight">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: 3D Enterprise Architecture Canvas */}
          <motion.div
            className="lg:col-span-6 relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest text-slate-400/60 uppercase">
          <div className="w-[1px] h-4 bg-gradient-to-b from-purple-400 to-transparent" />
          <span>Scroll</span>
        </div>
      </motion.div>
    </section>
  );
}