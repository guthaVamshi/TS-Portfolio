import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";

const CURATED = ["Integration Hub", "AI-Assisted Retail Product Discovery Platform", "MoneyFind", "Insurance Claims Workflow Modernization", "Next Hire", "Next Hire Salesforce"];
const CATEGORIES = ["All", "Web Development", "Salesforce", "MERN Stack"];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, .5, 1], [1.12, 1, 1.04]);
  const y = useTransform(scrollYProgress, [0, 1], [16, -16]);
  return (
    <motion.article ref={ref} className="project-card" initial={{ opacity: 0, y: reduced ? 0 : 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>
      <Dialog>
        <DialogTrigger asChild>
          <button className="project-open" aria-label={`View ${project.name} details`}>
            <div className="project-image"><span className="project-index">0{index + 1}</span><motion.img src={project.image} alt={`${project.name} preview`} loading="lazy" style={reduced ? undefined : { scale, y }} /></div>
            <div className="project-meta"><span>{project.category}</span><span>{project.status === "in-progress" ? "In Progress" : "Completed"}</span></div>
            <h3>{project.name}<ArrowUpRight size={22} /></h3>
          </button>
        </DialogTrigger>
        <p>{project.description}</p>
        <div className="project-tags">{project.technologies.slice(0, 4).map(tech => <span key={tech}>{tech}</span>)}{project.technologies.length > 4 && <span>+{project.technologies.length - 4}</span>}</div>
        <DialogContent className="project-dialog">
          <img src={project.image} alt={project.name} />
          <div><p className="section-label">{project.category}</p><DialogTitle className="text-2xl leading-tight">{project.name}</DialogTitle></div>
          <div><h4>Architecture &amp; Overview</h4><DialogDescription>{project.description}</DialogDescription></div>
          {project.synergy && <div><h4>Integration Architecture</h4><p>{project.synergy}</p></div>}
          <div><h4>Technologies Used</h4><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div></div>
          <a href="https://github.com/guthaVamshi" target="_blank" rel="noopener noreferrer" className="btn-primary w-fit"><Github size={16} />View Repository</a>
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
        <motion.div className="project-header" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .7 }}><div><p className="section-label">Featured Work</p><h2 className="section-title">Architected Solutions &amp; Projects</h2></div><span className="text-xs text-[var(--c-text-muted)]">01 — 0{pool.length}</span></motion.div>
        <div className="project-filters" role="group" aria-label="Filter projects">{CATEGORIES.map(cat => <button key={cat} onClick={() => setCategory(cat)} aria-pressed={category === cat}>{cat}</button>)}</div>
        <div className="sr-only" role="status">{filtered.length} projects shown</div>
        <div className="project-grid">{filtered.map(p => <ProjectCard key={p.name} project={p} index={pool.indexOf(p)} />)}</div>
        <div className="mt-16 text-center"><a href="https://github.com/guthaVamshi" target="_blank" rel="noopener noreferrer" className="btn-secondary"><Github size={16} />Explore All Repositories on GitHub</a></div>
      </div>
    </section>
  );
}
