import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { name: "About",    href: "#about" },
  { name: "Skills",   href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [scrollY, setScrollY]       = useState(0);
  const [isMobile, setIsMobile]     = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "skills", "experience", "projects", "contact"];
      const scrollPosition = window.scrollY + 250; // offset for triggers

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Compute dynamic opacity for mobile (hidden in hero, fades in as we scroll)
  const headerOpacity = isMenuOpen
    ? 1
    : isMobile
      ? Math.min(Math.max((scrollY - 50) / 350, 0), 1)
      : 1;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: headerOpacity }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ opacity: headerOpacity }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex justify-center pt-4 sm:pt-5 px-4 transition-opacity duration-150",
          isMobile && headerOpacity === 0 ? "pointer-events-none" : ""
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-2 px-4 sm:px-6 py-2 rounded-2xl transition-all duration-500 w-full max-w-4xl",
            scrolled
              ? "glass-card bg-white/70 dark:bg-slate-900/60 border border-white/20 dark:border-white/10 shadow-lg shadow-black/5"
              : "bg-white/40 dark:bg-slate-950/20 border border-white/10 dark:border-white/5 shadow-sm"
          )}
        >
          {/* Logo */}
          <a href="#" className="font-outfit font-black text-lg tracking-tight flex-shrink-0 select-none hover:opacity-85 transition-opacity">
            Vamshi<span className="text-primary">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1.5 relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-semibold tracking-wide rounded-xl transition-colors duration-300 z-10",
                    isActive 
                      ? "text-primary" 
                      : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10 border border-primary/20"
                      transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop social + CTA */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a
              href="https://github.com/guthaVamshi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-white/10 dark:hover:text-white transition-all duration-200"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-sm" />
            </a>
            <a
              href="https://www.linkedin.com/in/vamshi-gutha/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/10 dark:hover:text-blue-400 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-sm" />
            </a>
            <a
              href="#contact"
              className="ml-2 px-4 py-1.5 text-[13px] font-semibold bg-primary text-white rounded-xl hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-primary/30"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-all hamburger-button"
            aria-label="Toggle menu"
          >
            <i className={cn("fas text-sm", isMenuOpen ? "fa-times" : "fa-bars")} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6 md:hidden mobile-menu-overlay"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-slate-800 hover:text-primary transition-colors mobile-menu-link"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-primary text-white rounded-2xl font-semibold text-lg shadow-lg shadow-primary/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.06 }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
