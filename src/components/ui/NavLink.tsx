import React from 'react';

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string; // Allow custom classes
}

export function NavLink({ href, isActive, children, onClick, className = '' }: NavLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        onClick?.();
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`relative px-3 py-2 font-mono text-xs uppercase tracking-wider transition-colors duration-150 ${
        isActive ? 'text-term-accent' : 'text-term-muted hover:text-term-text'
      } ${className}`}
    >
      <span className="text-term-accent">{isActive ? '> ' : ''}</span>
      {children}
    </a>
  );
}
