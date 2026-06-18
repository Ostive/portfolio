import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-term-border pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center gap-2 font-mono text-sm">
            <span className="text-term-accent">{'>_'}</span>
            <span className="font-semibold tracking-tight">ostive.dev</span>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/Ostive" target="_blank" rel="noopener noreferrer" className="p-2 text-term-muted hover:text-term-accent transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://fr.linkedin.com/in/ostive-kevin-randrianomenjanahary" target="_blank" rel="noopener noreferrer" className="p-2 text-term-muted hover:text-term-accent transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:Ostiverandrianomenjanahary@gmail.com" className="p-2 text-term-muted hover:text-term-accent transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-term-muted text-xs font-mono">
              {'// '}© {new Date().getFullYear()} RANDRIANOMENAJANAHARY Ostive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
