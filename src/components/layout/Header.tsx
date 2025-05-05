import { Code2, Menu } from 'lucide-react';
import { NavLink } from '../ui/NavLink';
import { MobileMenu } from './MobileMenu';
import { useNavigation } from '../../hooks/useNavigation';
import { Link } from '../ui/Link';
import { useLocation } from '../../hooks/useLocation';

export function Header() {
  const { isOpen, activeSection, toggleMenu, closeMenu } = useNavigation();
  const { pathname } = useLocation();
  const isAllProjects = pathname === '/all-projects';

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900 shadow-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Code2 className="h-6 w-6 text-indigo-400" />
            <span className="font-bold text-xl">DevPortfolio</span>
          </Link>
          
          {!isAllProjects && (
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="#home" isActive={activeSection === 'home'}>
                Home
              </NavLink>
              <NavLink href="#about" isActive={activeSection === 'about'}>
                About
              </NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'}>
                Projects
              </NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'}>
                Skills
              </NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'}>
                Experience
              </NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'}>
                Contact
              </NavLink>
            </nav>
          )}

          <button 
            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      <MobileMenu 
        isOpen={isOpen}
        activeSection={activeSection}
        onClose={closeMenu}
        isAllProjects={isAllProjects}
      />
    </header>
  );
}