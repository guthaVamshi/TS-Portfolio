import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "vamshigutha@gmail.com",
    href: "mailto:vamshigutha@gmail.com",
    color: "bg-red-50 text-red-500 border-red-100",
  },
  {
    icon: "fab fa-linkedin-in",
    label: "LinkedIn",
    value: "vamshi-gutha",
    href: "https://www.linkedin.com/in/vamshi-gutha/",
    color: "bg-blue-50 text-blue-500 border-blue-100",
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "guthaVamshi",
    href: "https://github.com/guthaVamshi",
    color: "bg-slate-50 text-slate-700 border-slate-100",
  },
  {
    icon: "fab fa-skype",
    label: "Skype",
    value: "vamshigutha",
    href: "skype:vamshigutha?call",
    color: "bg-sky-50 text-sky-500 border-sky-100",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-100 select-none leading-none">07.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Say Hello</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Get In Touch</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* CTA headline */}
          <motion.div
            className="text-center mb-12 space-y-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl md:text-3xl font-black font-outfit text-slate-900 dark:text-slate-100">
              Currently <span className="text-primary">open to opportunities</span>
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed text-[15px]">
              Whether you have a project in mind, want to discuss Salesforce solutions, or just want to say hi —
              my inbox is always open. I'll get back to you as soon as I can!
            </p>

            <motion.a
              href="mailto:vamshigutha@gmail.com"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs tracking-wider uppercase shadow-lg hover:shadow-indigo-500/25 transition-all duration-300 mt-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <i className="fas fa-paper-plane" />
              <span>Say Hello</span>
            </motion.a>
          </motion.div>

          {/* Contact method cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {contactMethods.map((m, i) => (
              <motion.a
                key={m.label}
                href={m.href}
                target={m.href.startsWith("mailto:") || m.href.startsWith("skype:") ? undefined : "_blank"}
                rel={m.href.startsWith("mailto:") || m.href.startsWith("skype:") ? undefined : "noopener noreferrer"}
                className="flex items-center gap-4 p-4 glass-card rounded-2xl border border-white/20 dark:border-white/5 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${m.color} flex-shrink-0`}>
                  <i className={`${m.icon} text-base`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">{m.label}</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate group-hover:text-primary transition-colors">{m.value}</p>
                </div>
                <i className="fas fa-arrow-right ml-auto text-slate-350 dark:text-slate-600 text-xs group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </motion.a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
