import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from '../Files/Vamshi_SFDC.pdf';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50"></div>
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Simple gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-400/5"></div>
        
        {/* Minimal dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(99,102,241,0.1)_1px,transparent_0)] [background-size:40px_40px]"></div>
      </div>

      <Container className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-8">
          
          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white/60 backdrop-blur-sm border border-primary/20 rounded-full shadow-lg mx-auto"
          >
            <motion.div
              className="w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full flex-shrink-0"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs sm:text-sm font-medium text-slate-700 whitespace-nowrap">Available for opportunities</span>
            </motion.div>
            
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-3 sm:space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              <span className="block bg-gradient-to-r from-slate-900 via-primary to-purple-600 bg-clip-text text-transparent">
                Vamshi Gutha
              </span>
            </h1>
          </motion.div>

          {/* Role & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-4 sm:space-y-6"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-slate-700 leading-tight">
              Salesforce Developer & Full Stack Engineer
             </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed px-4">
              Passionate about creating scalable solutions with <span className="font-semibold text-primary">5+ years</span> of experience 
              in Salesforce ecosystem and modern web technologies. I transform complex business requirements into 
              elegant, user-friendly applications.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto px-4"
          >
            {[
              { icon: "fab fa-salesforce", label: "Salesforce", color: "from-blue-400 to-blue-600" },
              { icon: "fab fa-react", label: "React", color: "from-cyan-400 to-blue-500" },
              { icon: "fab fa-node-js", label: "Node.js", color: "from-green-400 to-emerald-600" },
              { icon: "fab fa-js", label: "JavaScript", color: "from-yellow-400 to-orange-500" }
            ].map((skill, index) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-3 sm:p-4 bg-gradient-to-br ${skill.color} rounded-xl sm:rounded-2xl shadow-lg text-white text-center group cursor-pointer`}
              >
                <i className={`${skill.icon} text-xl sm:text-2xl mb-1 sm:mb-2 block group-hover:scale-110 transition-transform`}></i>
                <span className="text-xs sm:text-sm font-medium">{skill.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 px-4"
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 group text-center"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <span className="text-sm sm:text-base">Let's Work Together</span>
                <motion.i 
                  className="fas fa-arrow-right text-sm"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </span>
            </motion.a>
            
            <motion.a
              href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-sm text-slate-700 rounded-xl sm:rounded-2xl font-semibold border-2 border-slate-200 hover:border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
            >
              <span className="flex items-center justify-center gap-2 sm:gap-3">
                <i className="fas fa-download text-primary text-sm"></i>
                <span className="text-sm sm:text-base">View Resume</span>
              </span>
            </motion.a>
          </motion.div>
          
          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="flex justify-center gap-4 sm:gap-6 pt-6 sm:pt-8 px-4"
          >
            {[
              { icon: "fab fa-github", href: "https://github.com/guthaVamshi", color: "hover:text-gray-900" },
              { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/vamshi-gutha/", color: "hover:text-blue-600" },
              { icon: "fas fa-envelope", href: "mailto:vamshigutha@gmail.com", color: "hover:text-red-500" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target={social.href.startsWith('mailto:') ? undefined : "_blank"}
                rel={social.href.startsWith('mailto:') ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.4 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -3 }}
                className={`w-10 h-10 sm:w-12 sm:h-12 bg-white/60 backdrop-blur-sm border border-slate-200 rounded-xl sm:rounded-2xl flex items-center justify-center text-slate-600 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl`}
              >
                <i className={`${social.icon} text-base sm:text-lg`}></i>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          whileHover={{ scale: 1.1 }}
          className="w-10 h-10 sm:w-12 sm:h-12 bg-white/70 backdrop-blur-sm border border-white/50 rounded-xl sm:rounded-2xl shadow-xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 group"
        >
          <motion.i 
            className="fas fa-chevron-down text-sm sm:text-base text-slate-600 group-hover:text-white"
            animate={{ y: [0, 2, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>
    </section>
  );
}