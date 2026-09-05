import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";
import { TiltCard } from "./ui/tilt-card";

// High quality curated showcase projects
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const pool = projects.filter((p) => CURATED.includes(p.name));
  const filtered =
    category === "All" ? pool : pool.filter((p) => p.category === category);

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="section-padding relative"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="content-container">
        {/* Section header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <p className="section-label mb-0">Featured Work</p>
          </div>
          <h2 className="section-title">Architected Solutions & Projects</h2>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 mb-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          role="tablist"
        >
          {CATEGORIES.map((cat) => {
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                role="tab"
                aria-selected={isActive}
                className={`relative px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "text-white bg-purple-600/30 border border-purple-500/40 shadow-lg shadow-purple-950/30"
                    : "text-slate-400 hover:text-slate-200 bg-slate-900/40 border border-white/5 hover:border-white/15"
                }`}
              >
                {cat}
                {isActive && (
                  <motion.span
                    layoutId="projectCatPill"
                    className="absolute inset-0 rounded-xl bg-purple-500/10 -z-10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* 3D Tilt Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const isInProgress = project.status === "in-progress";

              return (
                <motion.div
                  key={project.name}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -10 }}
                  transition={{ duration: 0.35, delay: i * 0.05 }}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer group"
                >
                  <TiltCard
                    maxTilt={7}
                    glowColor="rgba(168, 85, 247, 0.22)"
                    className="h-full rounded-2xl border border-white/10 bg-slate-900/50 hover:border-purple-500/40 transition-colors duration-300 flex flex-col overflow-hidden shadow-xl"
                  >
                    {/* Project Image Banner */}
                    <div className="relative h-48 overflow-hidden bg-slate-950">
                      <img
                        src={project.image}
                        alt={`${project.name} preview`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div
                        aria-hidden
                        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
                      />

                      {/* Status Badge */}
                      <span
                        className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${
                          isInProgress
                            ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                            : "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                        }`}
                      >
                        {isInProgress ? "In Progress" : "Completed"}
                      </span>

                      {/* Category Label */}
                      <span className="absolute bottom-3 left-4 text-[11px] font-mono tracking-wider text-purple-300 uppercase font-semibold">
                        {project.category}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
                          <span>{project.name}</span>
                          <i className="fas fa-arrow-up-right text-xs text-slate-400 group-hover:text-purple-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </h3>
                        <p className="text-xs leading-relaxed text-slate-400 mt-2 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                        {project.technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/5 group-hover:border-purple-500/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-purple-950/40 text-purple-300 border border-purple-500/30">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Shortcut */}
        <motion.div
          className="mt-14 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <a
            href="https://github.com/guthaVamshi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary group"
          >
            <i className="fab fa-github text-sm transition-transform group-hover:scale-110" aria-hidden />
            <span>Explore All Repositories on GitHub</span>
          </a>
        </motion.div>
      </div>

      {/* Interactive Project Quick-View Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-slate-900 border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-800/80 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xs" />
              </button>

              {/* Modal Banner */}
              <div className="relative h-60 w-full bg-slate-950">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-mono text-purple-300 uppercase tracking-wider font-semibold">
                    {selectedProject.category}
                  </span>
                  <h3 className="text-2xl font-bold font-outfit text-white mt-1">
                    {selectedProject.name}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Description */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Architecture & Overview
                  </h4>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Synergy & Impact */}
                {selectedProject.synergy && (
                  <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-purple-300 mb-1 flex items-center gap-1.5">
                      <i className="fas fa-layer-group text-xs" />
                      Integration Architecture
                    </h4>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {selectedProject.synergy}
                    </p>
                  </div>
                )}

                {/* Tech Stack Full Breakdown */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 text-purple-200 border border-purple-500/20 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <a
                    href="https://github.com/guthaVamshi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                    style={{ fontSize: "13px", padding: "8px 20px" }}
                  >
                    <i className="fab fa-github text-xs" />
                    <span>View Repository</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
