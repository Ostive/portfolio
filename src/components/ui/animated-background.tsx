import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
}

export function AnimatedBackground({
  className = '',
  particleCount = 70,
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedX: number;
      speedY: number;
      opacity: number;
      pulseDirection: number;
      tier: 'bright' | 'dim';
    }> = [];

    // Shooting star properties
    let shootingStar = {
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      opacity: 0,
      active: false,
      angle: 0
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        // 20% bright particles, 80% dim
        const tier = Math.random() > 0.8 ? 'bright' : 'dim';

        particles.push({
          x: x,
          y: y,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          pulseDirection: Math.random() > 0.5 ? 1 : -1,
          tier: tier
        });
      }
    };

    const updateShootingStar = () => {
      if (!shootingStar.active && Math.random() < 0.005) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * canvas.width;
        shootingStar.y = Math.random() * (canvas.height / 2);
        shootingStar.length = Math.random() * 80 + 20;
        shootingStar.speed = Math.random() * 10 + 5;
        shootingStar.opacity = 1;
        shootingStar.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.5;
      }

      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.02;

        if (shootingStar.opacity <= 0 || shootingStar.x > canvas.width || shootingStar.y > canvas.height) {
          shootingStar.active = false;
        }
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020617'); // Slate 950
      gradient.addColorStop(0.5, '#0f172a'); // Slate 900
      gradient.addColorStop(1, '#020617'); // Slate 950
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1.5 Draw Moon / Intense Light Source
      const time = Date.now() * 0.001;
      const moonX = canvas.width * 0.8; // Top right positioning
      const moonY = 200; // Slightly lower for bigger moon

      // Breathing effect - slow sine wave for natural pulsing
      const breath = Math.sin(time * 0.5) * 0.05 + 1; // 0.95 to 1.05
      // Flicker effect - subtle faster shimmy for realism
      const flicker = (Math.sin(time * 3) + Math.cos(time * 7) * 0.3) * 0.02 + 1;

      // Outer Glow - Massive ambient light
      const moonGlow = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 1200 * breath);
      moonGlow.addColorStop(0, `rgba(199, 210, 254, ${0.2 * breath})`); // Bright indigo-white core
      moonGlow.addColorStop(0.4, `rgba(99, 102, 241, ${0.05 * breath})`); // Soft indigo wash
      moonGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = moonGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner Bright Moon - Bigger and brighter
      const moonSource = ctx.createRadialGradient(moonX, moonY, 0, moonX, moonY, 120 * flicker);
      moonSource.addColorStop(0, `rgba(255, 255, 255, ${0.92 + Math.sin(time * 5) * 0.03})`); // Blinding white center with slight twinkle
      moonSource.addColorStop(0.6, `rgba(165, 180, 252, ${0.4 * flicker})`); // Indigo halo
      moonSource.addColorStop(1, 'rgba(165, 180, 252, 0)');

      ctx.beginPath();
      ctx.fillStyle = moonSource;
      ctx.arc(moonX, moonY, 140 * flicker, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw Noise
      for (let i = 0; i < canvas.width * canvas.height * 0.0005; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.05})`;
        ctx.fillRect(x, y, 1, 1);
      }

      // 3. Update & Draw Shooting Star
      updateShootingStar();
      if (shootingStar.active) {
        const endX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const endY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const starGradient = ctx.createLinearGradient(shootingStar.x, shootingStar.y, endX, endY);
        starGradient.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.opacity})`);
        starGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = starGradient;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // 4. Update & Draw Particles
      particles.forEach((particle, i) => {
        // Movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Mouse Interaction
        const dxMouse = mouseRef.current.x - particle.x;
        const dyMouse = mouseRef.current.y - (particle.y - window.scrollY * 0.3);
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < 220) {
          const angle = Math.atan2(dyMouse, dxMouse);
          const force = (220 - distMouse) / 220;

          // Bright particles interact more strongly
          const strength = particle.tier === 'bright' ? 6 : 3;

          const pushX = Math.cos(angle) * force * strength;
          const pushY = Math.sin(angle) * force * strength;

          particle.x -= pushX;
          particle.y -= pushY;
        }

        // Pulsing
        if (particle.tier === 'bright') {
          particle.opacity += 0.01 * particle.pulseDirection;
          if (particle.opacity > 1) particle.pulseDirection = -1;
          else if (particle.opacity < 0.4) particle.pulseDirection = 1;
        } else {
          particle.opacity += 0.002 * particle.pulseDirection;
          if (particle.opacity > 0.5) particle.pulseDirection = -1;
          else if (particle.opacity < 0.1) particle.pulseDirection = 1;
        }

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw Particle
        ctx.beginPath();
        const pulseSize = particle.radius * (1 + Math.sin(Date.now() * (particle.tier === 'bright' ? 0.005 : 0.001) + i) * 0.3);
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);

        if (particle.tier === 'bright') {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.shadowBlur = 20;
          ctx.shadowColor = `rgba(165, 180, 255, ${particle.opacity})`;
        } else {
          ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Connections
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);

            const lineOpacity = particle.tier === 'bright' || particles[j].tier === 'bright' ? 0.25 : 0.05;
            ctx.strokeStyle = `rgba(129, 140, 248, ${lineOpacity * (1 - distance / 150)})`;
            ctx.lineWidth = particle.tier === 'bright' ? 0.8 : 0.4;
            ctx.stroke();
          }
        }
      });

      // 5. Draw Mouse Spotlight
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y - window.scrollY * 0.3;
      const spotlight = ctx.createRadialGradient(mx, my, 0, mx, my, 400);
      spotlight.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
      spotlight.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = spotlight;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    const handleScroll = () => {
      if (canvas) {
        canvas.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
    </div>
  );
}

export function FloatingParticles({
  className = '',
  count = 20,
  minSize = 4,
  maxSize = 15,
  minDuration = 25,
  maxDuration = 45,
  color = 'rgba(99, 102, 241, 0.15)'
}: {
  className?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
  color?: string;
}) {
  const particles = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * (maxSize - minSize) + minSize,
    x: Math.random() * 100,
    y: Math.random() * 200 - 50, // Position particles throughout a larger area
    duration: Math.random() * (maxDuration - minDuration) + minDuration
  }));

  return (
    <div className={`fixed inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: color,
            filter: 'blur(3px)'
          }}
          animate={{
            x: ['-20px', '20px', '-10px', '15px', '-5px', '0px'],
            y: ['-20px', '10px', '-15px', '20px', '-10px', '5px']
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}
