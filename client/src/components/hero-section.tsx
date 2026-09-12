import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import HeroWater from "./hero-water";
import { AnimatedCounter } from "./ui/animated-counter";

const SOCIALS = [
  { href: "https://github.com/guthaVamshi", label: "GitHub" },
  { href: "https://www.linkedin.com/in/vamshi-gutha/", label: "LinkedIn" },
  { href: "mailto:vamshigutha@gmail.com", label: "Email" },
];

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 0.65], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section id="hero" ref={ref} className="hero-scene" aria-label="Introduction">
      <div className="hero-stage">
        <HeroWater />
        <motion.div className="content-container hero-content" style={reduced ? undefined : { y, scale, opacity }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="hero-eyebrow">
            <span>Vamshi Gutha <span className="eyebrow-divider">/</span> Full Stack Java Developer</span>
            <span className="hero-availability"><span />Available for Opportunities</span>
          </motion.div>
          <h1 className="editorial-headline">
            {["Engineering", "resilient systems", "at scale."].map((line, i) => (
              <span className="headline-mask" key={line}><motion.span initial={reduced ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1.1, delay: 0.12 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}>{line}</motion.span></span>
            ))}
          </h1>
          <div className="hero-bottom">
            <div className="hero-intro">
              <p>Hi, I'm <strong>Vamshi Gutha</strong>. I design and build high-throughput <strong>Java 17 &amp; Spring Boot microservices</strong>, reactive <strong>React frontends</strong>, and complex <strong>Salesforce CRM architectures</strong> that handle mission-critical enterprise workloads.</p>
              <div className="hero-actions"><a href="#projects" className="btn-primary">Explore Projects <ArrowDown size={16} /></a><a href={resume} target="_blank" rel="noopener noreferrer" className="btn-secondary"><Download size={15} />Resume</a></div>
            </div>
            {/* <div className="hero-aside"><p>Software Engineer @ Macy's</p><div className="hero-socials">{SOCIALS.map(s => <a key={s.label} href={s.href} target={s.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer">{s.label}<ArrowUpRight size={13} /></a>)}</div></div> */}
          </div>
        </motion.div>
      </div>
      <div className="content-container hero-stats">
        {[
          { value: "4+", label: "Years Experience" },
          { value: "20+", label: "Projects Delivered" },
          { value: "5", label: "Certifications" },
          { value: "Macy's", label: "Production Tech" },
        ].map(stat => <div key={stat.label}><span className="hero-stat-value"><AnimatedCounter value={stat.value} /></span><span className="hero-stat-label">{stat.label}</span></div>)}
        <a href="#about" className="hero-scroll">Scroll to explore <ArrowDown size={16} /></a>
      </div>
    </section>
  );
}
