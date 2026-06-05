'use client';

import React from 'react';
import { Badge } from '../lib/badges';

interface BadgeCardProps {
  badge: Badge;
  isUnlocked: boolean;
}

export default function BadgeCard({ badge, isUnlocked }: BadgeCardProps) {
  return (
    <div
      className={`glass p-4 flex flex-col items-center gap-2.5 text-center transition-all duration-300 relative overflow-hidden select-none border ${
        isUnlocked
          ? 'border-amber-500/20 bg-amber-500/5 hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]'
          : 'border-white/5 bg-white/2 opacity-50 grayscale'
      }`}
    >
      {/* Background radial glow for unlocked badges */}
      {isUnlocked && (
        <div className="absolute -inset-10 bg-radial from-amber-500/10 to-transparent blur-xl pointer-events-none" />
      )}

      {/* Icon Badge container */}
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md transition-transform duration-300 ${
        isUnlocked 
          ? 'bg-amber-500/10 border border-amber-500/25 text-amber-500 scale-110 shadow-amber-500/10' 
          : 'bg-white/5 border border-white/10 text-text-secondary'
      }`}>
        {badge.icon}
      </div>

      <div className="flex flex-col gap-1 z-10">
        <h4 className="text-[11px] font-black uppercase tracking-wider text-text-primary leading-tight">
          {badge.name}
        </h4>
        <p className="text-[9px] font-semibold text-text-secondary leading-relaxed max-w-[120px]">
          {badge.description}
        </p>
      </div>

      {isUnlocked && (
        <span className="text-[8px] font-black text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider mt-0.5 z-10 leading-none select-none">
          Terbuka
        </span>
      )}
    </div>
  );
}
