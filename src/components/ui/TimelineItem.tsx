import React from 'react';
import { Briefcase } from 'lucide-react';

interface TimelineItemProps {
  period: string;
  title: string;
  subtitle: string;
  description: string;
  icon?: React.ReactNode;
}

export function TimelineItem({ period, title, subtitle, description, icon }: TimelineItemProps) {
  return (
    <div className="relative pl-8 border-l border-gray-700">
      <div className="absolute -left-3 p-2 bg-gray-800 rounded-full border border-gray-700">
        {icon || <Briefcase className="w-4 h-4 text-indigo-400" />}
      </div>
      <div className="mb-1 text-sm text-indigo-400">{period}</div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <div className="text-gray-400 mb-2">{subtitle}</div>
      <p className="text-gray-500">{description}</p>
    </div>
  );
}