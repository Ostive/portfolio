import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TimelineBeamProps {
  className?: string;
}

export function TimelineBeam({ className }: TimelineBeamProps) {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const dotProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      {/* Background track */}
      <div className="absolute inset-0 w-[2px] bg-gray-700/50" />

      {/* Animated progress beam */}
      <motion.div
        className={cn(
          'absolute left-0 top-0 w-[2px] origin-top',
          className
        )}
        style={{ 
          height: '100%',
          scaleY,
          opacity,
          background: 'linear-gradient(180deg, rgb(99 102 241) 0%, rgb(168 85 247) 100%)',
        }}
      />

      {/* Glow effect */}
      <motion.div
        className="absolute left-0 top-0 w-[20px] h-full -translate-x-1/2"
        style={{
          opacity: glowOpacity,
          background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.2) 50%, transparent 100%)',
          filter: 'blur(8px)',
        }}
      />

      {/* Sliding dot indicator */}
      <motion.div
        className="absolute left-[1px] -translate-x-1/2 z-10"
        style={{ top: dotProgress }}
      >
        {/* Inner dot */}
        <motion.div 
          className="h-3 w-3 rounded-full bg-indigo-500" 
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          style={{ boxShadow: '0 0 20px 4px rgb(99 102 241)' }} 
        />
        {/* Outer glow */}
        <div className="absolute top-0 left-0 h-3 w-3 rounded-full bg-indigo-400 animate-ping" />
      </motion.div>
    </>
  );
}