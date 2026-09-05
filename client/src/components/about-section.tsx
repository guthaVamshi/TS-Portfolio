import { motion } from "framer-motion";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import profilepic from "../images/Profile.jpeg";
import { TiltCard } from "./ui/tilt-card";
import { AnimatedCounter } from "./ui/animated-counter";

const STATS = [
  { value: "4+", label: "Years of experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "5", label: "Certifications" },
];

const HIGHLIGHTS = [
  { icon: "fas fa-server", text: "Java 17, Spring Boot microservices & REST APIs" },
  { icon: "fab fa-react", text: "React, TypeScript, Next.js frontend architectures" },
  { icon: "fas fa-shield-halved", text: "Spring Security, JWT, OAuth2 & RBAC protocols" },
  { icon: "fas fa-database", text: "PostgreSQL, MongoDB & SQL Server optimization" },
  { icon: "fab fa-salesforce", text: "Salesforce CRM — Apex, LWC & API integrations" },
  { icon: "fab fa-docker", text: "CI/CD pipelines with Docker & GitHub Actions" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Vamshi Gutha"
      className="section-padding relative"
      style={{ background: "var(--c-surface)" }}
    >
      <div className="content-container">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <p className="section-label mb-0">About Me</p>
          </div>
          <h2 className="section-title">
            Builder. Problem solver.
            <br />
            Enterprise developer.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Interactive 3D Tilt Profile Card + Stats */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Tilt Profile Card */}
            <TiltCard
              maxTilt={6}
              glowColor="rgba(168, 85, 247, 0.25)"
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-2.5 shadow-2xl backdrop-blur-md group"
            >
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={profilepic}
                  alt="Vamshi Gutha, Full Stack Java Developer"
                  className="w-full h-auto object-cover block transition-transform duration-700 group-hover:scale-105"
                  style={{ aspectRatio: "4/5" }}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div
                  aria-hidden
                  className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none"
                />

                {/* Card overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <div>
                    <p className="text-white font-outfit font-bold text-lg">Vamshi Gutha</p>
                    <p className="text-xs text-purple-300 font-mono">Software Engineer @ Macy's</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-400/30 backdrop-blur-md flex items-center justify-center text-purple-300 text-sm">
                    <i className="fas fa-code" />
                  </div>
                </div>
              </div>
            </TiltCard>

            {/* Stats row with animated counters */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="p-3.5 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                >
                  <div className="font-outfit font-black text-2xl text-white">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Highlights + Education */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {/* Bio */}
            <div className="space-y-4 text-base leading-relaxed text-slate-300">
              <p>
                I'm a Full Stack Java Developer with 4 years of experience engineering
                scalable enterprise software across retail e-commerce, insurance workflows,
                energy utilities, and cloud CRM platforms.
              </p>
              <p>
                Currently at <span className="text-white font-semibold">Macy's</span>, I architect
                high-throughput Java 17 microservices and responsive React storefront interfaces. I
                specialize in resilient API design, distributed cache management, database
                tuning, and custom Salesforce integrations.
              </p>
            </div>

            {/* Core Highlights Grid */}
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400 mb-4 flex items-center gap-2">
                <i className="fas fa-sparkles text-purple-400 text-[10px]" />
                Core Technical Capabilities
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {HIGHLIGHTS.map((item, idx) => (
                  <motion.div
                    key={item.text}
                    className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-slate-900/40 hover:border-purple-500/30 hover:bg-purple-950/20 transition-all duration-200 group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-xs flex-shrink-0 group-hover:scale-110 transition-transform">
                      <i className={item.icon} />
                    </div>
                    <span className="text-xs text-slate-300 font-medium leading-tight self-center">
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="border-l-2 border-purple-500/40 pl-5 py-1 space-y-4">
              <p className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                Education
              </p>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-white">
                    M.S. Computer Science — Sacred Heart University
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Aug 2023 – Dec 2024</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    B.Tech Computer Science — Lovely Professional University
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">Aug 2018 – May 2022</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-fit group"
              >
                <i className="fas fa-file-arrow-down text-xs transition-transform group-hover:translate-y-0.5" aria-hidden />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
