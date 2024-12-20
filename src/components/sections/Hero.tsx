import React from 'react';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      <div className="absolute inset-0">
        <img
          src="/api/placeholder/2070/1380"
          alt="Hero Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900"></div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-32">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight break-words">
            <span className="block">RANDRIANOMENAJANAHARY</span>
            <span className="block text-gradient mt-2">Ostive</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mb-8 md:mb-12">
            Engineering student passionate about development and innovation,
            specializing in creating modern web applications and software
            solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              View Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-300 hover:border-gray-400 text-gray-300 hover:text-white font-medium transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;