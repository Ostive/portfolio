import React, { useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '../../lib/utils';

interface MouseParallaxProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How much it moves. default 20
}

export function MouseParallax({ children, className, strength = 20 }: MouseParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Calculate position relative to center of screen (-0.5 to 0.5)
        const xPos = (clientX / innerWidth) - 0.5;
        const yPos = (clientY / innerHeight) - 0.5;

        x.set(xPos);
        y.set(yPos);
    };

    const xMove = useTransform(mouseX, [-0.5, 0.5], [-strength, strength]);
    const yMove = useTransform(mouseY, [-0.5, 0.5], [-strength, strength]);

    return (
        <motion.div
            ref={ref}
            className={cn("w-full h-full", className)}
            onMouseMove={handleMouseMove}
            style={{
                x: xMove,
                y: yMove,
            }}
        >
            {children}
        </motion.div>
    );
}
