import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import SkillsSection from "@/components/skills-section";
import EducationSection from "@/components/education-section";
import ExperienceSection from "@/components/experience-section";
import CertificationsSection from "@/components/certifications-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import SkyBackdrop from "@/components/sky-backdrop";
import { useEffect, useMemo } from "react";

export default function Home() {
  // Compute current hour (supports testing override URL e.g. ?hour=18)
  const hour = useMemo(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const hOverride = params.get("hour");
      if (hOverride !== null) {
        const parsed = parseInt(hOverride, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 23) {
          return parsed;
        }
      }
    }
    return new Date().getHours();
  }, []);

  const timeClass = useMemo(() => {
    if (hour >= 6 && hour < 11) return "time-morning";
    if (hour >= 11 && hour < 17) return "time-midday";
    if (hour >= 17 && hour < 20) return "time-evening";
    return "time-night";
  }, [hour]);

  // Implement smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (!anchor) return;
      
      const href = anchor.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      if (href === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);
  
  return (
    <div className={`min-h-screen font-inter transition-all duration-1000 ${timeClass}`}>
      <Navbar />
      <SkyBackdrop hour={hour} />
      <div className="relative z-10">
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <EducationSection />
          <ExperienceSection />
          <CertificationsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
