import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
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
    <section id="certifications" className="py-16 md:py-24">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-primary">Certifications</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert) => (
            <motion.div 
              key={`${cert.provider}-${cert.name}`}
              className="certification-card group"
              variants={itemVariants}
            >
              <div className="bg-light rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border border-transparent hover:border-primary/20 h-full flex flex-col">
                <div className="p-6 pt-8 flex-1">
                  <div className="w-16 h-16 mx-auto mb-6">
                    {cert.logo ? (
                      <img src={cert.logo} alt={`${cert.provider} ${cert.name}`} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                        <i className="fas fa-certificate text-4xl text-primary"></i>
                      </div>
                    )}
                  </div>
                  <h3 className="font-poppins font-semibold text-xl text-center mb-2">{cert.provider}</h3>
                  <h4 className="font-poppins font-medium text-lg text-center text-primary mb-4">{cert.name}</h4>
                  <div className="text-center text-dark/70">
                    <p>{cert.isComingSoon ? cert.description : <><i className="far fa-calendar-alt mr-2"></i> {cert.date}</>}</p>
                  </div>
                </div>
                <div className="px-6 pb-6 pt-2">
                  <div className="w-full bg-light-accent h-1 rounded-full my-4"></div>
                  {cert.isComingSoon ? (
                    <p className="text-dark/60 text-center italic">In progress</p>
                  ) : (
                    <p className="text-dark/70 text-center">
                      <i className="fas fa-check text-primary mr-2"></i> Completed
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
