import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="py-16 md:py-24 bg-light-accent/50 dark:bg-dark-accent/50 clip-path-slant relative">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-primary">Experience</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-y-16 gap-x-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative pl-7">
              {experience.slice(0, 2).map((exp, index) => (
                <motion.div 
                  key={`${exp.company}-${exp.position}`}
                  className="experience-item mb-12"
                  variants={itemVariants}
                >
                  <div className="bg-primary w-4 h-4 absolute left-0 top-0 rounded-full"></div>
                  <div className="bg-light dark:bg-dark rounded-xl p-6 shadow-lg ml-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 overflow-hidden rounded-lg flex-shrink-0">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-lg">{exp.company}</h3>
                        <p className="text-primary font-medium">{exp.position}</p>
                      </div>
                    </div>
                    <p className="text-dark/70 dark:text-light/70 mb-2">{exp.period}</p>
                    <p className="text-dark/80 dark:text-light/80">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="relative pl-7">
              {experience.slice(2).map((exp, index) => (
                <motion.div 
                  key={`${exp.company}-${exp.position}`}
                  className={`experience-item ${index === experience.slice(2).length - 1 ? '' : 'mb-12'}`}
                  variants={itemVariants}
                >
                  <div className="bg-primary w-4 h-4 absolute left-0 top-0 rounded-full"></div>
                  <div className="bg-light dark:bg-dark rounded-xl p-6 shadow-lg ml-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 overflow-hidden rounded-lg flex-shrink-0">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-poppins font-semibold text-lg">{exp.company}</h3>
                        <p className="text-primary font-medium">{exp.position}</p>
                      </div>
                    </div>
                    <p className="text-dark/70 dark:text-light/70 mb-2">{exp.period}</p>
                    <p className="text-dark/80 dark:text-light/80">
                      {exp.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
