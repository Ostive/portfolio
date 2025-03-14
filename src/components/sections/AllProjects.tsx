import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { Link } from '../ui/Link';

const allProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'Optimisation and Improvement of e-commerce platform',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    tags: ['PHP', 'JavaScript', 'MySQL','Prestashop'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Stock Management Platform',
    description: 'Creation of a platform for managing stock and inventory',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    tags: ['Winform', 'C#', 'SQLServer', 'OOP', 'UML'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Network Management of a fictif company',
    description: 'Management of the network infrastructure of a fictif company',
    image: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800',
    tags: ['Cisco packet tracer', 'IPv4', 'IPv6', 'VLAN', 'Switch', 'Router', 'Firewall'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'AI Prediction of TurnOver',
    description: 'Analysis of factors leading to employee turnover and creation of a predicting model',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
    tags: [ 'Python', 'Jupyter Notebook', 'Pandas', 'Scikit-learn'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Skill Analytics Dashboard',
    description: 'Analysis of skills for a better employee matching and employee improvement',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['Laravel', 'JavaScript', 'MySQL', 'Highcharts'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Real Estate Platform',
    description: 'Creation of a real estate platform with property management system and search engine',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL','React'],
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