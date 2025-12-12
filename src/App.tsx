
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { AllProjects } from './components/sections/AllProjects';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Contact } from './components/sections/Contact';
import { useLocation } from './hooks/useLocation';
import { AnimatedBackground, FloatingParticles } from './components/ui/animated-background';

export default function App() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background */}
      <AnimatedBackground />
      <FloatingParticles />

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
              <Experience />
              <Contact />
            </>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}