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
      <div className="fixed inset-0 bg-black/70" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-gray-900 shadow-lg p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out">
        <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <span className="text-xl font-bold text-white">Menu</span>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col gap-4">
          {isAllProjects ? (
            <Link href="/" className="text-gray-400 hover:text-white transition-colors py-2">
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