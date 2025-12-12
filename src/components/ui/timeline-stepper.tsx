import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { TimelineBeam } from './timeline-beam';

interface TimelineStepperProps {
  steps: number;
  currentStep: number;
}

interface TimelineStepProps {
  index: number;
  steps: number;
  currentStep: number;
}

function TimelineStep({ index, steps, currentStep }: TimelineStepProps) {
  const isActive = index <= currentStep;

  return (
    <motion.div
      className="absolute w-4 h-4 -left-[7px]"
      style={{ top: `${(index / (steps - 1)) * 100}%` }}
    >
      {/* Step circle */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full border-2 transition-all duration-300 z-10",
          isActive
            ? "bg-indigo-500 border-indigo-500"
            : "bg-gray-900 border-gray-600"
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
    </motion.div>
  );
}

export function TimelineStepper({ steps, currentStep }: TimelineStepperProps) {
  // Calculate progress: if step 0 is active, progress is to first dot.
  // Actually, we want the beam to fill UP TO the current Step.
  // if currentStep is 0 (first item), beam should presumably just be at start dot?
  // Or typically "stepper" implies lines connect completed steps. 
  // If I am at step 0, line to step 0 is full? 
  // Let's assume the beam fills up to the current active dot.

  const progress = steps > 1 ? currentStep / (steps - 1) : 0;

  return (
    <div className="absolute left-0 inset-y-0">
      {/* Main timeline beam */}
      <TimelineBeam progress={progress} />

      {/* Step indicators */}
      {Array.from({ length: steps }).map((_, index) => (
        <TimelineStep
          key={index}
          index={index}
          steps={steps}
          currentStep={currentStep}
        />
      ))}
    </div>
  );
}