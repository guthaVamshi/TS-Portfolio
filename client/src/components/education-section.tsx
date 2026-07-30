"use client";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { education } from "@/lib/data";

export default function EducationSection() {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = e.currentTarget;
    const rect = currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    currentTarget.style.setProperty("--mouse-x", `${x}px`);
    currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section id="education" className="py-24 md:py-32 bg-[#f8f8fa]/30 relative overflow-hidden">
      {/* Background auroras */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-24"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black font-outfit text-slate-200 select-none leading-none">04.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Academic Background</p>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-slate-900 dark:text-slate-100">Education</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        {/* Timeline path container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical axis line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-2 bottom-2 w-0.5 bg-slate-200/50 dark:bg-white/5" />

          {/* Timeline events loop */}
          <div className="space-y-16">
            {education.map((edu, i) => {
              const isLeft = i % 2 === 0;

              return (
                <div
                  key={edu.institution}
                  className="relative group flex flex-col md:flex-row items-stretch justify-between md:even:flex-row-reverse w-full"
                >
                  {/* Timeline axis dot */}
                  <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-6 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-primary bg-white dark:bg-slate-950 flex items-center justify-center transition-all duration-300 z-20 shadow-md group-hover:scale-125 group-hover:shadow-[0_0_12px_rgba(108,99,255,0.4)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </div>

                  {/* Card panel (fades & slides from left/right) */}
                  <motion.div
                    className="w-full md:w-[calc(50%-32px)] pl-10 md:pl-0"
                    initial={{ opacity: 0, x: isLeft ? -40 : 40, scale: 0.96 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.15 }}
                  >
                    <div
                      onMouseMove={handleMouseMove}
                      className="glass-card spotlight-card p-6 md:p-8 rounded-3xl border border-white/20 dark:border-white/5 hover:border-primary/30 hover:shadow-xl transition-all duration-300 relative"
                    >
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-4 relative z-10">
                        <div className="w-12 h-12 rounded-xl border border-slate-100/50 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 flex items-center justify-center p-2 flex-shrink-0 shadow-sm">
                          <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <h3 className="font-outfit font-extrabold text-slate-900 dark:text-slate-100 text-base md:text-lg leading-snug group-hover:text-primary transition-colors duration-200">
                            {edu.institution}
                          </h3>
                          <p className="text-primary font-bold text-xs mt-1 uppercase">{edu.degree}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs md:text-[13px] text-slate-650 dark:text-slate-350 leading-relaxed font-medium pl-0 relative z-10">
                        {edu.description
                          .split(". ")
                          .filter(Boolean)
                          .map((sentence, index) => (
                            <span key={index} className="block mt-1">
                              {sentence.endsWith(".") ? sentence : sentence + "."}
                            </span>
                          ))}
                      </p>

                      {/* Mobile period display */}
                      <span className="inline-block mt-4 px-2.5 py-0.5 bg-primary/10 dark:bg-primary/5 text-primary text-[9px] font-extrabold tracking-wider uppercase rounded-full border border-primary/20 md:hidden">
                        {edu.period}
                      </span>
                    </div>
                  </motion.div>

                  {/* Period sidebar block (Desktop only) */}
                  <div className="hidden md:flex w-[calc(50%-32px)] items-center justify-center">
                    <motion.div
                      className={`w-full ${isLeft ? "text-left pl-8" : "text-right pr-8"}`}
                      initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <span className="text-xs font-black font-plus-jakarta tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                        {edu.period.split(" - ")[0]}
                      </span>
                      <span className="block text-[10px] text-slate-350 dark:text-slate-600 font-bold mt-1 uppercase">
                        to {edu.period.split(" - ")[1] || edu.period.split(" - ")[0]}
                      </span>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
