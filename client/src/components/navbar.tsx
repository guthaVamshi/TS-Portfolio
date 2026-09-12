import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "./ui/dialog";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
        aria-label="Site navigation"
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-3 px-5 py-2.5 rounded-2xl w-full max-w-[1200px] transition-all duration-400",
            scrolled ? "nav-glass" : "bg-transparent"
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            className="font-outfit font-black text-[17px] tracking-tight select-none hover:opacity-80 transition-opacity"
            aria-label="Back to top"
            style={{ color: "var(--c-text)" }}
          >
            Vamshi<span style={{ color: "var(--c-accent)" }}>.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  role="listitem"
                  className={cn(
                    "relative px-3 py-1.5 text-[13px] font-medium rounded-xl transition-colors duration-200",
                    isActive
                      ? "text-white"
                      : "hover:text-white"
                  )}
                  style={{ color: isActive ? "var(--c-text)" : "var(--c-text-muted)" }}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="nav-indicator"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://github.com/guthaVamshi"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="https://www.linkedin.com/in/vamshi-gutha/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: "8px 18px", fontSize: "13px" }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl transition-colors"
            style={{
              color: "var(--c-text-muted)",
              background: menuOpen ? "rgba(255,255,255,0.08)" : "transparent",
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </nav>
      </motion.header>

      <Dialog open={menuOpen} onOpenChange={setMenuOpen}>
        <DialogContent className="mobile-navigation">
          <DialogTitle className="sr-only">Navigation menu</DialogTitle>
          <DialogDescription className="sr-only">Explore Vamshi Gutha's portfolio.</DialogDescription>
          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => <a key={link.name} href={link.href} onClick={() => setMenuOpen(false)} className="mobile-nav-link"><span>0{i + 1}</span>{link.name}</a>)}
          </nav>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-primary mt-8 w-fit">Hire Me</a>
        </DialogContent>
      </Dialog>
    </>
  );
}
