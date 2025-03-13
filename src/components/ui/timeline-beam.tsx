import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimelineBeamProps {
  className?: string;
}

export function TimelineBeam({ className }: TimelineBeamProps) {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  // Always show the full beam regardless of scroll position
  const scaleY = 1;
  const opacity = 1;
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  return (
    <>
      {/* Background track */}
      <div className="absolute inset-0 w-[3px] rounded-full bg-gray-700/50" />

      {/* Animated progress beam */}
      <motion.div
        className={cn(
          'absolute left-0 top-0 w-[3px] rounded-full origin-top h-full',
          className
        )}
        style={{ 
          scaleY,
          opacity,
          background: 'linear-gradient(180deg, rgb(99 102 241) 0%, rgb(168 85 247) 100%)',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute left-0 top-0 w-[30px] h-full -translate-x-1/2"
        style={{
          opacity: glowOpacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.4) 50%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />
    </>
  );
}