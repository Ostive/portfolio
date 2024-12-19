import React from 'react';
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
  return (
    <section id="skills" className="py-32 bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">Technical Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items]) => (
            <SkillCategory key={category} title={category} skills={items} />
          ))}
        </div>
      </div>
    </section>
  );
}