import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from "../Files/VamshiGutha_Latest.pdf"
import profilepic from "../images/Profile.jpeg"
export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute w-full h-full bg-[linear-gradient(transparent_0%,_transparent_calc(100%_-_300px),_var(--tw-gradient-stops))] from-primary/10 to-primary/5"></div>
      </div>
      
      <Container className="relative z-10">
        <motion.div 
          className="max-w-xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">About Me</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get to Know Me Better</h2>
          <p className="text-dark/60 dark:text-light/60">
            I'm passionate about creating innovative solutions to complex problems through technology
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              {/* Profile image with effects */}
              <div className="max-w-sm mx-auto">
                <div className="relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-pink-500 rounded-xl transform rotate-6 scale-105 opacity-30 blur-lg"></div>
                  <div className="relative bg-white dark:bg-dark-accent rounded-xl p-3 shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl"></div>
                    <div className="relative overflow-hidden rounded-lg aspect-square">
                      <img 
                        src={profilepic}
                        alt="Vamshi Gutha" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 -left-8 w-16 h-16 bg-primary/20 rounded-full animate-blob"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-500/10 rounded-full animate-blob animation-delay-2000"></div>
                
                {/* Experience badge */}
                <div className="absolute -right-4 top-1/3 bg-white dark:bg-dark shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <i className="fas fa-code text-sm"></i>
                  </div>
                  <div>
                    <span className="block text-xs text-dark/60 dark:text-light/60">Experience</span>
                    <span className="font-semibold">2+ Years</span>
                  </div>
                </div>
                
                {/* Projects Badge */}
                <div className="absolute -left-4 bottom-1/4 bg-white dark:bg-dark shadow-lg rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500">
                    <i className="fas fa-laptop-code text-sm"></i>
                  </div>
                  <div>
                    <span className="block text-xs text-dark/60 dark:text-light/60">Projects</span>
                    <span className="font-semibold">20+</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Developer & Problem Solver with Modern Tech Skills</h3>
              
              <p className="text-dark/80 dark:text-light/70 leading-relaxed">
                I'm a motivated software engineer with experience in developing applications using various technologies. 
                My passion lies in creating innovative solutions to complex problems and continuous learning.
              </p>
              
              <p className="text-dark/80 dark:text-light/70 leading-relaxed">
                With expertise in Salesforce, web development, and software engineering, I'm always eager to take on new challenges 
                and create impactful solutions that make a difference.
              </p>
            </div>
            
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
              
              <div className="bg-white/50 dark:bg-dark-accent/30 rounded-xl p-5 backdrop-blur-sm border border-light-accent/20 dark:border-dark-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <i className="fas fa-graduation-cap"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Education</h4>
                    <p className="text-dark/70 dark:text-light/70">Masters in Computer Science</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-dark-accent/30 rounded-xl p-5 backdrop-blur-sm border border-light-accent/20 dark:border-dark-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <i className="fab fa-skype"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Skype</h4>
                    <p className="text-dark/70 dark:text-light/70">vamshigutha</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 dark:bg-dark-accent/30 rounded-xl p-5 backdrop-blur-sm border border-light-accent/20 dark:border-dark-accent/20">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Email</h4>
                    <p className="text-dark/70 dark:text-light/70">
                      <a href="mailto:vamshigutha@gmail.com" className="hover:text-primary transition-colors">vamshigutha@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div> */}
            
            <div className="pt-4">
              <a 
                href="https://drive.google.com/file/d/1ot3A9S8d72-2LDljYnN4O96XHz1c-EsU/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group"
              >
                <i className="fas fa-download"></i> 
                Download Resume
                <i className="fas fa-arrow-right transform transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
