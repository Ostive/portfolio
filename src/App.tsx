
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { AllProjects } from './components/sections/AllProjects';
import { Skills } from './components/sections/Skills';
import { FavoriteCommands } from './components/sections/FavoriteCommands';
import { LanguageRace } from './components/sections/LanguageRace';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { BugToast } from './components/ui/BugToast';
import { GlitchAnomalies } from './components/ui/GlitchAnomalies';
import { GlitchTear } from './components/ui/GlitchTear';
import { useLocation } from './hooks/useLocation';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at top right, rgba(63, 185, 80, 0.08), transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <Header />
        <main>
          {pathname === '/all-projects' ? (
            <AllProjects />
          ) : (
            <>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <FavoriteCommands />
              <LanguageRace />
              <Experience />
              <Contact />
            </>
          )}
        </main>
        <Footer />
        <GlitchAnomalies />
        <GlitchTear />
        <BugToast />
      </div>
    </div>
  );
}