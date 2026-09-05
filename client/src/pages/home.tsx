import { useEffect } from "react";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ThreeBackground from "@/components/three-background";
import CustomCursor from "@/components/custom-cursor";

export default function Home() {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        window.scrollTo({
          top: el.getBoundingClientRect().top + window.scrollY - 72,
          behavior: "smooth",
        });
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30 selection:text-white" style={{ background: "var(--c-bg)" }}>
      {/* Interactive 3D Background */}
      <ThreeBackground />

      {/* Reactive Custom Cursor */}
      <CustomCursor />

      {/* Site Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
