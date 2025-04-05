import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { create3DObject } from "@/lib/3d-models";
import * as THREE from "three";

export default function HeroSection() {
  const heroModelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroModelRef.current) return;
    
    const { cleanup } = create3DObject({
      el: heroModelRef.current,
      type: "torus",
      color: 0x6C63FF,
      rotation: true,
      scale: 2.5,
    });

    return cleanup;
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <motion.div 
            className="lg:col-span-3 space-y-6 z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-primary font-medium">Hello, I'm</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight">
              Vamshi Gutha
            </h1>
            <h2 className="text-xl md:text-2xl font-medium text-dark/70 dark:text-light/70">
              Passionate Developer & Problem Solver
            </h2>
            <p className="text-base md:text-lg max-w-2xl text-dark/80 dark:text-light/80">
              I specialize in creating innovative solutions using cutting-edge technologies.
              With expertise in Salesforce, web development, and software engineering, I transform complex problems into elegant solutions.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
              >
                Get in Touch
              </a>
              <a 
                href="https://vamshigutha.netlify.app/VamshiGutha_Latest.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-all"
              >
                Download Resume
              </a>
            </div>
            <div className="flex gap-4 pt-2">
              <a 
                href="https://github.com/guthaVamshi" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a 
                href="mailto:vamshigutha@gmail.com" 
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <i className="fas fa-envelope text-2xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/vamshigutha/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-2 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-2xl overflow-hidden bg-gradient-to-tr from-primary/20 to-secondary/20 p-1">
              <div ref={heroModelRef} className="aspect-square rounded-xl bg-light dark:bg-dark-accent flex items-center justify-center">
                {/* 3D object will be rendered here */}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      </Container>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <a href="#about" className="text-dark/70 dark:text-light/70 hover:text-primary dark:hover:text-primary transition-colors">
          <i className="fas fa-chevron-down text-xl"></i>
        </a>
      </motion.div>
    </section>
  );
}
