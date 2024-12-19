import React from 'react';

interface NavLinkProps {
  href: string;
  isActive?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function NavLink({ href, isActive, children, onClick }: NavLinkProps) {
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
      className={`transition-colors duration-200 ${
        isActive
          ? 'text-indigo-400'
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
    </a>
  );
}