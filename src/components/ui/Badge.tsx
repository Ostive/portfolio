import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary';
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const baseClasses = 'px-3 py-1 rounded-full text-sm';
  const variantClasses = {
    default: 'bg-gray-700 text-gray-300',
    primary: 'bg-indigo-600/20 text-indigo-400',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
}