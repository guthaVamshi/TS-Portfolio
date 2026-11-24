import { useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import HeroLandscape from "./hero-landscape";
import { AnimatedCounter } from "./ui/animated-counter";
import { useMagnetic } from "../hooks/useMagnetic";

function LiveClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const h = time.getHours().toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ");
  return (
    <span className="hero-clock" aria-label={`Current time: ${h}:${m}:${s}`}>
      <span className="hero-clock-time">{h}:{m}<span className="hero-clock-sec">:{s}</span></span>
      <span className="hero-clock-tz">{tz}</span>
    </span>
  );
}

function ScrambleHeadline({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion();
  return (
    <h1 className="editorial-headline">
      {lines.map((line, i) => (
        <span className="headline-mask" key={line}>
          <motion.span
            initial={reduced ? false : { y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: 0.12 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);

  const primaryBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.4, range: 90 });
  const secondaryBtnRef = useMagnetic<HTMLAnchorElement>({ strength: 0.3, range: 80 });

  return (
    <section id="hero" ref={ref} className="hero-scene hero-immersive" aria-label="Introduction">
      <div className="hero-stage">
        <HeroLandscape />
        <motion.div className="content-container hero-content" style={reduced ? undefined : { y }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="hero-eyebrow"
          >
            <span>
              Vamshi Gutha <span className="eyebrow-divider">/</span> Full Stack Java Developer
            </span>
            <div className="hero-eyebrow-right">
              <span className="hero-availability">
                <span />Available for Opportunities
              </span>
              <LiveClock />
            </div>
          </motion.div>

          <div className="hero-composition">
            <div className="hero-message">
              <ScrambleHeadline lines={["Engineering", "resilient systems", "at scale."]} />
              <div className="hero-bottom">
                <div className="hero-intro">
                  <p>
                    Hi, I'm <strong>Vamshi Gutha</strong>. I design and build high-throughput{" "}
                    <strong>Java 17 &amp; Spring Boot microservices</strong>, reactive{" "}
                    <strong>React frontends</strong>, and complex{" "}
                    <strong>Salesforce CRM architectures</strong> that handle mission-critical
                    enterprise workloads.
                  </p>
                  <div className="hero-actions">
                    <a ref={primaryBtnRef} href="#projects" className="btn-primary magnetic-btn">
                      Explore Projects <ArrowDown size={16} />
                    </a>
                    <a
                      ref={secondaryBtnRef}
                      href={resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary magnetic-btn"
                    >
                      <Download size={15} />Resume
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="content-container hero-stats">
        {[
          { value: "4+", label: "Years Experience" },
          { value: "20+", label: "Projects Delivered" },
          { value: "5", label: "Certifications" },
          { value: "Macy's", label: "Production Tech" },
        ].map(stat => (
          <div key={stat.label}>
            <span className="hero-stat-value">
              <AnimatedCounter value={stat.value} />
            </span>
            <span className="hero-stat-label">{stat.label}</span>
          </div>
        ))}
        <a href="#about" className="hero-scroll">
          Scroll to explore <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
