import React from 'react';
import { Briefcase } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
  variants?: Variants;
}

export function TimelineItem({ period, title, subtitle, description, icon, variants }: TimelineItemProps) {
  return (
    <motion.div
      className="relative pl-8 border-l border-term-border"
      variants={variants}
    >
      <div className="absolute -left-3 p-2 bg-term-surface rounded-full border border-term-border text-term-accent">
        {icon || <Briefcase className="w-4 h-4" />}
      </div>
      <div className="mb-1 text-sm font-mono text-term-accent">{'// '}{period}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="text-term-muted mb-2 font-mono text-sm">{subtitle}</div>
      <p className="text-term-muted">{description}</p>
    </motion.div>
  );
}
