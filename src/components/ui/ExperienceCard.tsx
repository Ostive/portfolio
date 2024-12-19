import React from 'react';
import { Building2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string[];
  technologies: string[];
}

export function ExperienceCard({
  period,
  role,
  company,
  location,
  description,
  technologies
}: ExperienceCardProps) {
  return (
    <motion.div 
      className="bg-gray-800 rounded-lg p-8 card-hover"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <span className="text-sm text-indigo-400 mb-2 block">{period}</span>
          <h3 className="text-xl font-bold mb-2">{role}</h3>
          <div className="flex flex-wrap gap-4 text-gray-400">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>{company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>
        </div>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-400 mb-6">
        {description.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <motion.span
            key={index}
            className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}