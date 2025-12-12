import { useState, useCallback, useEffect, useRef } from 'react';
import { ExperienceCard } from '../ui/ExperienceCard';
import { TimelineStepper } from '../ui/timeline-stepper';
import { ParallaxCard } from '../ui/parallax-card';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '../../lib/utils';

const experiences = [
  {
    period: 'Oct 2024 - Feb 2025',
    role: 'Technician Intern',
    company: 'Medtech World',
    location: 'Msida, Malta',
    description: [
      'Created digital marketing reports analyzing website performance data',
      'Managed daily social media posts to engage audiences',
      'Provided IT support for troubleshooting and technical issues',
      'Developed automation scripts for marketing posts'
    ],
    technologies: ['Analytics', 'Social Media', 'IT Support', 'Automation'],
    link: 'https://med-tech.world'
  },
  {
    period: 'Jan - Apr 2024',
    role: 'Computer Engineering Intern',
    company: 'Digital Product Simulation',
    location: 'Toulouse, France',
    description: [
      'Developed HR management web application',
      'Implemented responsive design with Tailwind CSS',
      'Designed and implemented MySQL database',
      'Created CRUD REST API for user management'
    ],
    technologies: ['Tailwind CSS', 'MySQL', 'REST API', 'Web Development'],
    link: 'https://dps-fr.com'
  },
  {
    period: 'Apr - Jul 2023',
    role: 'Web Development Intern',
    company: 'E-VALORIS',
    location: 'Toulouse, France',
    description: [
      'Enhanced website user experience using PHP and CSS',
      'Migrated database to MySQL',
      'Ensured data consistency during migration',
      'Collaborated with team for reliable implementation'
    ],
    technologies: ['PHP', 'CSS', 'MySQL', 'Database Migration']
  }
];

interface ExperienceItemProps {
  experience: typeof experiences[0];
  index: number;

  onInView: (index: number, inView: boolean) => void;
}

function ExperienceItem({ experience, index, onInView }: ExperienceItemProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    onInView(index, inView);
  }, [index, inView, onInView]);

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <ParallaxCard
        className={cn(
          "transition-all duration-500"
        )}
      >
        <ExperienceCard {...experience} />
      </ParallaxCard>
    </motion.div>
  );
}

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState(new Set<number>());


  const handleInView = useCallback((index: number, inView: boolean) => {
    setVisibleSections(prev => {
      const next = new Set(prev);
      if (inView) {
        next.add(index);
      } else {
        next.delete(index);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    const maxVisible = Math.max(...Array.from(visibleSections));
    if (maxVisible >= 0) {
      setCurrentStep(maxVisible);
    }
  }, [visibleSections]);

  // Handle mouse movement for beam effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="experience" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Professional Experience</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A track record of delivering impactful solutions across different roles and technologies
          </p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Experience content with timeline */}
          <div className="relative pl-12 space-y-8">
            {/* Timeline stepper must remain outside any other container to work properly */}
            <TimelineStepper steps={experiences.length} currentStep={currentStep} />

            {/* Experience items */}
            {experiences.map((experience, index) => (
              <ExperienceItem
                key={index}
                index={index}
                experience={experience}
                onInView={handleInView}
              />
            ))}
          </div>

          {/* Beam effect overlay - positioned absolutely to not interfere with timeline */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
            }}
          />
        </div>
      </div>


    </section>
  );
}