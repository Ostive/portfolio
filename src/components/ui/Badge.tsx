import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseClasses = 'px-2.5 py-1 rounded-sm text-xs font-mono border';
  const variantClasses = {
    default: 'border-term-border text-term-muted',
    primary: 'border-term-accent/40 text-term-accent',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      #{children}
    </span>
  );
}
