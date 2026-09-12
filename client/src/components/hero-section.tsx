import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import resume from "../Files/VamshiGutha_JFSD.pdf";
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
  const sculptureRotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
  const sculptureY = useTransform(scrollYProgress, [0, 1], [0, -65]);
  const layerSpacing = useTransform(scrollYProgress, [0, 1], [1, 1.65]);

  return (
    <section id="hero" ref={ref} className="hero-scene" aria-label="Introduction">
      <div className="hero-stage">
        <motion.div
          className="hero-art"
          aria-hidden="true"
          style={reduced ? undefined : { rotate: sculptureRotate, y: sculptureY }}
        >
          <svg className="hero-sculpture" viewBox="0 0 440 500" fill="none">
            <defs>
              <linearGradient id="fold-surface" x1="65" y1="60" x2="340" y2="250" gradientUnits="userSpaceOnUse">
                <stop stopColor="#eff5dc" />
                <stop offset=".3" stopColor="#a1b58a" />
                <stop offset=".52" stopColor="#485540" />
                <stop offset=".54" stopColor="#bdd29a" />
                <stop offset="1" stopColor="#47573b" />
              </linearGradient>
              <linearGradient id="fold-edge" x1="70" y1="100" x2="355" y2="280" gradientUnits="userSpaceOnUse">
                <stop stopColor="#dce9c0" stopOpacity=".8" />
                <stop offset=".48" stopColor="#526347" stopOpacity=".2" />
                <stop offset="1" stopColor="#d1e9a3" stopOpacity=".7" />
              </linearGradient>
            </defs>
            <motion.g style={reduced ? undefined : { scaleY: layerSpacing }}>
              {Array.from({ length: 12 }, (_, i) => {
                const layer = 11 - i;
                return (
                  <g key={layer} transform={`translate(0 ${layer * 14})`}>
                    <path d="M62 96 133 62 219 147 306 62 378 96 219 255Z" fill="url(#fold-surface)" fillOpacity={layer === 0 ? .95 : .24 + i * .035} />
                    <path d="M62 96 219 255 378 96V103L219 262 62 103Z" fill="#202a1c" stroke="url(#fold-edge)" strokeWidth=".7" />
                    <path d="M62 96 133 62 219 147 306 62 378 96 219 255 62 96Z" stroke="url(#fold-edge)" strokeWidth=".9" />
                    <path d="M219 147V255" stroke="#e2edc5" strokeOpacity=".22" />
                  </g>
                );
              })}
            </motion.g>
          </svg>
        </motion.div>
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
            <div className="hero-aside"><p>Software Engineer @ Macy's</p><div className="hero-socials">{SOCIALS.map(s => <a key={s.label} href={s.href} target={s.label === "Email" ? undefined : "_blank"} rel="noopener noreferrer">{s.label}<ArrowUpRight size={13} /></a>)}</div></div>
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
