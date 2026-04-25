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

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 sm:pt-5 px-4"
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-2 px-4 sm:px-6 py-2.5 rounded-2xl transition-all duration-300",
            scrolled
              ? "bg-white/90 backdrop-blur-md shadow-lg shadow-black/5 border border-slate-200/80 w-full max-w-4xl"
              : "bg-white/70 backdrop-blur-sm border border-white/50 shadow-sm w-full max-w-4xl"
          )}
        >
          {/* Logo */}
          <a href="#" className="font-bold text-lg tracking-tight flex-shrink-0 select-none">
            Vamshi<span className="text-primary">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop social + CTA */}
          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <a
              href="https://github.com/guthaVamshi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
              aria-label="GitHub"
            >
              <i className="fab fa-github text-sm" />
            </a>
            <a
              href="https://www.linkedin.com/in/vamshi-gutha/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in text-sm" />
            </a>
            <a
              href="#contact"
              className="ml-2 px-4 py-1.5 text-[13px] font-semibold bg-primary text-white rounded-xl hover:bg-purple-600 transition-all shadow-sm hover:shadow-primary/30"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden w-8 h-8 flex items-center justify-center rounded-xl text-slate-600 hover:bg-slate-100 transition-all"
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
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-6 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-3xl font-bold text-slate-800 hover:text-primary transition-colors"
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
