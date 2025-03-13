import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';
import { TimelineBeam } from './timeline-beam';

interface TimelineStepperProps {
  steps: number;
  currentStep: number;
}

export function TimelineStepper({ steps, currentStep }: TimelineStepperProps) {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  return (
    <div className="absolute left-0 inset-y-0">
      {/* Main timeline beam */}
      <TimelineBeam />
      
      {/* Step indicators */}
      {Array.from({ length: steps }).map((_, index) => {
        const isActive = index <= currentStep;
        const stepProgress = useTransform(
          scrollYProgress,
          [index / steps, (index + 1) / steps],
          [0, 1]
        );

        return (
          <motion.div
            key={index}
            className="absolute w-4 h-4 -left-[7px]"
            style={{ top: `${(index / (steps - 1)) * 100}%` }}
          >
            {/* Step circle */}
            <motion.div
              className={cn(
                "absolute inset-0 rounded-full border-2 transition-all duration-300",
                isActive 
                  ? "bg-indigo-500 border-indigo-500" 
                  : "bg-transparent border-gray-600"
              )}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.8,
                boxShadow: isActive 
                  ? "0 0 20px 4px rgba(99, 102, 241, 0.5)"
                  : "none",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            
            {/* Active step pulse effect */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full bg-indigo-400"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            )}
            
            {/* Progress beam between steps */}
            {index < steps - 1 && (
              <motion.div
                className="absolute top-4 left-1/2 w-[3px] rounded-full -translate-x-1/2 origin-top"
                style={{
                  height: `${100 / (steps - 1)}%`,
                  background: isActive 
                    ? "linear-gradient(180deg, rgb(99 102 241) 0%, rgba(99, 102, 241, 0.4) 100%)"
                    : "rgb(75, 85, 99)",
                  opacity: isActive ? 1 : 0.3,
                  scaleY: isActive ? 1 : stepProgress,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}