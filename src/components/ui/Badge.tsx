import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseClasses = 'px-3 py-1 rounded-full text-sm';
  const variantClasses = {
    default: 'bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-gray-300',
    primary: 'bg-indigo-500/10 backdrop-blur-sm border border-indigo-500/20 text-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.1)]',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}