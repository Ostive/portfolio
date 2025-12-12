import { motion, Variants } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { BorderBeam } from './border-beam';

interface SkillCategoryProps {
  title: string;
  skills: string[];
  variants?: Variants;
}

export function SkillCategory({ title, skills, variants }: SkillCategoryProps) {
  return (
    <motion.div
      variants={variants}
      className="h-full"
    >
      <TiltCard className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg h-full relative overflow-hidden group" rotationFactor={10}>
        <BorderBeam
          duration={12}
          delay={9}
          size={200}
        />
        <div className="p-6 h-full relative z-10">
          <h3 className="text-xl font-bold mb-4 text-gradient">{title}</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300 transition-colors hover:bg-gray-600 cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}