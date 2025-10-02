'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface ParticleBackgroundProps {
  particleCount?: number;
  className?: string;
}

const createParticleSystem = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  particleCount: number
) => {
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
  }> = [];

  const colors = ['#3b82f6', '#8b5cf6', '#06b6d4'] as const;

  const resizeCanvas = () => {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  const initParticles = () => {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  };

  const updateAndDrawParticles = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      ctx.save();
      ctx.globalAlpha = particle.opacity;
      const color = colors[index % colors.length];
      if (color) {
        ctx.fillStyle = color;
      }
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(updateAndDrawParticles);
  };

  return { resizeCanvas, initParticles, updateAndDrawParticles };
};

const useParticleAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  particleCount: number
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      return;
    }

    const { resizeCanvas, initParticles, updateAndDrawParticles } = createParticleSystem(
      canvas,
      ctx,
      particleCount
    );

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    resizeCanvas();
    initParticles();
    updateAndDrawParticles();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, particleCount]);
};

export const ParticleBackground = ({
  particleCount = 30,
  className = '',
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useParticleAnimation(canvasRef, particleCount);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      aria-hidden='true'
    />
  );
};

export default ParticleBackground;
