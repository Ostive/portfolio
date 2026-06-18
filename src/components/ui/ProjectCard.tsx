import { motion, Variants } from 'framer-motion';
import { Badge } from './Badge';

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
    <motion.div variants={variants} className="h-full">
      <div className="terminal-window group h-full flex flex-col transition-colors duration-150 hover:border-term-accent/50">
        <div className="terminal-titlebar">
          <span className="terminal-dot bg-red-500/70" />
          <span className="terminal-dot bg-yellow-500/70" />
          <span className="terminal-dot bg-term-accent/70" />
          <span className="ml-2 text-xs font-mono text-term-muted truncate">{title.toLowerCase().replace(/\s+/g, '-')}.tsx</span>
        </div>

        <div className="aspect-video overflow-hidden border-b border-term-border">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold mb-2 font-mono group-hover:text-term-accent transition-colors duration-150">
            {title}
          </h3>
          <p className="text-term-muted mb-4 line-clamp-2 flex-1">{description}</p>
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
      </div>
    </motion.div>
  );
}
