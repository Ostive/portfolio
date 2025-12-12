import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the pull is. Default 30
    onClick?: () => void;
    href?: string;
}

export function MagneticButton({ children, className, strength = 30, onClick, href }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        const pullFactor = strength / 100;
        setPosition({ x: x * pullFactor, y: y * pullFactor });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const animatedX = useSpring(x, springConfig);
    const animatedY = useSpring(y, springConfig);

    const Content = (
        <motion.div
            ref={ref}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: animatedX, y: animatedY }}
            onClick={onClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
        >
            {children}
        </motion.div>
    );

    if (href) {
        return <a href={href} className="inline-block">{Content}</a>;
    }

    return Content;
}
