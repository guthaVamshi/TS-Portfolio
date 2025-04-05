import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { projects, ProjectCategory } from "@/lib/data";
import { create3DObject } from "@/lib/3d-models";

export default function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectCategory | 'All'>('All');
  const sectionRef = useRef<HTMLElement>(null);
  
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const categories: (ProjectCategory | 'All')[] = ['All', 'Web Development', 'Salesforce', 'MERN Stack'];

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const { cleanup } = create3DObject({
      el: sectionRef.current,
      type: "wave-bg",
      color: 0x6C63FF,
      rotation: false,
      scale: 1,
      isBackground: true
    });

    return cleanup;
  }, []);

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
      ref={sectionRef}
      className="py-16 md:py-24 bg-light-accent/50 dark:bg-dark-accent/50 clip-path-slant relative overflow-hidden"
    >
      {/* 3D wave background will be rendered here */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-accent/80 to-light-accent/95 dark:from-dark-accent/80 dark:to-dark-accent/95 pointer-events-none"></div>

      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-primary">Projects</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button 
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === category 
                    ? 'bg-primary text-white' 
                    : 'bg-light/80 dark:bg-dark/80 backdrop-blur-sm hover:bg-primary hover:text-white'
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
              <div className="bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg group h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-poppins font-semibold text-xl mb-2">{project.name}</h3>
                      <p className="mb-4">{project.description}</p>
                      <a 
                        href={project.link} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 bg-white text-primary rounded-full font-medium hover:bg-white/90 transition-colors"
                      >
                        <i className={`${project.link.includes('github.com') ? 'fab fa-github' : 'fas fa-external-link-alt'} mr-2`}></i> 
                        {project.link.includes('github.com') ? 'View on GitHub' : 'View Website'}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-poppins font-semibold text-xl mb-2">{project.name}</h3>
                  <p className="text-dark/80 dark:text-light/80 mb-4 flex-1">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">{tech}</span>
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
