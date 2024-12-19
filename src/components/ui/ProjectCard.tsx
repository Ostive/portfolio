import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Link } from './Link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    demo: string;
  };
}

export function ProjectCard({ title, description, image, tags, links }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="group bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/10"
    >
      <div className="relative overflow-hidden">
        <div className="aspect-video">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-4">
          <Link 
            href={links.github} 
            className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100 p-3 bg-white/10 rounded-full hover:bg-white/20"
          >
            <Github className="w-6 h-6" />
          </Link>
          <Link 
            href={links.demo} 
            className="transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-200 p-3 bg-white/10 rounded-full hover:bg-white/20"
          >
            <ExternalLink className="w-6 h-6" />
          </Link>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-indigo-400">
          {title}
        </h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge 
              key={index} 
              variant={index === 0 ? 'primary' : 'default'}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}