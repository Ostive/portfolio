import React from 'react';
import { X } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import { Link } from '../ui/Link';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
  isAllProjects: boolean;
}

export function MobileMenu({ isOpen, activeSection, onClose, isAllProjects }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-gray-800 p-6">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xl font-bold">Menu</span>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {isAllProjects ? (
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Back to Home
            </Link>
          ) : (
            <>
              <NavLink href="#home" isActive={activeSection === 'home'} onClick={onClose}>
                Home
              </NavLink>
              <NavLink href="#about" isActive={activeSection === 'about'} onClick={onClose}>
                About
              </NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'} onClick={onClose}>
                Projects
              </NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'} onClick={onClose}>
                Skills
              </NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'} onClick={onClose}>
                Experience
              </NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'} onClick={onClose}>
                Contact
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}