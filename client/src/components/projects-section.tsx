import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { ProjectCategory } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

// Curated project names — only high-quality, described work
const CURATED = [
  "Integration Hub",
  "AI-Assisted Retail Product Discovery Platform",
  "MoneyFind",
  "Insurance Claims Workflow Modernization",
  "Next Hire",
  "Next Hire Salesforce",
];

const CATEGORIES = ["All", "Web Development", "Salesforce", "MERN Stack"] as const;

export default function ProjectsSection() {
  const [category, setCategory] = useState<string>("All");

  const pool = projects.filter((p) => CURATED.includes(p.name));
  const filtered =
    category === "All"
      ? pool
      : pool.filter((p) => p.category === category);

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-padding"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="content-container">

        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">What I've built</h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                role="tab"
                aria-selected={isActive}
                className="relative px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  color: isActive ? "var(--c-text)" : "var(--c-text-muted)",
                  background: isActive ? "var(--c-surface-2)" : "transparent",
                  border: isActive
                    ? "1px solid var(--c-border-mid)"
                    : "1px solid transparent",
                }}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="catIndicator"
                    className="absolute inset-0 rounded-lg -z-10"
                    style={{ background: "var(--c-surface-2)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Projects grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isInProgress = project.status === "in-progress";

              return (
                <motion.article
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.97, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97, y: -8 }}
                  transition={{ duration: 0.35, delay: i * 0.05, ease }}
                  className="card flex flex-col overflow-hidden group"
                  aria-label={project.name}
                  style={{ minHeight: "280px" }}
                >
                  {/* Image */}
                  <div
                    className="relative overflow-hidden"
                    style={{ height: "180px", flexShrink: 0 }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(17, 17, 24, 0.6) 0%, transparent 60%)",
                      }}
                    />
                    {/* Status badge */}
                    {project.status && (
                      <span
                        className={`absolute top-3 right-3 ${isInProgress ? "badge-progress" : "badge-complete"}`}
                      >
                        {isInProgress ? "In progress" : "Completed"}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 gap-3 p-5">
                    {/* Category label */}
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: "var(--c-accent)" }}
                    >
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3
                      className="text-base font-semibold leading-snug"
                      style={{
                        color: "var(--c-text)",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {project.name}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed flex-1"
                      style={{ color: "var(--c-text-muted)" }}
                    >
                      {/* Truncate to first 2 sentences for readability */}
                      {project.description.split(". ").slice(0, 2).join(". ").trim()}
                      {project.description.split(". ").length > 2 ? "." : ""}
                    </p>

                    {/* Tech stack */}
                    <div
                      className="flex flex-wrap gap-1.5 pt-3"
                      style={{ borderTop: "1px solid var(--c-border)" }}
                    >
                      {project.technologies.slice(0, 5).map((t) => (
                        <span key={t} className="tech-tag">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="tech-tag">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1, ease }}
        >
          <a
            href="https://github.com/guthaVamshi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <i className="fab fa-github" aria-hidden />
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
