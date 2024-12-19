import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface BeamContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function BeamContainer({ children, className }: BeamContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePosition.current = { x, y };
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn('relative overflow-hidden', className)}>
      <motion.div
        className="pointer-events-none absolute inset-0 z-30 transition duration-300"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
        animate={{
          '--mouse-x': `${mousePosition.current.x}px`,
          '--mouse-y': `${mousePosition.current.y}px`,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          restDelta: 0.001,
        }}
      />
      {children}
    </div>
  );
}