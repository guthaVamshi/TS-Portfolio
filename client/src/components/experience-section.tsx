import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { experience } from "@/lib/data";

export default function ExperienceSection() {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="experience" className="py-16 md:py-24 bg-light-accent/30 relative">
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
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute top-0 bottom-0 left-0 md:left-1/2 w-1 bg-primary/20 rounded-full -ml-0.5 md:-ml-0.5"></div>
            
            {experience.map((exp, index) => (
              <motion.div 
                key={`${exp.company}-${exp.position}`}
                className="mb-16 relative"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 -ml-2 md:-ml-2 mt-1.5 w-4 h-4 bg-white border-2 border-primary rounded-full z-10"></div>
                
                {/* Content container */}
                <div className={`ml-8 md:ml-0 md:${index % 2 === 0 ? 'mr-1/2 md:pr-8' : 'ml-1/2 md:pl-8'}`}>
                  <div className={`md:${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <div className={`bg-white rounded-xl p-6 shadow-md border-t-4 border-primary`}>
                      <div className="flex flex-col sm:flex-row items-start gap-4 mb-4">
                        <div className="w-14 h-14 overflow-hidden rounded-lg flex-shrink-0 bg-light p-2 mx-auto sm:mx-0">
                          <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                        </div>
                        <div className="sm:flex-1">
                          <h3 className="font-bold text-lg">{exp.company}</h3>
                          <p className="text-primary font-medium">{exp.position}</p>
                          <div className="mt-2 inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            {exp.period}
                          </div>
                        </div>
                      </div>
                      <p className="text-dark/80 mt-3">
                        {exp.description}
                      </p>
                    </div>
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
