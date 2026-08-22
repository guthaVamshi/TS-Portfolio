import { motion } from "framer-motion";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import profilepic from "../images/Profile.jpeg";

const STATS = [
  { value: "4+", label: "Years of experience" },
  { value: "20+", label: "Projects delivered" },
  { value: "5", label: "Certifications" },
];

const HIGHLIGHTS = [
  "Java 17, Spring Boot microservices and REST API design",
  "React, TypeScript, and Next.js frontend engineering",
  "Spring Security, OAuth2, and role-based access control",
  "PostgreSQL, MongoDB, and SQL Server schema design",
  "Salesforce CRM — Apex, LWC, and API integration",
  "CI/CD pipelines with GitHub Actions and Docker",
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Vamshi Gutha"
      className="section-padding"
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
          <p className="section-label">About</p>
          <h2 className="section-title">
            Builder. Problem solver.
            <br />
            Enterprise developer.
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: Profile photo + stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            {/* Photo */}
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: "var(--r-xl)", maxWidth: "380px" }}
            >
              <img
                src={profilepic}
                alt="Vamshi Gutha, Full Stack Java Developer"
                className="w-full h-full object-cover block"
                style={{ aspectRatio: "4/5" }}
                loading="lazy"
              />
              {/* Subtle gradient overlay on bottom */}
              <div
                aria-hidden
                className="absolute bottom-0 inset-x-0"
                style={{
                  height: "35%",
                  background:
                    "linear-gradient(to top, rgba(17, 17, 24, 0.7), transparent)",
                }}
              />

            </div>

            {/* Stats row */}
            <div className="flex items-start gap-10 mt-10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease }}
                >
                  <div className="stat-number">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Bio + Education + CTA */}
          <motion.div
            className="flex flex-col gap-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
          >
            {/* Bio */}
            <div>
              <p
                className="leading-relaxed text-base mb-4"
                style={{ color: "var(--c-text-muted)", lineHeight: "1.75" }}
              >
                I'm a Full Stack Java Developer with 4 years of experience building
                enterprise web applications across retail, e-commerce, insurance,
                energy utility, and CRM platforms.
              </p>
              <p
                className="leading-relaxed text-base"
                style={{ color: "var(--c-text-muted)", lineHeight: "1.75" }}
              >
                Currently at{" "}
                <span style={{ color: "var(--c-text)", fontWeight: 500 }}>Macy's</span>
                , developing high-throughput Java 17 microservices and React storefront
                views. I specialize in secure API design, database optimization, and
                Salesforce integrations.
              </p>
            </div>

            {/* What I work with */}
            <div>
              <p
                className="text-xs font-semibold tracking-wider uppercase mb-4"
                style={{ color: "var(--c-text-faint)" }}
              >
                Core expertise
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "var(--c-text-muted)" }}
                  >
                    <span
                      style={{
                        color: "var(--c-accent)",
                        marginTop: "4px",
                        fontSize: "10px",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-chevron-right" aria-hidden />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Education — folded in cleanly */}
            <div
              className="border-l-2 pl-5 py-1"
              style={{ borderColor: "hsl(var(--c-accent-hsl) / 0.3)" }}
            >
              <p
                className="text-xs font-semibold tracking-wider uppercase mb-3"
                style={{ color: "var(--c-text-faint)" }}
              >
                Education
              </p>
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--c-text)" }}>
                    M.S. Computer Science — Sacred Heart University
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--c-text-faint)" }}>
                    Aug 2023 – Dec 2024
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "var(--c-text)" }}>
                    B.Tech Computer Science — Lovely Professional University
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--c-text-faint)" }}>
                    Aug 2018 – May 2022
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ width: "fit-content" }}
              >
                <i className="fas fa-file-arrow-down text-xs" aria-hidden />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
