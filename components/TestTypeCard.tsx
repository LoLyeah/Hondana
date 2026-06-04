'use client';

import React, { memo } from 'react';

interface TestTypeCardProps {
  type: 'TPA' | 'TBI';
  title: string;
  description: string;
  subcategories: string[];
  onClick: () => void;
}

export default memo(function TestTypeCard({
  type,
  title,
  description,
  subcategories,
  onClick
}: TestTypeCardProps) {
  const isTPA = type === 'TPA';
  const glowStyle = isTPA ? 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:border-amber-500/30' : 'hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30';
  const accentColor = isTPA ? 'text-amber-500 bg-amber-500/10' : 'text-cyan-500 bg-cyan-500/10';
  const dotColor = isTPA ? 'bg-amber-500' : 'bg-cyan-500';

  return (
    <button
      onClick={onClick}
      className={`w-full text-left glass p-6 flex flex-col gap-4 cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 ${glowStyle}`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Module Icon and Label */}
        <div className="flex items-center gap-3">
          <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${accentColor}`}>
            {isTPA ? '📝' : '🌐'}
          </span>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary">MODUL TES</span>
            <h2 className="text-xl font-black tracking-tight">{title}</h2>
          </div>
        </div>

        {/* Action Arrow */}
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center border border-white/5 bg-white/5`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4 text-text-secondary"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm font-semibold text-text-secondary leading-relaxed">
        {description}
      </p>

      <div className="w-full h-px bg-white/5" />

      {/* Subcategories list */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {subcategories.map((sub, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-xs font-bold text-text-secondary">
            <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
            <span>{sub}</span>
          </div>
        ))}
      </div>
    </button>
  );
});
