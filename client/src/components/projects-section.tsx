import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { projects } from "@/lib/data";

export default function ProjectsSection() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="py-24 md:py-32 bg-[#f8f8fa] relative overflow-hidden">
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

        {/* Featured project */}
        <motion.div
          className="group mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-xl hover:shadow-indigo-50 transition-all duration-300">
            {/* Image */}
            <div className="relative overflow-hidden aspect-video lg:aspect-auto min-h-[220px]">
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>

            {/* Details */}
            <div className="p-8 flex flex-col justify-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-primary uppercase">Featured Project</span>
                <span className="px-2.5 py-0.5 bg-primary/8 text-primary text-xs rounded-full border border-primary/15 font-medium">
                  {featured.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{featured.name}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{featured.description}</p>

              <div className="flex flex-wrap gap-2">
                {featured.technologies.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-purple-600 transition-colors group/lnk"
              >
                <i className={`${featured.link.includes("github") ? "fab fa-github" : "fas fa-external-link-alt"}`} />
                {featured.link.includes("github") ? "View on GitHub" : "View Project"}
                <i className="fas fa-arrow-right text-xs transform group-hover/lnk:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Rest of projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <motion.a
              key={project.name}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5 }}
            >
              <div className="h-full bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-50 group-hover:border-primary/20 transition-all duration-300 flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                      <i className={`${project.link.includes("github") ? "fab fa-github" : "fas fa-external-link-alt"}`} />
                      {project.link.includes("github") ? "View on GitHub" : "Open Project"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1 gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-primary uppercase">{project.category}</span>
                  <h3 className="font-bold text-slate-900">{project.name}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-50">
                    {project.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </Container>
    </section>
  );
}
