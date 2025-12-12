
import { Code2, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-gray-900 pt-20 pb-10">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Code2 className="h-6 w-6 text-indigo-400" />
            </div>
            <span className="font-bold text-xl tracking-tight">DevPortfolio</span>
          </div>

          <div className="flex gap-8">
            <a href="https://github.com/Ostive" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://fr.linkedin.com/in/ostive-kevin-randrianomenjanahary" target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:Ostiverandrianomenjanahary@gmail.com" className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all">
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} RANDRIANOMENAJANAHARY Ostive. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}