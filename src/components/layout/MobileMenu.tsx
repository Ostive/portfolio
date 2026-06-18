import { X, Download } from 'lucide-react';
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
      <div className="fixed right-0 top-0 bottom-0 w-3/4 max-w-xs bg-term-surface border-l border-term-border p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-8 border-b border-term-border pb-4">
          <span className="font-mono text-sm text-term-accent">{'>_'} menu</span>
          <button onClick={onClose} className="p-2 text-term-muted hover:text-term-accent transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col gap-2">
          {isAllProjects ? (
            <Link href="/" className="text-term-muted hover:text-term-accent transition-colors py-2 font-mono text-sm">
              {'< back_to_home'}
            </Link>
          ) : (
            <>
              <NavLink href="#home" isActive={activeSection === 'home'} onClick={onClose}>
                home
              </NavLink>
              <NavLink href="#about" isActive={activeSection === 'about'} onClick={onClose}>
                about
              </NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'} onClick={onClose}>
                projects
              </NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'} onClick={onClose}>
                skills
              </NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'} onClick={onClose}>
                experience
              </NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'} onClick={onClose}>
                contact
              </NavLink>
              <div className="mt-4 pt-4 border-t border-term-border">
                <a
                  href="/documents/CV_Ostive_Kevin.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-3 border border-term-border hover:border-term-accent hover:text-term-accent rounded-sm transition-colors font-mono text-sm w-full justify-center"
                  onClick={onClose}
                >
                  <Download className="h-4 w-4" />
                  <span>download_cv</span>
                </a>
              </div>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
