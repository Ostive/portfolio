import { motion } from 'framer-motion';
import { SkillCategory } from '../ui/SkillCategory';

const skills = {
  'Programming': [
    'C++', 'C#', 'C', 'Python', 'JavaScript', 'TypeScript', 'React', 'PHP', 'XAML'
  ],
  'Web Development': [
    'Next.js', 'Laravel', 'HTML/CSS', 'Tailwind CSS'
  ],
  'Databases': [
    'MySQL', 'SQL Server', 'Hive', 'Hadoop', 'PostgreSQL'
  ],
  'DevOps': [
    'Docker', 'Docker Swarm', 'CI/CD', 'Nginx', 'Git'
  ],
  'Tools': [
    'Git', 'Trello', 'Gantt', 'UML', 'REST API'
  ],
  'Soft Skills': [
    'Teamwork', 'Problem Solving', 'Organization', 'Communication'
  ]
};

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-4xl font-bold mb-16 text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Expertise
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {Object.entries(skills).map(([category, items]) => (
            <SkillCategory key={category} title={category} skills={items} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}