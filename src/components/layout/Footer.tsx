import React from 'react';
import { Code2, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Code2 className="h-6 w-6 text-indigo-400" />
            <span className="font-bold text-xl">DevPortfolio</span>
          </div>
          <div className="flex gap-6">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="mailto:contact@example.com" className="text-gray-400 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          <div className="text-gray-500 text-sm mt-4 md:mt-0">
            © {new Date().getFullYear()} All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}