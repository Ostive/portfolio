import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

interface ParallaxCardProps {
  children: React.ReactNode;
  className?: string;
}

export function ParallaxCard({ children, className }: ParallaxCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn('relative', className)}
    >
      {children}
    </motion.div>
  );
}