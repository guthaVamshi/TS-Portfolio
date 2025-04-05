import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { education } from "@/lib/data";

export default function EducationSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="education" className="py-16 md:py-24">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-primary">Education</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {education.map((edu) => (
            <motion.div 
              key={edu.institution}
              className="education-card group"
              variants={itemVariants}
            >
              <div className="bg-light dark:bg-dark rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border border-transparent hover:border-primary/20 h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 overflow-hidden rounded-lg flex-shrink-0">
                    <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-xl">{edu.institution}</h3>
                    <p className="text-primary font-medium">{edu.degree}</p>
                  </div>
                </div>
                <div className="pl-20">
                  <p className="text-dark/70 dark:text-light/70 mb-2">
                    <i className="far fa-calendar-alt mr-2"></i> {edu.period}
                  </p>
                  <p className="text-dark/80 dark:text-light/80">
                    {edu.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
