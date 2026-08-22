import { motion } from "framer-motion";
import { skills } from "@/lib/data";

const ease = [0.22, 1, 0.36, 1] as const;

const GROUPS = [
  {
    label: "Backend",
    keys: ["Java 17", "Spring Boot", "Spring Security", "RESTful APIs", "J2EE", "Hibernate", "Node.js", "Express.js"],
  },
  {
    label: "Frontend",
    keys: ["React.js", "TypeScript", "JavaScript", "Next.js", "HTML5 & CSS3", "Tailwind CSS"],
  },
  {
    label: "Data & Infrastructure",
    keys: ["PostgreSQL", "SQL Server", "MongoDB", "AWS (EC2, S3)", "Docker", "GitHub Actions"],
  },
  {
    label: "Testing",
    keys: ["JUnit", "Mockito", "Jest & Mocha", "Postman"],
  },
  {
    label: "Salesforce",
    keys: ["Salesforce CRM", "Apex", "LWC", "Salesforce Integration"],
  },
  {
    label: "AI & Tooling",
    keys: ["OpenAI & Gemini APIs", "AI-Assisted Dev"],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      aria-label="Skills and technologies"
      className="section-padding"
      style={{ background: "var(--c-bg)" }}
    >
      <div className="content-container">

        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="section-label">Skills</p>
          <h2 className="section-title">Technologies I work with</h2>
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {GROUPS.map((group, gi) => {
            const groupSkills = skills.filter((s) => group.keys.includes(s.name));
            if (!groupSkills.length) return null;

            return (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: gi * 0.07, ease }}
              >
                {/* Group label */}
                <p
                  className="text-xs font-semibold tracking-widest uppercase mb-4"
                  style={{ color: "var(--c-text-faint)" }}
                >
                  {group.label}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {groupSkills.map((skill, si) => (
                    <motion.span
                      key={skill.name}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.96 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: gi * 0.04 + si * 0.025, ease }}
                    >
                      <i className={`${skill.icon} text-xs`} aria-hidden />
                      {skill.name}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
