import { Code2, Menu, Download } from 'lucide-react';
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
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-300">
      <div className="bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
              <Code2 className="h-5 w-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-lg tracking-tight">DevPortfolio</span>
          </Link>

          {!isAllProjects && (
            <nav className="hidden lg:flex items-center gap-1">
              <NavLink href="#home" isActive={activeSection === 'home'}>Home</NavLink>
              <NavLink href="#about" isActive={activeSection === 'about'}>About</NavLink>
              <NavLink href="#projects" isActive={activeSection === 'projects'}>Projects</NavLink>
              <NavLink href="#skills" isActive={activeSection === 'skills'}>Skills</NavLink>
              <NavLink href="#experience" isActive={activeSection === 'experience'}>Experience</NavLink>
              <NavLink href="#contact" isActive={activeSection === 'contact'}>Contact</NavLink>

              <div className="w-px h-6 bg-gray-800 mx-2" />

              <a
                href="/documents/CV_Ostive_Kevin.pdf"
                download
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-95 ml-2"
              >
                <Download className="h-4 w-4" />
                <span>CV</span>
              </a>
            </nav>
          )}

          <button
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
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