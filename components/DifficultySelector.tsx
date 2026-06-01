'use client';

import React from 'react';
import { Difficulty } from '../lib/types';

interface DifficultySelectorProps {
  selected: Difficulty;
  onChange: (value: Difficulty) => void;
}

export default function DifficultySelector({ selected, onChange }: DifficultySelectorProps) {
  const options: { value: Difficulty; label: string; desc: string }[] = [
    { value: 'mudah', label: 'Mudah', desc: '10 XP / benar' },
    { value: 'sedang', label: 'Sedang', desc: '20 XP / benar' },
    { value: 'sulit', label: 'Sulit', desc: '30 XP / benar' }
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary ml-1">
        TINGKAT KESULITAN
      </span>
      <div className="relative w-full flex items-center bg-white/4 border border-white/8 rounded-2xl p-1.5 overflow-hidden">
        {/* Sliding Indicator Pill */}
        <div
          className="absolute top-1.5 bottom-1.5 left-1.5 rounded-xl bg-accent/15 border border-accent/20 transition-all duration-300 ease-out z-0"
          style={{
            width: 'calc(33.333% - 8px)',
            transform: `translateX(${
              selected === 'mudah' ? '0%' : selected === 'sedang' ? '100%' : '200%'
            }) translateX(${
              selected === 'mudah' ? '0px' : selected === 'sedang' ? '8px' : '16px'
            })`
          }}
        />

        {options.map((opt) => {
          const isActive = selected === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 z-10 cursor-pointer transition-all duration-300 outline-none ${
                isActive ? 'text-accent' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <span className="text-sm font-bold tracking-tight">{opt.label}</span>
              <span className={`text-[9px] font-medium leading-none ${isActive ? 'text-accent/80' : 'text-text-secondary/60'}`}>
                {opt.desc}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
