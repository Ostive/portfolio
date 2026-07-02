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
      <div className="h-full p-2">
        <h3 className="text-lg font-bold mb-5 font-mono text-term-accent">
          <span className="text-term-muted">$</span> {title}
        </h3>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, index) => {
            const def = skillIcons[skill];
            const Icon = def?.icon;
            return (
              <motion.div
                key={skill}
                className="group flex items-center gap-2 px-3 py-2 rounded-md text-sm font-mono text-term-muted cursor-default"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                whileHover={{
                  y: -3,
                  scale: 1.06,
                  color: '#c9d1d9',
                  transition: { duration: 0.15 },
                }}
              >
                {Icon && (
                  <motion.span
                    className="flex items-center justify-center"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={18} color={def.color} />
                  </motion.span>
                )}
                <span className="group-hover:text-term-text transition-colors duration-150">
                  {skill}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
