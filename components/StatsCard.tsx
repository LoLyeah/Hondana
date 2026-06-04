'use client';

import React, { memo } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  desc?: string;
  accent?: 'default' | 'tpa' | 'tbi';
}

export default memo(function StatsCard({
  title,
  value,
  icon,
  desc,
  accent = 'default'
}: StatsCardProps) {
  const isTPA = accent === 'tpa';
  const isTBI = accent === 'tbi';
  
  const borderHighlight = isTPA 
    ? 'border-amber-500/20 shadow-[0_4px_24px_rgba(245,158,11,0.03)]' 
    : isTBI 
    ? 'border-cyan-500/20 shadow-[0_4px_24px_rgba(6,182,212,0.03)]' 
    : 'border-white/8';

  const accentColor = isTPA ? 'text-amber-500' : isTBI ? 'text-cyan-500' : 'text-accent';

  return (
    <div className={`glass p-5 flex flex-col gap-2 relative ${borderHighlight}`}>
      {/* Title & Icon */}
      <div className="flex items-center justify-between w-full">
        <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
          {title}
        </span>
        <span className="text-xl" aria-hidden="true">{icon}</span>
      </div>

      {/* Numeric value with optional spring animation trigger */}
      <div className="flex items-baseline gap-1.5 mt-1">
        <span className="text-3xl font-black tracking-tight leading-none text-text-primary">
          {value}
        </span>
        {isTPA && <span className="text-xs font-bold text-amber-500/80">TPA</span>}
        {isTBI && <span className="text-xs font-bold text-cyan-500/80">TBI</span>}
      </div>

      {/* Optional desc */}
      {desc && (
        <span className="text-[10px] font-bold text-text-secondary mt-1 block leading-none">
          {desc}
        </span>
      )}
    </div>
  );
});
