import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import { MotionConfig, motion, useScroll, useReducedMotion } from "framer-motion";


export default function Home() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) {
        if (href === "#main-content") el.focus({ preventScroll: true });
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 72,
          behavior: reduced ? "auto" : "smooth",
        });
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, [reduced]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="portfolio relative min-h-screen" style={{ background: "var(--c-bg)" }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <motion.div className="reading-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />


      {/* Site Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
    </MotionConfig>
  );
}
