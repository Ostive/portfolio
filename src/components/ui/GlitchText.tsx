import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const scheduleGlitch = () => {
      const delay = 6000 + Math.random() * 8000;
      timeout = setTimeout(() => {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 350);
        scheduleGlitch();
      }, delay);
    };

    scheduleGlitch();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <span
      className={`glitch-text ${glitching ? 'is-glitching' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
}
