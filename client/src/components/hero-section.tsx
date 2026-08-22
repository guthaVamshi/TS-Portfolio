import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import resume from "../Files/VamshiGutha_JFSD.pdf";

const SOCIALS = [
  { icon: "fab fa-github", href: "https://github.com/guthaVamshi", label: "GitHub" },
  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", label: "LinkedIn" },
  { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", label: "Email" },
];

// Stagger config
const ease = [0.22, 1, 0.36, 1] as const;

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease, delay: i * 0.15 },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-label="Introduction"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--c-bg)" }}
    >
      {/* ── Animated ambient orbs (parallax) ── */}
      <motion.div
        aria-hidden
        style={{ y: y1, position: "absolute", inset: 0, pointerEvents: "none" }}
      >
        {/* Primary violet orb — top center */}
        <div
          className="absolute rounded-full"
          style={{
            width: "900px",
            height: "900px",
            background:
              "radial-gradient(circle, hsl(246 75% 65% / 0.18) 0%, hsl(246 75% 65% / 0.06) 45%, transparent 70%)",
            top: "-200px",
            left: "50%",
            transform: "translateX(-40%)",
            filter: "blur(1px)",
            animation: "orb-drift-1 18s ease-in-out infinite alternate",
          }}
        />
        {/* Secondary pink/purple orb — right */}
        <div
          className="absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, hsl(280 70% 60% / 0.14) 0%, transparent 70%)",
            top: "20%",
            right: "-100px",
            filter: "blur(1px)",
            animation: "orb-drift-2 22s ease-in-out infinite alternate",
          }}
        />
        {/* Tertiary blue orb — bottom left */}
        <div
          className="absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, hsl(220 80% 65% / 0.10) 0%, transparent 70%)",
            bottom: "5%",
            left: "-80px",
            filter: "blur(1px)",
            animation: "orb-drift-3 26s ease-in-out infinite alternate",
          }}
        />
      </motion.div>

      {/* Subtle dot-grid texture */}
      <motion.div
        aria-hidden
        style={{ y: y2, position: "absolute", inset: 0, pointerEvents: "none" }}
        className="hero-grid-bg"
      />

      {/* ── Hero content ── */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="content-container relative z-10 flex flex-col items-start"
      >
        <div style={{ paddingTop: "120px", paddingBottom: "100px" }}>
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-8"
          >
            <span className="availability-badge">
              <span className="availability-dot" aria-hidden />
              Available for opportunities
            </span>
          </motion.div>

          {/* Name — animated word by word */}
          <div className="mb-8">
            <div className="hero-name" style={{ overflow: "visible" }}>
              <motion.span
                className="block"
                custom={0}
                initial="hidden"
                animate="visible"
                variants={WORD_VARIANTS}
              >
                Vamshi
              </motion.span>
              <motion.span
                className="block hero-name-accent"
                custom={1}
                initial="hidden"
                animate="visible"
                variants={WORD_VARIANTS}
                style={{ display: "block" }}
              >
                Gutha.
              </motion.span>
            </div>
          </div>

          {/* Role + bio */}
          <motion.p
            className="hero-role max-w-[560px] mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
          >
            Full Stack Java Developer —{" "}
            <span style={{ color: "var(--c-text-faint)" }}>
              building enterprise-grade applications with Spring Boot, React,
              and Salesforce for the last 4 years.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3 mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.6 }}
          >
            <a href="#projects" className="btn-primary btn-glow">
              View My Work
              <i className="fas fa-arrow-down text-xs" aria-hidden />
            </a>
            <a
              href={resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <i className="fas fa-file-arrow-down text-xs" aria-hidden />
              Resume
            </a>
          </motion.div>

          {/* Social + location */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            aria-label="Social links"
          >
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={s.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                aria-label={s.label}
                className="social-link"
              >
                <i className={s.icon} aria-hidden />
              </a>
            ))}
          </motion.div>

          {/* Floating stats row */}
          <motion.div
            className="flex flex-wrap gap-6 mt-14 pt-10"
            style={{ borderTop: "1px solid var(--c-border)" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 1.0 }}
          >
            {[
              { value: "4+", label: "Years experience" },
              { value: "20+", label: "Projects delivered" },
              { value: "5", label: "Certifications" },
              { value: "Macy's", label: "Current employer" },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  className="font-outfit font-black"
                  style={{
                    fontSize: "22px",
                    letterSpacing: "-0.03em",
                    color: "var(--c-text)",
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--c-text-faint)" }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        aria-hidden
      >
        <div className="scroll-indicator">
          <div className="scroll-indicator-line" />
          <span>scroll</span>
        </div>
      </motion.div>
    </section>
  );
}