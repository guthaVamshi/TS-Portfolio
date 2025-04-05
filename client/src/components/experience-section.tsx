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
    <section id="experience" className="py-16 md:py-24 bg-light-accent/30 clip-path-slant relative">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">My <span className="text-primary">Experience</span></h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto">
            Professional experience in the software development industry.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>
            
            {experience.map((exp, index) => (
              <motion.div 
                key={`${exp.company}-${exp.position}`}
                className={`experience-item mb-16 relative`}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-primary rounded-full z-10"></div>
                
                <div className={`flex flex-col md:flex-row items-center md:items-start gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Date badge */}
                  <div className="flex-1 md:max-w-[180px] text-center md:text-right">
                    <div className={`inline-block bg-primary text-white px-4 py-2 rounded-lg font-semibold text-sm ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                      {exp.period}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`flex-1 bg-white rounded-xl p-6 shadow-lg border-t-4 border-primary`}>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 overflow-hidden rounded-lg flex-shrink-0 bg-light p-2">
                        <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{exp.company}</h3>
                        <p className="text-primary font-medium">{exp.position}</p>
                      </div>
                    </div>
                    <p className="text-dark/80">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
