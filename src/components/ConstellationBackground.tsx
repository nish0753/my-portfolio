import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  pulseSpeed: number;
  colorType: 'primary' | 'secondary' | 'neutral';
}

interface FloatingTechTag {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  targetAlpha: number;
  fadeTimer: number;
}

const TECH_TAGS = [
  'PyTorch', 'RAG', 'LLMs', 'LangGraph', 'FastAPI', 'Whisper', 'Kubernetes',
  'Vector DB', 'Transformers', 'CUDA', 'Docker', 'Next.js', 'vLLM', 'LangChain',
];

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Track scroll to hide background past the first screen (Hero section)
    let opacityMultiplier = 1;
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;
      opacityMultiplier = Math.max(0, 1 - scrollY / (heroHeight * 0.8));
      if (canvas) {
        canvas.style.opacity = (opacityMultiplier * 0.85).toFixed(2);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Color definitions per theme
    const getColorPalette = () => {
      if (theme === 'light') {
        return {
          primary: 'rgba(194, 65, 12, ', // Terracotta
          secondary: 'rgba(14, 116, 144, ', // Teal
          line: 'rgba(194, 65, 12, ',
          text: 'rgba(61, 54, 43, ',
          tagBg: 'rgba(250, 243, 225, 0.7)',
          tagBorder: 'rgba(26, 22, 16, 0.15)',
        };
      }
      if (theme === 'cyber') {
        return {
          primary: 'rgba(78, 255, 150, ', // Neon Green
          secondary: 'rgba(255, 16, 240, ', // Neon Magenta
          line: 'rgba(78, 255, 150, ',
          text: 'rgba(138, 255, 184, ',
          tagBg: 'rgba(5, 13, 16, 0.7)',
          tagBorder: 'rgba(78, 255, 150, 0.3)',
        };
      }
      // Dark Theme (default)
      return {
        primary: 'rgba(245, 158, 11, ', // Amber
        secondary: 'rgba(6, 182, 212, ', // Cyan
        line: 'rgba(245, 158, 11, ',
        text: 'rgba(201, 193, 173, ',
        tagBg: 'rgba(20, 18, 14, 0.75)',
        tagBorder: 'rgba(240, 234, 214, 0.15)',
      };
    };

    // Instantiate Particles — Slower movement speed for calm background feel
    const particleCount = Math.min(Math.floor((width * height) / 15000), 65);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18, // Reduced speed (~50% slower)
        vy: (Math.random() - 0.5) * 0.18, // Reduced speed (~50% slower)
        radius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.4 + 0.2,
        pulseSpeed: 0.003 + Math.random() * 0.005, // Slower pulse
        colorType: Math.random() > 0.6 ? 'secondary' : Math.random() > 0.3 ? 'primary' : 'neutral',
      });
    }

    // Instantiate Floating Tech Tags (Ambient Pills) — Slower drift
    const tagCount = 7;
    const tags: FloatingTechTag[] = [];
    for (let i = 0; i < tagCount; i++) {
      tags.push({
        text: TECH_TAGS[i % TECH_TAGS.length],
        x: Math.random() * (width - 150) + 75,
        y: Math.random() * (height - 150) + 75,
        vx: (Math.random() - 0.5) * 0.1, // Slow drift
        vy: (Math.random() - 0.5) * 0.1, // Slow drift
        alpha: Math.random() * 0.35 + 0.1,
        targetAlpha: Math.random() * 0.45 + 0.15,
        fadeTimer: Math.random() * 300,
      });
    }

    // Main Render Loop
    const render = () => {
      // Pause rendering if completely scrolled off the Hero section
      if (opacityMultiplier > 0.01) {
        ctx.clearRect(0, 0, width, height);
        const palette = getColorPalette();

        // 1. Update and Draw Connecting Lines
        const maxDistance = 140;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDistance) {
              const lineAlpha = (1 - dist / maxDistance) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `${palette.line}${lineAlpha})`;
              ctx.lineWidth = 0.75;
              ctx.stroke();
            }
          }
        }

        // 2. Update and Draw Particles
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          p.alpha += p.pulseSpeed;
          if (p.alpha > 0.6 || p.alpha < 0.2) {
            p.pulseSpeed *= -1;
          }

          const colorPrefix =
            p.colorType === 'primary'
              ? palette.primary
              : p.colorType === 'secondary'
              ? palette.secondary
              : palette.text;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `${colorPrefix}${p.alpha})`;
          ctx.fill();

          if (p.colorType === 'primary' || p.colorType === 'secondary') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `${colorPrefix}${p.alpha * 0.15})`;
            ctx.fill();
          }
        });

        // 3. Update and Draw Floating Tech Tags
        tags.forEach((tag) => {
          tag.x += tag.vx;
          tag.y += tag.vy;

          if (tag.x < 50 || tag.x > width - 100) tag.vx *= -1;
          if (tag.y < 50 || tag.y > height - 50) tag.vy *= -1;

          tag.fadeTimer++;
          if (tag.fadeTimer > 350) {
            tag.targetAlpha = Math.random() * 0.4 + 0.15;
            tag.fadeTimer = 0;
          }
          tag.alpha += (tag.targetAlpha - tag.alpha) * 0.015;

          ctx.save();
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.letterSpacing = '0.08em';
          const textMetrics = ctx.measureText(tag.text.toUpperCase());
          const paddingX = 10;
          const paddingY = 5;
          const bgWidth = textMetrics.width + paddingX * 2;
          const bgHeight = 20;

          ctx.beginPath();
          ctx.roundRect(tag.x - paddingX, tag.y - 12, bgWidth, bgHeight, 10);
          ctx.fillStyle = palette.tagBg;
          ctx.fill();
          ctx.strokeStyle = palette.tagBorder;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          ctx.fillStyle = `${palette.text}${tag.alpha})`;
          ctx.fillText(tag.text.toUpperCase(), tag.x, tag.y);
          ctx.restore();
        });
      } else {
        ctx.clearRect(0, 0, width, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: 0.85 }}
    />
  );
}
