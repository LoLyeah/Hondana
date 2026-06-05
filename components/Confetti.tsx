'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: string;
  color: string;
  size: number;
  shape: 'circle' | 'square' | 'triangle';
  delay: string;
  duration: string;
  tilt: string;
}

const COLORS = [
  '#fbbf24', // Gold
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Violet
  '#3b82f6', // Blue
  '#10b981', // Emerald
];

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setShouldRender(false);
      return;
    }

    const list: Particle[] = [];
    for (let i = 0; i < 70; i++) {
      const size = Math.random() * 8 + 6; // 6px to 14px
      const shapeRand = Math.random();
      const shape = shapeRand < 0.33 ? 'circle' : shapeRand < 0.66 ? 'square' : 'triangle';
      
      list.push({
        id: i,
        left: `${Math.random() * 100}%`,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size,
        shape,
        delay: `${Math.random() * 0.6}s`,
        duration: `${Math.random() * 1.5 + 1.5}s`, // 1.5s to 3.0s
        tilt: `${Math.random() * 360}deg`,
      });
    }
    setParticles(list);
  }, []);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden select-none">
      {particles.map((p) => {
        let borderStyles = {};
        if (p.shape === 'triangle') {
          borderStyles = {
            borderLeft: `${p.size / 2}px solid transparent`,
            borderRight: `${p.size / 2}px solid transparent`,
            borderBottom: `${p.size}px solid ${p.color}`,
            width: 0,
            height: 0,
            backgroundColor: 'transparent',
          };
        } else {
          borderStyles = {
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.shape === 'circle' ? '50%' : '2px',
          };
        }

        return (
          <div
            key={p.id}
            className="absolute top-[-20px]"
            style={{
              left: p.left,
              animationName: 'confetti-fall',
              animationTimingFunction: 'linear',
              animationFillMode: 'both',
              animationDelay: p.delay,
              animationDuration: p.duration,
              transform: `rotate(${p.tilt})`,
              ...borderStyles,
            }}
          />
        );
      })}
    </div>
  );
}
