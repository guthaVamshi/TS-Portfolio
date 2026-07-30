import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from "../Files/VamshiGutha_JFSD.pdf";
import profilepic from "../images/Profile.jpeg";

const stats = [
  { value: "4+", label: "Years Experience", icon: "fas fa-code" },
  { value: "20+", label: "Projects Delivered", icon: "fas fa-laptop-code" },
  { value: "5", label: "Certifications", icon: "fas fa-certificate" },
];

const highlights = [
  "Robust backend services with Java 17, J2EE, and Spring Boot",
  "Responsive web interfaces using React.js, TypeScript, and Next.js",
  "Secure API integrations and role-based access control (Spring Security, OAuth2)",
  "Database design and query optimization (PostgreSQL, SQL Server, MongoDB)",
  "Salesforce CRM features, LWC, Apex controllers, and API integration",
  "Automated testing and CI/CD pipelines (JUnit, Mockito, GitHub Actions, Docker)",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Subtle noise texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-100 select-none leading-none">01.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Introduction</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">About Me</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
          {/* Profile image column */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative max-w-xs mx-auto lg:mx-0">
              {/* Rotating gradient ring */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-pink-400 opacity-20 blur-xl animate-pulse" />
              <div className="relative glass-card rounded-2xl p-2 shadow-2xl border border-white/20">
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img
                    src={profilepic}
                    alt="Vamshi Gutha"
                    className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>

              {/* Floating pills */}
              <motion.div
                className="absolute -right-6 top-8 glass-card shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-white/20"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-code text-primary text-sm" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Experience</span>
                  <span className="font-outfit font-bold text-sm text-slate-800 dark:text-slate-100">4+ Years</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-6 bottom-12 glass-card shadow-xl rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <div className="w-8 h-8 bg-pink-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-certificate text-pink-500 text-sm" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Credentials</span>
                  <span className="font-outfit font-bold text-sm text-slate-800 dark:text-slate-100">5 Technical</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bio column */}
          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="space-y-5">
              <h3 className="text-2xl font-black font-outfit text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                Full Stack Java Developer with Enterprise Solutions Expertise
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                I'm a <span className="font-bold text-primary">Full Stack Java Developer</span> with 4 years
                of experience building enterprise web applications across retail, e-commerce, insurance, energy utility, and CRM platforms. 
                I specialize in developing backend microservices, responsive frontend screens, secure API integrations, and database-driven workflows.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                I've contributed to major enterprise applications, designing scalable solutions that improve transaction stability, 
                streamline business processes, and reduce response latency. My expertise spans modern web stacks, cloud services, and CRM integration:
              </p>

              <ul className="space-y-3.5">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3.5 text-[14px] text-slate-600 dark:text-slate-300 leading-normal"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * i }}
                  >
                    <span className="mt-1 w-5 h-5 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                      <i className="fas fa-check text-[10px]" />
                    </span>
                    <span className="font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-card p-5 rounded-2xl border border-white/20 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ y: -4, scale: 1.02 }}
                >
                  <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <i className={`${s.icon} text-primary text-base`} />
                  </div>
                  <div className="text-2xl font-black font-outfit text-slate-900 dark:text-slate-100">{s.value}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-all duration-300 shadow-md group text-xs tracking-wider uppercase"
              >
                <i className="fas fa-download text-[11px]" />
                <span>Download Resume</span>
                <i className="fas fa-arrow-right text-[10px] transform transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
