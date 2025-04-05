import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import useTheme from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-light/70 dark:bg-dark/70 transition-all duration-300">
      <Container className="py-4">
        <div className="flex justify-between items-center">
          <a href="#" className="text-xl font-bold font-poppins gradient-text">
            Vamshi<span className="text-primary">.</span>
          </a>
          
          <div className="hidden md:flex space-x-8 items-center">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="nav-link hover:text-primary transition-colors"
                onClick={handleNavLinkClick}
              >
                {link.name}
              </a>
            ))}
            
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-light-accent dark:hover:bg-dark-accent transition-colors"
              aria-label="Toggle theme"
            >
              {mounted && (
                <i className={cn(
                  "fas text-xl", 
                  theme === 'dark' ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-700'
                )}></i>
              )}
            </button>
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-light-accent dark:hover:bg-dark-accent transition"
            aria-label="Toggle mobile menu"
          >
            <i className={cn("fas", isMenuOpen ? "fa-times" : "fa-bars")}></i>
          </button>
        </div>
        
        <div className={cn("md:hidden py-4 space-y-3", isMenuOpen ? "block" : "hidden")}>
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="block py-2 hover:text-primary transition-colors"
              onClick={handleNavLinkClick}
            >
              {link.name}
            </a>
          ))}
          
          <div className="pt-2 border-t border-light-accent dark:border-dark-accent">
            <button 
              onClick={toggleTheme}
              className="py-2 flex items-center space-x-2 hover:text-primary transition-colors w-full"
            >
              {mounted && (
                <>
                  <i className={cn(
                    "fas", 
                    theme === 'dark' ? 'fa-sun text-yellow-400' : 'fa-moon text-slate-700'
                  )}></i>
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
