'use client';

import React, { useEffect, useRef } from 'react';

interface LevelUpModalProps {
  show: boolean;
  level: number;
  oldLevel: number;
  onClose: () => void;
}

export default function LevelUpModal({ show, level, oldLevel, onClose }: LevelUpModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (show) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [show]);

  if (!show) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="glass-elevated border border-white/12 max-w-[400px] w-[90%] rounded-3xl p-6 text-center text-text-primary backdrop:backdrop-blur-md backdrop:bg-black/40 outline-none animate-float z-50 overflow-visible"
    >
      {/* Decorative Confetti Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
        {Array.from({ length: 15 }).map((_, idx) => {
          const delay = idx * 0.1;
          const left = idx * 7;
          return (
            <span
              key={idx}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${left}%`,
                top: `-20px`,
                backgroundColor: idx % 3 === 0 ? 'var(--accent)' : idx % 3 === 1 ? 'var(--tpa-accent)' : 'var(--success)',
                animation: `confetti-fall 1.5s ease-out infinite`,
                animationDelay: `${delay}s`
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-col items-center gap-4 relative z-10">
        {/* Celebration Trophy */}
        <span className="text-6xl animate-bounce">🏆</span>

        <span className="text-[10px] font-black uppercase tracking-widest text-accent">LEVEL UP CELEBRATION</span>
        <h2 className="text-2xl font-black tracking-tight leading-none">Selamat, Anda Naik Level!</h2>

        <p className="text-sm font-semibold text-text-secondary leading-relaxed">
          Kerja keras Anda membuahkan hasil. Tingkat kemampuan analisis Anda kini terus berkembang!
        </p>

        {/* Level Transition Indicator */}
        <div className="flex items-center justify-center gap-6 my-4 w-full">
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-text-secondary">LEVEL</span>
            <span className="text-3xl font-black text-text-secondary/50">{oldLevel}</span>
          </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>

          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-accent">LEVEL</span>
            <span className="text-4xl font-black text-accent">{level}</span>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-accent hover:bg-accent-hover text-white text-sm font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
        >
          Lanjutkan Latihan
        </button>
      </div>
    </dialog>
  );
}
