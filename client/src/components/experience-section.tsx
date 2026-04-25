"use client";
import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/lib/data";
import { useState } from "react";

export default function ExperienceSection() {
  const [active, setActive] = useState(0);
  const exp = experience[active];

  return (
    <section id="experience" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-100 select-none leading-none">03.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">Work History</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Experience</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-0 max-w-4xl">
          {/* Tab list */}
          <div className="md:w-44 flex md:flex-col flex-row overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l-2 border-slate-100 flex-shrink-0">
            {experience.map((e, i) => (
              <button
                key={`${e.company}-${e.position}`}
                onClick={() => setActive(i)}
                className={`relative px-4 py-3 text-sm font-medium text-left whitespace-nowrap transition-all duration-200 ${
                  active === i
                    ? "text-primary"
                    : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                }`}
              >
                {active === i && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute left-0 top-0 bottom-0 w-0.5 md:w-0.5 md:left-[-2px] md:right-auto right-0 bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="block text-[13px]">{e.company}</span>
                <span className="block text-[11px] text-slate-400 font-normal mt-0.5">{e.position.split(" ")[0]}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="flex-1 md:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl border border-slate-100 bg-white shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                    <img src={exp.logo} alt={exp.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{exp.position}</h3>
                    <p className="text-primary font-semibold text-sm">{exp.company}</p>
                    <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-primary/8 text-primary/90 rounded-full text-xs font-medium border border-primary/15">
                      {exp.period}
                    </span>
                  </div>
                </div>

                {/* Description as bullets */}
                <ul className="space-y-2.5">
                  {exp.description
                    .split(". ")
                    .filter(Boolean)
                    .map((sentence, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="mt-2 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {sentence.endsWith(".") ? sentence : sentence + "."}
                      </li>
                    ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
