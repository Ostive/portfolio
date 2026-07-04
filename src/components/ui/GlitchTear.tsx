import { useEffect, useState } from 'react';

export function GlitchTear() {
  const [tear, setTear] = useState<{ top: string; height: number } | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = (delay: number) => {
      timeout = setTimeout(() => {
        setTear({ top: `${Math.random() * 90}%`, height: 4 + Math.random() * 10 });
        setTimeout(() => setTear(null), 180);
        cycle(12000 + Math.random() * 16000);
      }, delay);
    };

    cycle(5000);
    return () => clearTimeout(timeout);
  }, []);

  if (!tear) return null;

  return (
    <div
      className="glitch-tear fixed left-0 right-0 z-30 pointer-events-none"
      style={{ top: tear.top, height: tear.height }}
    />
  );
}
