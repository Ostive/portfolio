import { useEffect, useState } from 'react';

const GLYPHS = '01ｱｲｳｴｵ$#%&@!?<>[]{}'.split('');

function randomGlyphs(length: number) {
  return Array.from({ length }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join('');
}

const SPOTS = [
  { top: '18%', left: '6%' },
  { top: '62%', left: '88%' },
  { top: '40%', left: '48%' },
];

function Anomaly({ top, left, initialDelay }: { top: string; left: string; initialDelay: number }) {
  const [glyphs, setGlyphs] = useState<string | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const cycle = (delay: number) => {
      timeout = setTimeout(() => {
        setGlyphs(randomGlyphs(4 + Math.floor(Math.random() * 4)));
        setTimeout(() => setGlyphs(null), 280);
        cycle(9000 + Math.random() * 14000);
      }, delay);
    };

    cycle(initialDelay);
    return () => clearTimeout(timeout);
  }, [initialDelay]);

  if (!glyphs) return null;

  return (
    <div
      className="glitch-anomaly fixed z-30 pointer-events-none font-mono text-xs tracking-widest hidden md:block"
      style={{ top, left }}
    >
      {glyphs}
    </div>
  );
}

export function GlitchAnomalies() {
  return (
    <>
      {SPOTS.map((spot, index) => (
        <Anomaly key={index} top={spot.top} left={spot.left} initialDelay={index * 4000} />
      ))}
    </>
  );
}
