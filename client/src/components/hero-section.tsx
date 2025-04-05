import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Modern patterns and background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary/5 to-white dark:from-dark dark:via-primary/10 dark:to-dark"></div>
      <div className="absolute inset-0 opacity-20 dark:opacity-10 bg-[radial-gradient(#6C63FF_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      {/* Animated blurred shapes */}
      <div className="absolute top-20 right-[20%] w-64 h-64 rounded-full bg-primary/30 filter blur-[100px] animate-blob"></div>
      <div className="absolute bottom-20 left-[20%] w-72 h-72 rounded-full bg-pink-400/10 filter blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-40 right-[30%] w-64 h-64 rounded-full bg-blue-400/10 filter blur-[100px] animate-blob animation-delay-4000"></div>
      
      <Container className="py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div 
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              Full Stack Developer
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              <span className="relative">
                <span className="relative z-10">Vamshi Gutha</span>
                <span className="absolute bottom-2 left-0 h-3 w-full bg-primary/20 z-0"></span>
              </span>
            </h1>
            
            <h2 className="text-xl md:text-2xl font-medium text-dark/70 dark:text-light/70">
              Passionate Developer & Problem Solver
            </h2>
            
            <p className="text-base md:text-lg max-w-2xl text-dark/80 dark:text-light/80">
              I specialize in creating innovative solutions using cutting-edge technologies.
              With expertise in Salesforce, web development, and software engineering, I transform complex problems into elegant solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6">
              <a 
                href="#contact" 
                className="px-6 py-3.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 group"
              >
                Get in Touch
                <i className="fas fa-arrow-right ml-2 transform transition-transform group-hover:translate-x-1"></i>
              </a>
              <a 
                href="https://vamshigutha.netlify.app/VamshiGutha_Latest.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-white dark:bg-dark-accent/10 rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all border border-light-accent/50 dark:border-dark-accent/50 font-medium"
              >
                Download Resume
              </a>
            </div>
            
            <div className="flex items-center pt-8">
              <span className="text-dark/50 dark:text-light/50 mr-5 text-sm uppercase tracking-wider font-medium">Connect</span>
              <div className="h-px w-12 bg-dark/20 dark:bg-light/20 mr-5"></div>
              <div className="flex gap-6">
                <a 
                  href="https://github.com/guthaVamshi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark/5 dark:bg-light/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <i className="fab fa-github text-lg"></i>
                </a>
                <a 
                  href="mailto:vamshigutha@gmail.com" 
                  className="w-10 h-10 rounded-full bg-dark/5 dark:bg-light/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <i className="fas fa-envelope text-lg"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/vamshigutha/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark/5 dark:bg-light/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative">
              {/* Modern abstract shapes and profile frame */}
              <div className="w-full max-w-md mx-auto rounded-2xl bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-1.5 shadow-xl">
                <div className="w-full h-full bg-white dark:bg-dark rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&h=800"
                    alt="Vamshi Gutha" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-lg border-8 border-white dark:border-dark bg-primary/20 -rotate-6 z-0"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full border-8 border-white dark:border-dark bg-primary/10 z-0"></div>
              
              {/* Tech stack icons - subtle representation */}
              <div className="absolute -right-4 bottom-1/4 flex flex-col gap-3">
                <div className="w-12 h-12 bg-white dark:bg-dark rounded-full shadow-lg flex items-center justify-center animate-float">
                  <i className="fab fa-react text-xl text-blue-400"></i>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-dark rounded-full shadow-lg flex items-center justify-center animate-float animation-delay-2000">
                  <i className="fab fa-node-js text-xl text-green-500"></i>
                </div>
              </div>
              <div className="absolute -left-4 top-1/4 flex flex-col gap-3">
                <div className="w-12 h-12 bg-white dark:bg-dark rounded-full shadow-lg flex items-center justify-center animate-float animation-delay-1000">
                  <i className="fab fa-salesforce text-xl text-blue-500"></i>
                </div>
                <div className="w-12 h-12 bg-white dark:bg-dark rounded-full shadow-lg flex items-center justify-center animate-float animation-delay-3000">
                  <i className="fab fa-js text-xl text-yellow-500"></i>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="w-10 h-10 rounded-full bg-white dark:bg-dark shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-all">
          <i className="fas fa-chevron-down text-sm"></i>
        </a>
      </motion.div>
    </section>
  );
}
