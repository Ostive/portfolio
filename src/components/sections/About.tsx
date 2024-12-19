import React from 'react';
import { Code2, GraduationCap, Languages } from 'lucide-react';
import { TimelineItem } from '../ui/TimelineItem';
import { StatCard } from '../ui/StatCard';

const stats = [
  { icon: Code2, label: 'Years of Experience', value: '3+' },
  { icon: GraduationCap, label: 'Academic Projects', value: '10+' },
  { icon: Languages, label: 'Languages', value: '2' },
];

const education = [
  {
    year: '2023 - 2026',
    title: 'Graduate School of Engineering',
    company: 'CESI',
    description: 'Active learning through problem-solving and group project implementation.'
  },
  {
    year: '2021 - 2023',
    title: 'Two-year undergraduate intensive preparation courses',
    company: 'CESI',
    description: 'Development of a strong foundation in computer science and communication.'
  },
  {
    year: '2018 - 2021',
    title: 'French School of Tananarive',
    company: 'Baccalauréat with honors',
    description: 'Specializations: Mathematics, Digital and Computer Science, Physics-Chemistry.'
  }
];

export function About() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-6">Profile</h3>
            <p className="text-gray-400 mb-8">
              Development is a source of knowledge and curiosity that drives me to work and love what I do.
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Languages</h4>
                <div className="flex gap-4">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">French (Native)</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">English (B2)</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Hobbies</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Parkour (3 years)</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Rock climbing (2 years)</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Video game development</span>
                  <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">E-sports</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Education</h3>
            <div className="space-y-8">
              {education.map((item, index) => (
                <TimelineItem key={index} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}