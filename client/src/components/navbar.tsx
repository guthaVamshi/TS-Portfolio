import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled 
          ? "backdrop-blur-md bg-white/90 py-2 shadow-md" 
          : "bg-transparent py-6"
      )}
    >
      <Container>
        <div className="flex justify-between items-center">
          <a href="#" className="relative group">
            <span className="text-xl sm:text-2xl font-bold">
              Vamshi<span className="text-primary">.</span>
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
          </a>
          
          <div className="hidden md:flex items-center">
            <div className="mr-6 flex items-center space-x-1">
              {NAV_LINKS.map((link, index) => (
                <a 
                  key={link.name}
                  href={link.href} 
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    "hover:text-primary hover:bg-primary/5",
                    scrolled ? "text-dark" : "text-dark/90"
                  )}
                  onClick={handleNavLinkClick}
                >
                  {link.name}
                </a>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/guthaVamshi" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-light/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <i className="fab fa-github text-sm"></i>
              </a>
              
              <a 
                href="https://www.linkedin.com/in/vamshigutha/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-light/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all"
              >
                <i className="fab fa-linkedin-in text-sm"></i>
              </a>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "md:hidden w-10 h-10 flex items-center justify-center rounded-full text-dark",
              scrolled 
                ? "bg-light/30" 
                : "bg-light/80"
            )}
            aria-label="Toggle mobile menu"
          >
            <i className={cn("fas", isMenuOpen ? "fa-times" : "fa-bars")}></i>
          </button>
        </div>
      </Container>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          "fixed inset-0 bg-white z-40 md:hidden transition-transform duration-300 pt-20",
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        )}
      >
        <Container>
          <div className="flex flex-col space-y-4 py-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="py-3 px-4 text-lg font-medium text-dark hover:text-primary hover:bg-primary/5 rounded-xl transition-colors"
                onClick={handleNavLinkClick}
              >
                {link.name}
              </a>
            ))}
            
            <div className="mt-6 pt-6 border-t border-light-accent/30 flex items-center justify-center">
              <div className="flex items-center gap-4">
                <a 
                  href="https://github.com/guthaVamshi" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-light-accent/50 text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a 
                  href="https://www.linkedin.com/in/vamshigutha/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-light-accent/50 text-dark flex items-center justify-center hover:bg-primary hover:text-white transition-all"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </motion.nav>
  );
}
