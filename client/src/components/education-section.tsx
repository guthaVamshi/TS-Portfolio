import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { education } from "@/lib/data";

export default function EducationSection() {
  return (
    <section id="education" className="py-24 md:py-32 bg-[#f8f8fa] relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-200 select-none leading-none">04.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Academic Background</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Education</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              className="group"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="h-full bg-white rounded-2xl p-6 shadow-sm border border-slate-100 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-indigo-50 transition-all duration-300 relative overflow-hidden">
                {/* Left accent bar */}
                <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-primary to-purple-500 opacity-70" />

                <div className="pl-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-center p-2 flex-shrink-0">
                      <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">{edu.institution}</h3>
                      <p className="text-primary font-semibold text-sm">{edu.degree}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <i className="far fa-calendar-alt text-slate-400 text-xs" />
                    <span className="text-xs text-slate-500 font-medium">{edu.period}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{edu.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
