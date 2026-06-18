import { motion, Variants } from 'framer-motion';

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
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-term-border rounded-sm text-sm font-mono text-term-muted hover:border-term-accent hover:text-term-text transition-colors duration-150 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
