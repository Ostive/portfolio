import { motion, Variants } from 'framer-motion';
import { skillIcons } from '../../lib/skillIcons';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  variants?: Variants;
}

export function SkillCategory({ title, skills, variants }: SkillCategoryProps) {
  return (
    <motion.div variants={variants} className="h-full">
      <div className="terminal-window h-full transition-colors duration-150 hover:border-term-accent/50">
        <div className="terminal-titlebar">
          <span className="terminal-dot bg-red-500/70" />
          <span className="terminal-dot bg-yellow-500/70" />
          <span className="terminal-dot bg-term-accent/70" />
        </div>
        <div className="p-6 h-full">
          <h3 className="text-lg font-bold mb-4 font-mono text-term-accent">## {title}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
              const def = skillIcons[skill];
              const Icon = def?.icon;
              return (
                <motion.div
                  key={skill}
                  className="group flex items-center gap-2 px-3 py-1 border border-term-border rounded-sm text-sm font-mono text-term-muted hover:border-term-accent hover:text-term-text transition-colors duration-150 cursor-default"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  whileHover={{
                    y: -3,
                    scale: 1.06,
                    transition: { duration: 0.15 },
                  }}
                >
                  {Icon && (
                    <motion.span
                      className="flex items-center justify-center"
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon size={16} color={def.color} />
                    </motion.span>
                  )}
                  <span>{skill}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
