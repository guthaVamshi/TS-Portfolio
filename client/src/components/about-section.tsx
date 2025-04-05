import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { create3DObject } from "@/lib/3d-models";

export default function AboutSection() {
  const aboutModelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!aboutModelRef.current) return;
    
    const { cleanup } = create3DObject({
      el: aboutModelRef.current,
      type: "octa",
      color: 0x6C63FF,
      rotation: true,
    });

    return cleanup;
  }, []);

  return (
    <section id="about" className="py-16 md:py-24 relative">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">About <span className="text-primary">Me</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden bg-gradient-to-tr from-primary/20 to-secondary/20 p-1">
              <div ref={aboutModelRef} className="aspect-square rounded-xl bg-light dark:bg-dark-accent flex items-center justify-center">
                {/* 3D object will be rendered here */}
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl md:text-2xl font-semibold font-poppins">Passionate developer & problem solver with a determined skillset</h3>
            
            <p className="text-dark/80 dark:text-light/80">
              I'm a motivated software engineer with experience in developing applications using various technologies. My passion lies in creating innovative solutions to complex problems and continuous learning.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1"><i className="fas fa-calendar"></i></div>
                <div>
                  <h4 className="font-medium">Age</h4>
                  <p className="text-dark/70 dark:text-light/70">24</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1"><i className="fas fa-map-marker-alt"></i></div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-dark/70 dark:text-light/70">Khammam, Telangana</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1"><i className="fas fa-graduation-cap"></i></div>
                <div>
                  <h4 className="font-medium">Degree</h4>
                  <p className="text-dark/70 dark:text-light/70">Masters in Computer Science</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1"><i className="fab fa-skype"></i></div>
                <div>
                  <h4 className="font-medium">Skype</h4>
                  <p className="text-dark/70 dark:text-light/70">vamshigutha</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="text-primary mt-1"><i className="fas fa-envelope"></i></div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-dark/70 dark:text-light/70">
                    <a href="mailto:vamshigutha@gmail.com" className="hover:text-primary transition-colors">vamshigutha@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://vamshigutha.netlify.app/VamshiGutha_Latest.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              <i className="fas fa-download"></i> Download Resume
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
