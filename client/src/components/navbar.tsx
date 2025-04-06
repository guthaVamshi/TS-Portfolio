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
    
    // Prevent scrolling when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
              {NAV_LINKS.map((link) => (
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
          
          {/* Hamburger button with solid background */}
          <button 
            onClick={toggleMenu}
            className={cn(
              "md:hidden w-10 h-10 flex items-center justify-center rounded-full z-50",
              isMenuOpen 
                ? "fixed top-6 right-6 bg-primary text-white shadow-lg" 
                : "bg-white shadow-md text-dark"
            )}
            style={isMenuOpen ? { position: 'fixed' } : {}}
            aria-label="Toggle mobile menu"
          >
            <i className={cn("fas", isMenuOpen ? "fa-times" : "fa-bars")}></i>
          </button>
        </div>
      </Container>
      
      {/* Mobile menu with close button */}
      <div 
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-white/95 backdrop-blur-sm z-40 md:hidden transition-transform duration-300",
          isMenuOpen ? "transform translate-x-0" : "transform translate-x-full"
        )}
        style={{ position: 'fixed', top: 0, height: '100vh' }}
      >
        <div className="flex flex-col h-full">
          <div className="py-20 flex-1 overflow-y-auto">
            <Container>
              <div className="flex flex-col space-y-4 pb-10">
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
        </div>
      </div>
    </motion.nav>
  );
}
