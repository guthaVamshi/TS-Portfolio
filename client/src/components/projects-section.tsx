import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

const CURATED = ["Integration Hub", "AI-Assisted Retail Product Discovery Platform", "MoneyFind", "Insurance Claims Workflow Modernization", "Next Hire", "Next Hire Salesforce"];
const CATEGORIES = ["All", "Web Development", "Salesforce", "MERN Stack"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      className="project-card group"
      layout
      initial={{ opacity: 0, y: reduced ? 0 : 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Dialog>
        <DialogTrigger asChild>
          <button className="project-open text-left w-full block cursor-pointer" aria-label={`View ${project.name} details`}>
            <div
              className="project-image relative overflow-hidden"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <span className="project-index">0{index + 1}</span>
              <span className="project-launch" aria-hidden="true">
                <ArrowUpRight size={20} />
              </span>
              <motion.img
                src={project.image}
                alt={`${project.name} preview`}
                loading="lazy"
                animate={hovered ? { scale: 1.06, y: -4 } : { scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
            <div className="project-meta flex justify-between items-center mt-4 text-xs font-mono">
              <span className="text-[var(--c-text-muted)]">{project.category}</span>
              <span className="text-[var(--c-accent)]">{project.status === "in-progress" ? "In Progress" : "Completed"}</span>
            </div>
            <h3 className="mt-2 text-xl font-bold flex items-center justify-between gap-2 group-hover:text-[var(--c-accent)] transition-colors">
              <span>{project.name}</span>
              <ArrowUpRight size={20} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[var(--c-accent)]" />
            </h3>
          </button>
        </DialogTrigger>
        <p className="text-sm text-[var(--c-text-muted)] mt-2 line-clamp-3 leading-relaxed">
          {project.description}
        </p>
        <div className="project-tags flex flex-wrap gap-1.5 mt-4">
          {project.technologies.slice(0, 4).map(tech => (
            <span key={tech} className="text-xs px-2.5 py-1 rounded bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-text-muted)]">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 rounded bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-accent)]">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
        <DialogContent className="project-dialog max-w-2xl bg-[var(--c-surface)] border border-[var(--c-border)] p-6 rounded-2xl">
          <div className="relative overflow-hidden rounded-xl bg-[var(--c-surface-2)] p-4 flex items-center justify-center border border-[var(--c-border)]">
            <img src={project.image} alt={project.name} className="max-h-72 object-contain rounded-lg shadow-lg" />
          </div>
          <div className="mt-4">
            <p className="text-xs font-mono uppercase tracking-wider text-[var(--c-accent)]">{project.category}</p>
            <DialogTitle className="text-2xl font-bold text-white mt-1">{project.name}</DialogTitle>
          </div>
          <div className="mt-4">
            <h4 className="text-xs font-mono uppercase text-[var(--c-text-faint)] mb-1">Architecture &amp; Overview</h4>
            <DialogDescription className="text-sm text-[var(--c-text-muted)] leading-relaxed">{project.description}</DialogDescription>
          </div>
          {project.synergy && (
            <div className="mt-3">
              <h4 className="text-xs font-mono uppercase text-[var(--c-accent)] mb-1">Integration Architecture</h4>
              <p className="text-xs text-[var(--c-text-muted)] leading-relaxed">{project.synergy}</p>
            </div>
          )}
          <div className="mt-4">
            <h4 className="text-xs font-mono uppercase text-[var(--c-text-faint)] mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className="text-xs px-2.5 py-1 rounded-full bg-[var(--c-surface-2)] border border-[var(--c-border)] text-[var(--c-accent)]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[var(--c-border)] flex justify-end">
            <a
              href="https://github.com/guthaVamshi"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              <Github size={16} />
              <span>View Repository</span>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const [category, setCategory] = useState("All");
  const pool = projects.filter(p => CURATED.includes(p.name));
  const filtered = category === "All" ? pool : pool.filter(p => p.category === category);

  return (
    <section id="projects" aria-label="Projects" className="section-padding">
      <div className="content-container">
        <motion.div
          className="project-header flex flex-col sm:flex-row justify-between sm:items-end gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="section-label">Featured Work</p>
            <h2 className="section-title">Architected Solutions &amp; Projects</h2>
          </div>
          <span className="text-xs font-mono text-[var(--c-text-muted)]">
            Showing 0{filtered.length} / 0{pool.length}
          </span>
        </motion.div>

        <div className="project-filters flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              aria-pressed={category === cat}
              className={`text-xs px-4 py-2 rounded-full border transition-all cursor-pointer ${
                category === cat
                  ? "bg-[var(--c-accent)] text-[#07090d] border-[var(--c-accent)] font-semibold shadow-sm"
                  : "bg-transparent text-[var(--c-text-muted)] border-[var(--c-border)] hover:border-[var(--c-accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="sr-only" role="status">{filtered.length} projects shown</div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((p, idx) => (
            <ProjectCard key={p.name} project={p} index={idx} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://github.com/guthaVamshi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github size={16} />
            <span>Explore All Repositories on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
}
