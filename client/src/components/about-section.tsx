import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import resume from "../Files/Vamshi_SFDC.pdf";
import profilepic from "../images/Profile.jpeg";

const stats = [
  { value: "5+", label: "Years Experience", icon: "fas fa-code" },
  { value: "20+", label: "Projects Delivered", icon: "fas fa-laptop-code" },
  { value: "5", label: "Certifications", icon: "fas fa-certificate" },
];

const highlights = [
  "Custom Lightning Web Components (LWC) & Aura",
  "Advanced Apex — triggers, batch, queueable, REST/SOAP",
  "Salesforce Flow, Process Builder & approval workflows",
  "Integration via REST/SOAP APIs and middleware",
  "Marketing Cloud & Service Cloud customizations",
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
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-primary via-purple-500 to-pink-400 opacity-20 blur-xl" />
              <div className="relative bg-white rounded-2xl p-2 shadow-2xl shadow-indigo-100 border border-slate-100">
                <div className="rounded-xl overflow-hidden aspect-square">
                  <img
                    src={profilepic}
                    alt="Vamshi Gutha"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating pills */}
              <motion.div
                className="absolute -right-6 top-8 bg-white shadow-xl shadow-indigo-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-slate-100"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-code text-primary text-sm" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">Experience</span>
                  <span className="font-bold text-sm text-slate-800">~5 Years</span>
                </div>
              </motion.div>

              <motion.div
                className="absolute -left-6 bottom-12 bg-white shadow-xl shadow-pink-100 rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-slate-100"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-8 h-8 bg-pink-500/10 rounded-xl flex items-center justify-center">
                  <i className="fas fa-certificate text-pink-500 text-sm" />
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400 font-medium">Certifications</span>
                  <span className="font-bold text-sm text-slate-800">5 Salesforce</span>
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
              <h3 className="text-2xl font-bold text-slate-900">
                Certified Salesforce Developer with Enterprise Solutions Expertise
              </h3>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                I'm a <span className="font-semibold text-primary">Certified Salesforce Developer</span> with ~5 years
                of experience in CRM implementation, Lightning Web Components development, and Salesforce ecosystem
                solutions. I hold multiple Salesforce certifications including Administrator, Platform Developer I, and
                AI Associate.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px]">
                I've contributed to enterprise Salesforce projects, designing custom solutions that streamline business
                processes and enhance user experience. My expertise spans across the full Salesforce ecosystem:
              </p>

              <ul className="space-y-2.5">
                {highlights.map((item, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3 text-[14px] text-slate-600"
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="group p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:border-primary/30 hover:bg-primary/[0.02] transition-all duration-300 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                  whileHover={{ y: -3 }}
                >
                  <i className={`${s.icon} text-primary mb-2 block text-lg`} />
                  <div className="text-2xl font-black text-slate-900">{s.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-slate-900 text-white rounded-xl font-semibold hover:bg-primary transition-all duration-300 shadow-lg hover:shadow-primary/30 group text-sm"
              >
                <i className="fas fa-download" />
                Download Resume
                <i className="fas fa-arrow-right transform transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
