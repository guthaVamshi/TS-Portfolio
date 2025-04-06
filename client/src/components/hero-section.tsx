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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            className="space-y-6 max-w-3xl mx-auto lg:mx-0 text-center lg:text-left"
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
              Full Stack Developer / Salesforce Developer
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
            
            <p className="text-base md:text-lg max-w-2xl mx-auto lg:mx-0 text-dark/80 dark:text-light/80">
              I specialize in creating innovative solutions using cutting-edge technologies.
              With expertise in Salesforce, web development, and software engineering, I transform complex problems into elegant solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-6 justify-center lg:justify-start">
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
                className="px-6 py-3.5 bg-white dark:bg-dark-accent text-dark dark:text-light rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20 transition-all border border-light-accent/50 dark:border-dark-accent/50 font-medium"
              >
                Download Resume
              </a>
            </div>
            
            <motion.div 
              className="flex items-center pt-8 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
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
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Abstract tech elements */}
            <div className="relative h-96 w-full max-w-xl mx-auto">
              {/* Tech elements */}
              <div className="absolute top-0 left-0 right-0 bottom-0">
                {/* Main circular element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-4 border-primary/30 animate-[spin_15s_linear_infinite]">
                  {/* Inner decorative nodes */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                </div>
                
                {/* Secondary orbit */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-dashed border-primary/20 animate-[spin_20s_linear_infinite_reverse]">
                  {/* Inner decorative nodes */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white dark:bg-dark rounded-lg shadow-lg flex items-center justify-center animate-float">
                    <i className="fab fa-react text-2xl text-blue-400"></i>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-white dark:bg-dark rounded-lg shadow-lg flex items-center justify-center animate-float animation-delay-2000">
                    <i className="fab fa-salesforce text-2xl text-blue-500"></i>
                  </div>
                </div>
                
                {/* Third orbit */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-44 h-44 rounded-full border border-primary/10 animate-[spin_10s_linear_infinite]">
                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-dark rounded-lg shadow-lg flex items-center justify-center animate-float animation-delay-1000">
                    <i className="fab fa-node-js text-2xl text-green-500"></i>
                  </div>
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white dark:bg-dark rounded-lg shadow-lg flex items-center justify-center animate-float animation-delay-3000">
                    <i className="fab fa-js text-2xl text-yellow-500"></i>
                  </div>
                </div>
                
                {/* Center element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl bg-primary shadow-lg shadow-primary/30 rotate-45 flex items-center justify-center animate-pulse">
                  <div className="absolute inset-2 rounded-xl bg-white dark:bg-dark flex items-center justify-center">
                    <span className="text-2xl font-bold rotate-[-45deg] text-primary">V<span className="text-primary">G</span></span>
                  </div>
                </div>
              </div>
              
              {/* Diagonal lines decoration */}
              <div className="absolute top-1/3 right-10 w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45"></div>
              <div className="absolute bottom-1/3 left-10 w-40 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent rotate-45"></div>
            </div>
          </motion.div>
        </div>
      </Container>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="w-10 h-10 rounded-full bg-white dark:bg-dark text-dark dark:text-light shadow-md flex items-center justify-center hover:bg-primary hover:text-white transition-all">
          <i className="fas fa-chevron-down text-sm"></i>
        </a>
      </motion.div>
    </section>
  );
}
