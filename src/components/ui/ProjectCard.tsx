import { motion, Variants } from 'framer-motion';
import { Badge } from './Badge';
import { TiltCard } from './TiltCard';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  links: {
    github: string;
    demo: string;
  };
  variants?: Variants;
}

export function ProjectCard({ title, description, image, tags, variants }: ProjectCardProps) {
  return (
    <motion.div
      variants={variants}
      className="h-full"
    >
      <TiltCard className="group h-full bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col">
        <div className="relative overflow-hidden">
          <div className="aspect-video">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-indigo-400">
            {title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2 flex-1">{description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
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
      </TiltCard>
    </motion.div>
  );
}