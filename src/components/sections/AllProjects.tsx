import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { Link } from '../ui/Link';

const allProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Next.js powered marketplace with real-time inventory and payments',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'AI Task Manager',
    description: 'Smart task management with AI-powered prioritization',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Python', 'OpenAI'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Cloud Analytics Dashboard',
    description: 'Real-time cloud infrastructure monitoring and analytics',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Vue.js', 'AWS', 'GraphQL'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Social Media Analytics',
    description: 'Comprehensive social media analytics and reporting platform',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Healthcare Management System',
    description: 'Modern healthcare management platform with real-time patient tracking',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    tags: ['React', 'Express', 'MongoDB'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Real Estate Platform',
    description: 'Advanced real estate platform with virtual tours and analytics',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  }
];

export function AllProjects() {
  return (
    <section id="all-projects" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16">
          <Link href="/" className="button-secondary mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h2 className="text-4xl font-bold mb-4">All Projects</h2>
          <p className="text-gray-400 max-w-2xl text-center">
            Explore my complete portfolio of projects, showcasing various technologies and solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}