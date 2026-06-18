import { Menu, Download } from 'lucide-react';
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
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-term-border bg-term-bg/90 backdrop-blur-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm">
            <span className="text-term-accent">{'>_'}</span>
            <span className="font-semibold tracking-tight">ostive.dev</span>
          </Link>

          {!isAllProjects && (
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink href="#home" isActive={activeSection === 'home'}>home</NavLink>
              <NavLink href="#about" isActive={activeSection === 'about'}>about</NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'}>projects</NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'}>skills</NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'}>experience</NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'}>contact</NavLink>

              <div className="w-px h-5 bg-term-border mx-2" />

              <a
                href="/documents/CV_Ostive_Kevin.pdf"
                download
                className="flex items-center gap-2 px-3 py-1.5 border border-term-border hover:border-term-accent hover:text-term-accent rounded-sm font-mono text-xs transition-colors duration-150"
              >
                <Download className="h-3.5 w-3.5" />
                <span>cv.pdf</span>
              </a>
            </nav>
          )}

          <button
            className="lg:hidden p-2 text-term-muted hover:text-term-accent transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
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
