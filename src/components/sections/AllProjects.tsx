import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../ui/ProjectCard';
import { Link } from '../ui/Link';

const allProjects = [
  // ... (keep all projects array content same)
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
    tags: ['PHP', 'JavaScript', 'MySQL', 'REST API', 'Laravel'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  // Other Projects
  {
    title: 'E-Commerce Platform',
    description: 'Optimisation and Improvement of e-commerce platform',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800',
    tags: ['PHP', 'JavaScript', 'MySQL', 'Prestashop'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Stock Management Platform',
    description: 'Creation of a platform for managing stock and inventory',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    tags: ['Winform', 'C#', 'SQLServer', 'OOP', 'UML'],
    links: {
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  },
  {
    title: 'Network Management of a fictitious company',
    description: 'Network management of a fictitious company with Cisco Packet Tracer',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
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
    tags: ['Python', 'Jupyter Notebook', 'Pandas', 'Scikit-learn'],
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
  }
];

export function AllProjects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="all-projects" className="py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col items-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="button-secondary mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <h2 className="text-4xl font-bold mb-4">All Projects</h2>
          <p className="text-gray-400 max-w-2xl text-center">
            Explore my complete portfolio of projects, showcasing various technologies and solutions
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {allProjects.map((project, index) => (
            <ProjectCard key={index} {...project} variants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}