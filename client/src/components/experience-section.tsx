import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useReducedMotion } from "framer-motion";
import { experience } from "@/lib/data";
import type { Experience } from "@/lib/data";
import { TiltCard } from "./ui/tilt-card";

const ease = [0.22, 1, 0.36, 1] as const;

function ExperienceItem({
  exp,
  index,
  isFirst,
  isLast,
  dotRef,
}: {
  exp: Experience;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  dotRef?: React.RefObject<HTMLDivElement>;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const isReached = useInView(itemRef, {
    margin: "-15% 0px -35% 0px",
    once: false,
  });

  const bullets = exp.description
    .split(". ")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => (s.endsWith(".") ? s : s + "."));

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease }}
      className="relative pl-14 sm:pl-16 group"
    >
      {/* Precision-Aligned Milestone Node (Center placed at x = 20px) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`absolute left-[20px] top-6 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 z-20 ${
          isReached
            ? "border-2 border-white bg-[var(--c-surface-2)] shadow-none scale-110"
            : "border-2 border-slate-700/70 bg-[var(--c-surface-2)] shadow-none scale-90"
        }`}
      >
        <div
          className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
            isReached
              ? "bg-[var(--c-accent)] scale-110"
              : "bg-[var(--c-surface-2)] scale-75"
          }`}
        />
      </div>

      {/* 3D Tilt Experience Card */}
      <TiltCard
        maxTilt={0}
        glowColor="rgba(209, 233, 163, 0.04)"
        className={`surface-card p-6 rounded-2xl border bg-[var(--c-surface-2)] backdrop-blur-md shadow-xl transition-all duration-500 ${
          isReached
            ? "border-[var(--c-border-mid)] shadow-purple-950/20"
            : "border-white/10"
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3.5">
            {/* Company Logo */}
            <div className="w-11 h-11 rounded-xl bg-[var(--c-surface-2)] border border-white/10 flex items-center justify-center p-1.5 overflow-hidden flex-shrink-0 shadow-inner group-hover:border-[var(--c-border-mid)] transition-colors">
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-white group-hover:text-[var(--c-accent)] transition-colors">
                {exp.position}
              </h3>
              <p className="text-xs text-[var(--c-accent)] font-semibold mt-0.5">
                {exp.company}
              </p>
            </div>
          </div>

          {/* Period Badge */}
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--c-surface-2)] text-[var(--c-accent)] border border-[var(--c-border-mid)] self-start sm:self-center">
            {exp.period}
          </span>
        </div>

        {/* Bullet Points */}
        <ul className="space-y-2.5">
          {bullets.map((bullet, bi) => (
            <li
              key={bi}
              className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--c-text-muted)] leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--c-surface-2)] mt-2 flex-shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </TiltCard>
    </motion.div>
  );
}

export default function ExperienceSection() {
  const reduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const lastDotRef = useRef<HTMLDivElement>(null);
  const [lineCoords, setLineCoords] = useState<{ top: number; totalHeight: number }>({
    top: 24,
    totalHeight: 0,
  });

  const updateLineCoords = () => {
    if (!containerRef.current || !firstDotRef.current || !lastDotRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const firstRect = firstDotRef.current.getBoundingClientRect();
    const lastRect = lastDotRef.current.getBoundingClientRect();

    const top = firstRect.top - containerRect.top + firstRect.height / 2;
    const bottom = lastRect.top - containerRect.top + lastRect.height / 2;
    const totalHeight = Math.max(0, bottom - top);

    setLineCoords({ top, totalHeight });
  };

  useEffect(() => {
    updateLineCoords();
    window.addEventListener("resize", updateLineCoords);
    const timer = setTimeout(updateLineCoords, 300);
    return () => {
      window.removeEventListener("resize", updateLineCoords);
      clearTimeout(timer);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const animatedHeight = useTransform(
    scrollYProgress,
    [0, 1],
    [0, lineCoords.totalHeight]
  );

  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="section-padding relative"
      style={{ background: "var(--c-surface)" }}
    >
      <div className="content-container">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--c-surface-2)]" />
            <p className="section-label mb-0">Career Journey</p>
          </div>
          <h2 className="section-title">Professional Experience</h2>
        </motion.div>

        {/* Timeline wrapper */}
        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Static timeline background track (Mathematically centered at x = 20px) */}
          {lineCoords.totalHeight > 0 && (
            <div
              aria-hidden="true"
              style={{
                top: `${lineCoords.top}px`,
                height: `${lineCoords.totalHeight}px`,
              }}
              className="absolute left-[20px] -translate-x-1/2 w-[2px] bg-[var(--c-surface-2)] rounded-full pointer-events-none"
            />
          )}

          {/* Dynamic glowing illuminated line (Fills down and ignites dots on scroll) */}
          {lineCoords.totalHeight > 0 && (
            <motion.div
              aria-hidden="true"
              style={{
                top: `${lineCoords.top}px`,
                height: reduced ? lineCoords.totalHeight : animatedHeight,
              }}
              className="absolute left-[20px] -translate-x-1/2 w-[2px] bg-[var(--c-accent)] rounded-full shadow-none pointer-events-none z-10"
            />
          )}

          {/* Experience entries */}
          <div className="space-y-12">
            {experience.map((exp, i) => (
              <ExperienceItem
                key={`${exp.company}-${exp.position}`}
                exp={exp}
                index={i}
                isFirst={i === 0}
                isLast={i === experience.length - 1}
                dotRef={i === 0 ? firstDotRef : i === experience.length - 1 ? lastDotRef : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
