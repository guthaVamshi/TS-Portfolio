import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { useState } from "react";
import { projects, ProjectCategory } from "@/lib/data";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories: (ProjectCategory | 'All')[] = ['All', 'Web Development', 'Salesforce', 'MERN Stack'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section 
      id="projects" 
      className="py-16 md:py-28 relative bg-gradient-to-b from-light to-light-accent/30 dark:from-dark dark:to-dark-accent/30"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj4KICA8cGF0aCBkPSJNNiA2aDQ4djQ4SDZ6IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMC41Ii8+Cjwvc3ZnPg==')] opacity-50 dark:opacity-30"></div>

      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">My <span className="text-primary">Projects</span></h2>
          <p className="text-lg text-dark/70 dark:text-light/70 max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing my skills and experience in creating
            modern, user-friendly applications.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setFilter(category)}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 font-medium ${
                  filter === category 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-dark-accent text-dark dark:text-light hover:bg-primary/10 dark:hover:bg-primary/20 border border-light-accent/50 dark:border-dark-accent/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.name}
              className="project-card"
              variants={itemVariants}
              data-category={project.category}
            >
              <div className="bg-white dark:bg-dark rounded-xl overflow-hidden shadow-xl group h-full flex flex-col border border-light-accent/50 dark:border-dark-accent/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
                      >
                        <i className={`${project.link.includes('github.com') ? 'fab fa-github' : 'fas fa-external-link-alt'} mr-2`}></i> 
                        {project.link.includes('github.com') ? 'View on GitHub' : 'View Project'}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">{project.category}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{project.name}</h3>
                  <p className="text-dark/70 dark:text-light/70 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-light-accent/20 dark:border-dark-accent/20">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-light-accent/50 dark:bg-dark-accent/50 text-dark dark:text-light rounded text-xs font-medium">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
