import { useState } from "react";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";

const categories = ["All", "Web Development", "Salesforce", "MERN Stack"];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  const featured = projects[0];
  const displayedGridProjects = selectedCategory === "All"
    ? filteredProjects.slice(1)
    : filteredProjects;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#f8f8fa]/30 relative overflow-hidden">
      {/* Background Decorative Blobs matching the site's skills/about patterns */}
      <div className="absolute -left-32 top-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-blob" />
      <div className="absolute -right-32 bottom-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -z-10 animate-blob animation-delay-2000" />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-200 select-none leading-none">06.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">What I've Built</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Projects</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        {/* Premium Category Filter Tabs */}
        <motion.div
          className="flex flex-wrap gap-2 mb-12 p-1.5 bg-slate-100 rounded-2xl w-fit border border-slate-200/30"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-300 z-10 ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {category}
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md shadow-primary/25"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Featured Project Spotlight - only shown when "All" category is active */}
        <AnimatePresence mode="wait">
          {selectedCategory === "All" && (
            <motion.div
              key="featured-project"
              className="group mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div 
                onMouseMove={handleMouseMove}
                className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-white/20 dark:border-white/5 glass-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 spotlight-card"
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video lg:aspect-auto lg:col-span-7 min-h-[300px] lg:min-h-[420px]">
                  <img
                    src={featured.image}
                    alt={featured.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3.5 py-1.5 bg-black/40 backdrop-blur-md text-white text-[10px] rounded-full border border-white/10 font-bold uppercase tracking-wider">
                      Spotlight Project
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center gap-5 relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-xs font-bold tracking-widest text-primary uppercase">
                      {featured.category}
                    </span>
                    
                    {featured.status && (
                      featured.status === "in-progress" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                          </span>
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Completed
                        </span>
                      )
                    )}
                  </div>
                  
                  <h3 className="text-2xl lg:text-3xl font-black font-outfit text-slate-900 dark:text-slate-100 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {featured.name}
                  </h3>
                  
                  <p className="text-slate-650 dark:text-slate-350 text-sm leading-relaxed font-medium">
                    {featured.description}
                  </p>

                  {featured.synergy && (
                    <div className="p-4 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-primary">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 leading-none mb-1">
                            Ecosystem Synergy
                          </p>
                          <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed font-bold">
                            {featured.synergy}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {featured.technologies.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-slate-200/50 dark:bg-white/5 text-slate-600 dark:text-slate-350 rounded-lg text-xs font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid of Projects */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {displayedGridProjects.map((project, i) => (
              <motion.div
                key={project.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="group flex flex-col h-full"
              >
                <div 
                  onMouseMove={handleMouseMove}
                  className="h-full glass-card rounded-3xl border border-white/20 dark:border-white/5 overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 flex flex-col spotlight-card"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1 gap-3 relative z-10">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                        {project.category}
                      </span>
                      
                      {project.status && (
                        project.status === "in-progress" ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                            </span>
                            In Progress
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-0.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Completed
                          </span>
                        )
                      )}
                    </div>
                    
                    <h3 className="font-outfit font-black text-lg text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors duration-200">
                      {project.name}
                    </h3>
                    
                    <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed flex-1 font-medium">
                      {project.description}
                    </p>

                    {/* Synergy box in Grid Card */}
                    {project.synergy && (
                      <div className="p-3.5 rounded-2xl bg-primary/5 dark:bg-white/5 border border-primary/10 dark:border-white/10">
                        <div className="flex items-start gap-2">
                          <span className="mt-0.5 text-primary">
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          </span>
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 leading-none mb-1">
                              Ecosystem Synergy
                            </p>
                            <p className="text-[10px] text-slate-650 dark:text-slate-350 leading-relaxed font-bold">
                              {project.synergy}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100/40 dark:border-white/5">
                      {project.technologies.map((t) => (
                        <span key={t} className="px-2 py-0.5 bg-slate-200/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 rounded text-[10px] font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </section>
  );
}
