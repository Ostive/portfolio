import React from 'react';
import { motion } from 'framer-motion';

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
      className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'
        } ${className}`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 bg-gray-800 rounded-full -z-10"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </a>
  );
}