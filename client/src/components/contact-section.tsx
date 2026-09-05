import { useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/tilt-card";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("vamshigutha@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding relative"
      style={{ background: "var(--c-surface)" }}
    >
      <div className="content-container">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="section-label mb-0">Get In Touch</p>
            </div>
            <h2 className="section-title text-3xl sm:text-4xl">
              Let's Build Something
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-sky-300 bg-clip-text text-transparent">
                Exceptional Together.
              </span>
            </h2>
            <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              I'm actively seeking opportunities to engineer high-throughput backend services,
              scalable full-stack architectures, and modern cloud solutions.
            </p>
          </motion.div>

          {/* Interactive Contact Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Email Card with Copy button */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <TiltCard
                maxTilt={6}
                glowColor="rgba(168, 85, 247, 0.2)"
                className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-purple-500/40 backdrop-blur-md flex flex-col justify-between gap-4 h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-base">
                    <i className="fas fa-envelope" />
                  </div>
                  <button
                    onClick={copyEmail}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-purple-400/30 transition-all flex items-center gap-1.5"
                    title="Copy email to clipboard"
                  >
                    <i className={copied ? "fas fa-check text-emerald-400" : "fas fa-copy"} />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-slate-400">Direct Email</p>
                  <a
                    href="mailto:vamshigutha@gmail.com"
                    className="text-sm font-semibold text-white hover:text-purple-300 transition-colors mt-0.5 block truncate"
                  >
                    vamshigutha@gmail.com
                  </a>
                </div>
              </TiltCard>
            </motion.div>

            {/* LinkedIn Card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <a
                href="https://www.linkedin.com/in/vamshi-gutha/"
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full group"
              >
                <TiltCard
                  maxTilt={6}
                  glowColor="rgba(56, 189, 248, 0.2)"
                  className="p-5 rounded-2xl border border-white/10 bg-slate-900/60 hover:border-sky-500/40 backdrop-blur-md flex flex-col justify-between gap-4 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-base">
                      <i className="fab fa-linkedin-in" />
                    </div>
                    <i className="fas fa-arrow-up-right text-xs text-slate-400 group-hover:text-sky-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-slate-400">LinkedIn Profile</p>
                    <p className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors mt-0.5 truncate">
                      linkedin.com/in/vamshi-gutha
                    </p>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          </div>

          {/* Primary Action Button */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <a
              href="mailto:vamshigutha@gmail.com"
              className="btn-primary btn-glow inline-flex items-center gap-2 group text-sm px-7 py-3.5"
            >
              <i className="fas fa-paper-plane text-xs transition-transform group-hover:translate-x-1" />
              <span>Send Message</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
