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
    <div className="terminal-window p-8 transition-colors duration-150 hover:border-term-accent/50">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
        <div>
          <span className="text-sm font-mono text-term-accent mb-2 block">{'// '}{period}</span>
          <h3 className="text-xl font-bold mb-2">{role}</h3>
          <div className="flex flex-wrap gap-4 text-term-muted">
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

      <ul className="space-y-2 text-term-muted mb-6">
        {description.map((item, index) => (
          <motion.li
            key={index}
            className="flex items-start gap-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-term-accent font-mono">$</span>
            <span>{item}</span>
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <motion.span
            key={index}
            className="px-3 py-1 border border-term-border rounded-sm text-sm font-mono text-term-muted"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
