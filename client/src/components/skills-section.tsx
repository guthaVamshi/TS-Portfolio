import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

export default function SkillsSection() {
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
      id="skills" 
      className="py-16 md:py-24 relative"
    >
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10"></div>
      
      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">My <span className="text-primary">Skills</span></h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto">
            I've developed expertise in various technologies throughout my professional journey.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill) => (
            <motion.div 
              key={skill.name} 
              className="skill-card"
              variants={itemVariants}
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-light-accent/50 hover:border-primary/20">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <i className={`${skill.icon} text-xl text-primary`}></i>
                  </div>
                  <h3 className="font-medium text-base">{skill.name}</h3>
                </div>
                
                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-dark/60">Proficiency</span>
                    <span className="text-xs font-medium text-primary">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-light-accent/30 h-1.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-primary h-full rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    ></motion.div>
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
