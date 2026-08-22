import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

const CONTACTS = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "vamshigutha@gmail.com",
    href: "mailto:vamshigutha@gmail.com",
  },
  {
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
    value: "linkedin.com/in/vamshi-gutha",
    href: "https://www.linkedin.com/in/vamshi-gutha/",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="section-padding"
      style={{ background: "var(--c-surface)" }}
    >
      <div className="content-container">
        <div className="max-w-[560px]">

          {/* Section header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="section-label">Contact</p>
            <h2 className="section-title">
              Let's build something
              <br />
              together.
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{ color: "var(--c-text-muted)", lineHeight: "1.75" }}
            >
              I'm currently open to new opportunities. If you have a project in
              mind, want to discuss Salesforce solutions, or just want to say
              hello — reach out.
            </p>
          </motion.div>

          {/* Contact rows */}
          <div className="flex flex-col gap-3">
            {CONTACTS.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="contact-row"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08, ease }}
                aria-label={`${c.label}: ${c.value}`}
              >
                <span className="contact-icon" aria-hidden>
                  <i className={c.icon} />
                </span>
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider mb-0.5"
                    style={{ color: "var(--c-text-faint)" }}
                  >
                    {c.label}
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--c-text)" }}
                  >
                    {c.value}
                  </p>
                </div>
                <i
                  className="fas fa-arrow-right ml-auto text-xs"
                  style={{ color: "var(--c-text-faint)" }}
                  aria-hidden
                />
              </motion.a>
            ))}
          </div>

          {/* Primary CTA */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2, ease }}
          >
            <a
              href="mailto:vamshigutha@gmail.com"
              className="btn-primary"
            >
              <i className="fas fa-paper-plane text-xs" aria-hidden />
              Send me an email
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
