import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { create3DObject } from "@/lib/3d-models";
import { skills } from "@/lib/data";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const { cleanup } = create3DObject({
      el: sectionRef.current,
      type: "code", // Using code symbols as background
      color: 0x6C63FF,
      rotation: true,
      scale: 1.5,
      isBackground: true
    });

    return cleanup;
  }, []);

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
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-16 md:py-24 bg-light-accent/50 dark:bg-dark-accent/50 clip-path-slant relative overflow-hidden"
    >
      {/* 3D background will be rendered here */}
      <div className="absolute inset-0 bg-gradient-to-b from-light-accent/80 to-light-accent/95 dark:from-dark-accent/80 dark:to-dark-accent/95 pointer-events-none"></div>
      
      <Container className="relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">My <span className="text-primary">Skills</span></h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.name} 
              className="skill-card group"
              variants={itemVariants}
            >
              <div className="bg-light/80 dark:bg-dark/80 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 border border-transparent hover:border-primary/20">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <i className={`${skill.icon} text-3xl text-primary`}></i>
                </div>
                <h3 className="font-poppins font-medium text-lg mb-2">{skill.name}</h3>
                <div className="w-full bg-light-accent dark:bg-dark-accent h-2 rounded-full overflow-hidden">
                  <motion.div 
                    className="bg-primary h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
