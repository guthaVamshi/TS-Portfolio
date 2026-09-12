import { useState } from "react";
import { motion } from "framer-motion";
import { TiltCard } from "./ui/tilt-card";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("vamshigutha@gmail.com");
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2500);
    } catch { setCopyFailed(true); }
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
            className="contact-heading text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <p className="section-label mb-0">Get In Touch</p>
            </div>
            <h2 className="contact-title">
              <span>Let's Build Something</span>{" "}
              <span>Exceptional Together.</span>
            </h2>
            <p className="mt-4 text-base text-[var(--c-text-muted)] max-w-xl mx-auto leading-relaxed">
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
                maxTilt={0}
                glowColor="rgba(209, 233, 163, 0.04)"
                className="surface-card p-5 rounded-2xl border border-white/10 bg-[var(--c-surface-2)] hover:border-[var(--c-border-mid)] backdrop-blur-md flex flex-col justify-between gap-4 h-full"
              >
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[var(--c-surface-2)] border border-[var(--c-border-mid)] flex items-center justify-center text-[var(--c-accent)] text-base">
                    <i className="fas fa-envelope" />
                  </div>
                  <button
                    onClick={copyEmail}
                    className="text-xs px-2.5 py-1 rounded-lg bg-[var(--c-surface-2)] text-[var(--c-text-muted)] hover:text-white border border-white/10 hover:border-[var(--c-border-mid)] transition-all flex items-center gap-1.5"
                    title="Copy email to clipboard"
                  >
                    <i className={copied ? "fas fa-check text-emerald-400" : "fas fa-copy"} />
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                </div>
                <div>
                  <p className="text-xs font-mono uppercase text-[var(--c-text-muted)]">Direct Email</p>
                  <a
                    href="mailto:vamshigutha@gmail.com"
                    className="text-sm font-semibold text-white hover:text-[var(--c-accent)] transition-colors mt-0.5 block truncate"
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
                  maxTilt={0}
                  glowColor="rgba(209, 233, 163, 0.04)"
                  className="surface-card p-5 rounded-2xl border border-white/10 bg-[var(--c-surface-2)] hover:border-[var(--c-border-mid)] backdrop-blur-md flex flex-col justify-between gap-4 h-full"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[var(--c-surface-2)] border border-[var(--c-border-mid)] flex items-center justify-center text-[var(--c-accent)] text-base">
                      <i className="fab fa-linkedin-in" />
                    </div>
                    <i className="fas fa-arrow-up-right text-xs text-[var(--c-text-muted)] group-hover:text-[var(--c-accent)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase text-[var(--c-text-muted)]">LinkedIn Profile</p>
                    <p className="text-sm font-semibold text-white group-hover:text-[var(--c-accent)] transition-colors mt-0.5 truncate">
                      linkedin.com/in/vamshi-gutha
                    </p>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          </div>

          <p role="status" className="text-center text-xs text-[var(--c-text-muted)] mb-4">{copyFailed ? "Please select and copy the email address, or use the email link." : copied ? "Email copied to clipboard." : ""}</p>
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
