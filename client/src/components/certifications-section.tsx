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
    <section id="certifications" className="py-16 md:py-24 bg-gradient-to-b from-white to-light-accent/20">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">My <span className="text-primary">Certifications</span></h2>
          <p className="text-lg text-dark/70 max-w-2xl mx-auto">
            Professional certifications that validate my expertise and knowledge in various technologies.
          </p>
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
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 h-full flex flex-col transform hover:-translate-y-1">
                <div className="p-6 flex-1">
                  <div className="flex items-center mb-5">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mr-4 p-2">
                      {cert.logo ? (
                        <img src={cert.logo} alt={`${cert.provider} ${cert.name}`} className="w-full h-full object-contain" />
                      ) : (
                        <i className="fas fa-certificate text-3xl text-primary"></i>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{cert.provider}</h3>
                      <p className="text-primary font-medium">{cert.name}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${cert.isComingSoon ? 'bg-yellow-400' : 'bg-green-500'}`}></div>
                      <p className="text-sm font-medium">
                        {cert.isComingSoon ? 'In Progress' : 'Completed'}
                      </p>
                      <div className="ml-auto text-sm text-dark/60">
                        {!cert.isComingSoon && <span><i className="far fa-calendar-alt mr-1"></i>{cert.date}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-dark/70 text-sm">
                    {cert.description || `${cert.provider} certification that validates expertise in ${cert.name}.`}
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
