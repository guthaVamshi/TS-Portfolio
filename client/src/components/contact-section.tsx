import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";


export default function ContactSection() {
  

  return (
    <section 
      id="contact" 
      className="py-16 md:py-28 relative"
    >
      {/* Modern patterned background */}
      <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10">
        <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#6C63FF_1px,transparent_1px)] [background-size:20px_20px]"></div>
      </div>
      
      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Get In <span className="text-primary">Touch</span></h2>
          <p className="text-lg text-dark/70 dark:text-light/70 max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>
        
        <Container>
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          
        </motion.div>
        
        <div className="max-w-md mx-auto">
          <motion.div 
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Email */}
            <a 
              href="mailto:vamshigutha@gmail.com" 
              className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <i className="fas fa-envelope text-primary"></i>
              </div>
              <span className="text-dark">vamshigutha@gmail.com</span>
            </a>
            
            {/* Skype */}
            <a 
              href="skype:vamshigutha?call" 
              className="w-full flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-all"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <i className="fab fa-skype text-primary"></i>
              </div>
              <span className="text-dark">vamshigutha</span>
            </a>
          </motion.div>
        </div>
      </Container>
      </Container>
    </section>
  );
}
