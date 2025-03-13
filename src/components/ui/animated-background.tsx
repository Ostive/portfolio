import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  particleCount?: number;
  particleColor?: string;
  baseColor?: string;
  highlightColor?: string;
}

export function AnimatedBackground({
  className = '',
  particleCount = 50,
  particleColor = 'rgba(99, 102, 241, 0.4)',
  baseColor = 'rgba(17, 24, 39, 1)',
  highlightColor = 'rgba(79, 70, 229, 0.4)'
}: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Make canvas taller than viewport to cover scrolling
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          pulseDirection: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(17, 24, 39, 1)');
      gradient.addColorStop(0.5, 'rgba(17, 24, 39, 0.95)');
      gradient.addColorStop(1, 'rgba(17, 24, 39, 0.9)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle noise texture
      for (let i = 0; i < canvas.width * canvas.height * 0.001; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5;
        const opacity = Math.random() * 0.05;
        
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, size, size);
      }

      // Draw animated gradient overlay
      const time = Date.now() * 0.0002;
      const overlayGradient = ctx.createRadialGradient(
        canvas.width * (0.5 + Math.sin(time) * 0.2),
        canvas.height * (0.3 + Math.cos(time * 0.7) * 0.1),
        0,
        canvas.width * 0.5,
        canvas.height * 0.3,
        canvas.width * 0.8
      );
      overlayGradient.addColorStop(0, 'rgba(79, 70, 229, 0.15)');
      overlayGradient.addColorStop(0.5, 'rgba(79, 70, 229, 0.05)');
      overlayGradient.addColorStop(1, 'rgba(17, 24, 39, 0)');
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a second gradient for visual interest
      const secondGradient = ctx.createRadialGradient(
        canvas.width * (0.7 + Math.cos(time * 1.3) * 0.1),
        canvas.height * (0.7 + Math.sin(time) * 0.1),
        0,
        canvas.width * 0.7,
        canvas.height * 0.7,
        canvas.width * 0.6
      );
      secondGradient.addColorStop(0, 'rgba(139, 92, 246, 0.1)');
      secondGradient.addColorStop(1, 'rgba(17, 24, 39, 0)');
      ctx.fillStyle = secondGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Pulse opacity
        particle.opacity += 0.003 * particle.pulseDirection;
        if (particle.opacity > 0.6) {
          particle.pulseDirection = -1;
        } else if (particle.opacity < 0.2) {
          particle.pulseDirection = 1;
        }

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor.replace(')', `, ${particle.opacity})`);
        ctx.fill();

        // Connect particles that are close to each other
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x;
          const dy = particles[j].y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    // Update canvas position on scroll to create parallax effect
    const handleScroll = () => {
      if (canvas) {
        canvas.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll);
    resizeCanvas();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount, particleColor, baseColor, highlightColor]);

  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Consistent gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/30 to-gray-950/70" />
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
