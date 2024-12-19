import React from 'react';
import { AnimatedSection } from './AnimatedSection';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({ title, subtitle, centered = true }: SectionTitleProps) {
  return (
    <AnimatedSection className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}