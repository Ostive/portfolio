import { useRef, useState } from 'react';

interface SectionSpotlightProps {
    children: React.ReactNode;
    className?: string;
    active?: boolean;
}

export function SectionSpotlight({ children, className = '', active = true }: SectionSpotlightProps) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        const div = divRef.current;
        const rect = div.getBoundingClientRect();

        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => {
        setOpacity(1);
    };

    const handleMouseLeave = () => {
        setOpacity(0);
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                style={{
                    opacity: active ? opacity : 0,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.1), transparent 40%)`,
                }}
            />

            {/* Static ambient glow at the top center of the section */}
            <div
                className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] -z-10"
                style={{
                    background: 'radial-gradient(circle at top, rgba(99, 102, 241, 0.15), transparent 70%)',
                    filter: 'blur(40px)',
                }}
            />

            {children}
        </div>
    );
}
