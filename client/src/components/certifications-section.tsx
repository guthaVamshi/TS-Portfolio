import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { certifications } from "@/lib/data";

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-100 select-none leading-none">05.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Credentials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Certifications</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert, i) => (
            <motion.div
              key={`${cert.provider}-${cert.name}-${i}`}
              className="group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <div className={`h-full rounded-2xl border p-5 transition-all duration-300 relative overflow-hidden
                ${cert.isComingSoon
                  ? "border-dashed border-slate-200 bg-slate-50"
                  : "border-slate-100 bg-white shadow-sm group-hover:shadow-xl group-hover:shadow-indigo-50 group-hover:border-primary/20"
                }`}
              >
                {/* Shimmer overlay */}
                {!cert.isComingSoon && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                <div className="relative z-10">
                  {/* Logo */}
                  <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 mb-4">
                    {cert.isComingSoon ? (
                      <i className="fas fa-hourglass-half text-2xl text-slate-300" />
                    ) : cert.logo ? (
                      <img src={cert.logo} alt={cert.name} className="w-full h-full object-contain" />
                    ) : (
                      <i className="fas fa-certificate text-2xl text-primary" />
                    )}
                  </div>

                  {/* Provider */}
                  <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">
                    {cert.isComingSoon ? "Coming Soon" : cert.provider}
                  </p>

                  {/* Name */}
                  <h3 className="font-bold text-slate-800 text-sm leading-snug mb-3">
                    {cert.isComingSoon ? "Next Certification" : cert.name}
                  </h3>

                  {/* Status + date */}
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                      cert.isComingSoon
                        ? "bg-amber-50 text-amber-600 border border-amber-200"
                        : "bg-green-50 text-green-600 border border-green-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cert.isComingSoon ? "bg-amber-400" : "bg-green-500"}`} />
                      {cert.isComingSoon ? "In Progress" : "Earned"}
                    </span>
                    {!cert.isComingSoon && cert.date && (
                      <span className="text-[11px] text-slate-400">{cert.date}</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
