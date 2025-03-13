import { Code2, GraduationCap, Languages } from 'lucide-react';
import { TimelineItem } from '../ui/TimelineItem';
import { StatCard } from '../ui/StatCard';

const stats = [
  {
    label: 'Years of Experience',
    value: '3+',
    icon: Code2,
    description: 'Working with modern web technologies'
  },
  {
    label: 'Projects Completed',
    value: '15+',
    icon: Code2,
    description: 'From concept to deployment'
  },
  {
    label: 'Languages',
    value: '4',
    icon: Languages,
    description: 'English, French, Spanish, German'
  }
];

const education = [
  {
    period: '2022 - 2025',
    title: 'Bachelor of Computer Science',
    institution: 'University of Toulouse',
    description: 'Specializing in software engineering and web development with a focus on modern frameworks and methodologies.'
  },
  {
    period: '2020 - 2022',
    title: 'Associate Degree in Computer Science',
    institution: 'Toulouse Technical Institute',
    description: 'Foundational studies in programming, algorithms, and computer systems.'
  },
  {
    period: '2019 - 2020',
    title: 'Web Development Bootcamp',
    institution: 'CodeCamp Toulouse',
    description: 'Intensive training in front-end and back-end web development technologies.'
  }
];

export function About() {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-16 text-center">About Me</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Education</h3>
          <div className="space-y-8">
            {education.map((item, index) => (
              <TimelineItem
                key={index}
                period={item.period}
                title={item.title}
                subtitle={item.institution}
                description={item.description}
                icon={<GraduationCap className="h-6 w-6" />}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">My Journey</h3>
            <p className="text-gray-400 mb-4">
              I'm a passionate computer science student and web developer with a strong focus on creating responsive, user-friendly applications. My journey in tech began with a web development bootcamp that ignited my passion for coding.
            </p>
            <p className="text-gray-400 mb-4">
              Since then, I've been constantly expanding my skills through academic studies and hands-on projects. I enjoy solving complex problems and turning ideas into functional, elegant solutions.
            </p>
            <p className="text-gray-400">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the community.
            </p>
          </div>
          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg p-6 border border-indigo-500/20">
            <h3 className="text-2xl font-bold mb-4">My Approach</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>I believe in writing clean, maintainable code that solves real problems</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>I focus on creating intuitive user experiences that delight users</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>I'm committed to continuous learning and staying up-to-date with industry trends</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>I value collaboration and believe the best results come from teamwork</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">•</span>
                <span>I approach challenges with creativity and persistence</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}