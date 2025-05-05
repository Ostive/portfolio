import { ArrowRight } from 'lucide-react';
import { ProjectCard } from '../ui/ProjectCard';
import { Link } from '../ui/Link';
import { BeamContainer } from '../ui/beam-container';

const featuredProjects = [
  {
    title: 'Madatravel',
    description: 'Travel platform for exploring Madagascar with interactive trip planning features',
    image: '/images/projects/madatravel.jpg',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Imopanorama Real Estate Website',
    description: 'Currently working on real estate platform with property management system and search engine',
    image: '/images/projects/imopanorama.jpg',
    tags: ['Next.js', 'CRUD', 'Database', 'Search Engine'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Job Listing Platform',
    description: 'Group project implementing MVC architecture with REST API integration',
    image: '/images/projects/job-listing.jpg',
    tags: ['PHP', 'JavaScript', 'MySQL', 'REST API'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-400 max-w-2xl">
              A showcase of my technical achievements and project implementations
            </p>
          </div>
          <Link href="/all-projects" className="button-secondary">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <BeamContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </BeamContainer>
      </div>
    </section>
  );
}