import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import { skills } from "@/lib/data";

// Brand accent colors per skill
const SKILL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Java 17":          { bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200" },
  "Spring Boot":      { bg: "bg-emerald-50", text: "text-emerald-600",border: "border-emerald-200" },
  "Spring Security":  { bg: "bg-amber-50",   text: "text-amber-600",  border: "border-amber-200" },
  "RESTful APIs":     { bg: "bg-purple-50",  text: "text-purple-600", border: "border-purple-200" },
  "Node.js":          { bg: "bg-green-50",   text: "text-green-600",  border: "border-green-200" },
  "Express.js":       { bg: "bg-slate-50",   text: "text-slate-600",  border: "border-slate-200" },
  J2EE:               { bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200" },
  Hibernate:          { bg: "bg-orange-50",  text: "text-orange-600", border: "border-orange-200" },
  "React.js":         { bg: "bg-cyan-50",    text: "text-cyan-600",   border: "border-cyan-200" },
  TypeScript:         { bg: "bg-indigo-50",  text: "text-indigo-600", border: "border-indigo-200" },
  JavaScript:         { bg: "bg-yellow-50",  text: "text-yellow-600", border: "border-yellow-200" },
  "Next.js":          { bg: "bg-sky-50",     text: "text-sky-600",    border: "border-sky-200" },
  "Tailwind CSS":     { bg: "bg-teal-50",    text: "text-teal-600",   border: "border-teal-200" },
  "HTML5 & CSS3":     { bg: "bg-orange-50",  text: "text-orange-600", border: "border-orange-200" },
  PostgreSQL:         { bg: "bg-indigo-50",  text: "text-indigo-600", border: "border-indigo-200" },
  "SQL Server":       { bg: "bg-blue-50",    text: "text-blue-600",   border: "border-blue-200" },
  MongoDB:            { bg: "bg-green-50",   text: "text-green-600",  border: "border-green-200" },
  "AWS (EC2, S3)":    { bg: "bg-amber-50",   text: "text-amber-600",  border: "border-amber-200" },
  Docker:             { bg: "bg-sky-50",     text: "text-sky-600",    border: "border-sky-200" },
  "GitHub Actions":   { bg: "bg-slate-50",   text: "text-slate-600",  border: "border-slate-200" },
  JUnit:              { bg: "bg-rose-50",    text: "text-rose-600",   border: "border-rose-200" },
  Mockito:            { bg: "bg-red-50",     text: "text-red-600",    border: "border-red-200" },
  Postman:            { bg: "bg-orange-50",  text: "text-orange-600", border: "border-orange-200" },
  "Jest & Mocha":     { bg: "bg-pink-50",    text: "text-pink-600",   border: "border-pink-200" },
  "OpenAI & Gemini APIs": { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-200" },
  "AI-Assisted Dev":  { bg: "bg-purple-50",  text: "text-purple-600", border: "border-purple-200" },
  "Salesforce CRM":   { bg: "bg-blue-50",    text: "text-blue-600",   border: "border-blue-200" },
  Apex:               { bg: "bg-sky-50",     text: "text-sky-600",    border: "border-sky-200" },
  LWC:                { bg: "bg-blue-50",    text: "text-blue-600",   border: "border-blue-200" },
  "Salesforce Integration": { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-200" },
};

const groups = [
  { label: "Backend & Java Stack", keys: ["Java 17", "Spring Boot", "Spring Security", "RESTful APIs", "Node.js", "Express.js", "J2EE", "Hibernate"] },
  { label: "Frontend & Web Technologies", keys: ["React.js", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", "HTML5 & CSS3"] },
  { label: "Databases & Cloud/DevOps", keys: ["PostgreSQL", "SQL Server", "MongoDB", "AWS (EC2, S3)", "Docker", "GitHub Actions"] },
  { label: "Testing & QA", keys: ["JUnit", "Mockito", "Postman", "Jest & Mocha"] },
  { label: "AI & Productivity", keys: ["OpenAI & Gemini APIs", "AI-Assisted Dev"] },
  { label: "Salesforce & Integration", keys: ["Salesforce CRM", "Apex", "LWC", "Salesforce Integration"] },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-[#f8f8fa] relative overflow-hidden">
      <Container className="relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-5xl font-black text-slate-200 select-none leading-none">02.</span>
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary uppercase mb-1">What I Know</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Skills &amp; Technologies</h2>
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-6 hidden sm:block" />
        </motion.div>

        <div className="space-y-10">
          {groups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: gi * 0.1 }}
            >
              <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter((s) => group.keys.includes(s.name))
                  .map((skill, i) => {
                    const colors = SKILL_COLORS[skill.name] ?? {
                      bg: "bg-slate-50",
                      text: "text-slate-600",
                      border: "border-slate-200",
                    };
                    return (
                      <motion.div
                        key={skill.name}
                        className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${colors.bg} ${colors.border} cursor-default group transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: gi * 0.05 + i * 0.05 }}
                      >
                        <i className={`${skill.icon} text-base ${colors.text}`} />
                        <span className={`text-sm font-semibold ${colors.text}`}>{skill.name}</span>
                      </motion.div>
                    );
                  })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative background blob */}
        <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </Container>
    </section>
  );
}
