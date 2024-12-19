import React from 'react';

interface LinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function Link({ href, className, children }: LinkProps) {
  const isMailto = href.startsWith('mailto:');
  const isExternal = href.startsWith('http') || isMailto;

  return (
    <a
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
}