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
      <div className="absolute inset-0 w-[3px] rounded-full bg-gray-700/30" />

      {/* Animated progress beam */}
      <motion.div
        className={cn(
          'absolute left-0 top-0 w-[3px] rounded-full origin-top h-full',
          className
        )}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progress }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          background: 'linear-gradient(180deg, rgb(99 102 241) 0%, rgb(168 85 247) 100%)',
        }}
      />

      {/* Glow effect following the tip */}
      <motion.div
        className="absolute left-0 w-[40px] h-[40px] -translate-x-1/2 rounded-full"
        style={{
          top: `${progress * 100}%`,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: progress > 0 ? 1 : 0 }}
      />
    </>
  );
}