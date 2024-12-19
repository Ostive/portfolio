import React from 'react';

interface SkillCategoryProps {
  title: string;
  skills: string[];
}

export function SkillCategory({ title, skills }: SkillCategoryProps) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h3 className="text-xl font-bold mb-4 text-gradient">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}