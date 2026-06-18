import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimelineBeamProps {
  className?: string;
  progress?: number;
}

export function TimelineBeam({ className, progress = 0 }: TimelineBeamProps) {
  return (
    <>
      {/* Background track */}
      <div className="absolute inset-0 w-[2px] bg-term-border" />

      {/* Animated progress beam */}
      <motion.div
        className={cn(
          'absolute left-0 top-0 w-[2px] origin-top h-full bg-term-accent',
          className
        )}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progress }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </>
  );
}
