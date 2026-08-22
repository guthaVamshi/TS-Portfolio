import { motion } from "framer-motion";
import { experience } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="section-padding"
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
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
        </motion.div>

        {/* Timeline wrapper — line is at left: 20px, content starts at pl-[52px] */}
        <div className="relative max-w-3xl" style={{ paddingLeft: "52px" }}>

          {/* Vertical timeline line — centered at x=20 from outer div left edge */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "20px",
              top: "32px",
              bottom: "20px",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent 0%, hsl(var(--c-accent-hsl) / 0.25) 8%, hsl(var(--c-accent-hsl) / 0.25) 92%, transparent 100%)",
            }}
          />

          {/* Entries */}
          <div className="space-y-14">
            {experience.map((exp, i) => {
              const bullets = exp.description
                .split(". ")
                .map((s) => s.trim())
                .filter(Boolean)
                .map((s) => (s.endsWith(".") ? s : s + "."));

              return (
                <motion.article
                  key={`${exp.company}-${exp.position}`}
                  className="relative"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease }}
                  aria-label={`${exp.position} at ${exp.company}`}
                >
                  {/* Timeline dot — positioned at left: 20px from outer div = left: 20-52 = -32px from article */}
                  <div
                    aria-hidden
                    style={{
                      position: "absolute",
                      left: "-37.5px",   /* 20 - 52 - (11/2) = -37.5 centers the 11px dot on the line */
                      top: "26px",
                      width: "11px",
                      height: "11px",
                      borderRadius: "50%",
                      border: "2px solid hsl(var(--c-accent-hsl))",
                      background: "var(--c-bg)",
                      boxShadow: "0 0 0 3px hsl(var(--c-accent-hsl) / 0.12)",
                      transition: "box-shadow 0.2s",
                      zIndex: 1,
                    }}
                  />

                  {/* Header row */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Company logo */}
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "var(--r-md)",
                          background: "var(--c-surface-2)",
                          border: "1px solid var(--c-border)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={exp.logo}
                          alt={exp.company}
                          className="w-full h-full object-contain p-1"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h3
                          className="text-base font-semibold leading-snug"
                          style={{
                            color: "var(--c-text)",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {exp.position}
                        </h3>
                        <p
                          className="text-sm"
                          style={{ color: "var(--c-accent)", fontWeight: 500 }}
                        >
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Period */}
                    <span
                      className="text-xs font-medium flex-shrink-0"
                      style={{
                        color: "var(--c-text-faint)",
                        paddingTop: "2px",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {exp.period}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2">
                    {bullets.map((bullet, bi) => (
                      <li
                        key={bi}
                        className="flex items-start gap-3 text-sm leading-relaxed"
                        style={{ color: "var(--c-text-muted)" }}
                      >
                        <span
                          style={{
                            color: "var(--c-text-faint)",
                            marginTop: "6px",
                            fontSize: "5px",
                            flexShrink: 0,
                          }}
                          aria-hidden
                        >
                          ●
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
