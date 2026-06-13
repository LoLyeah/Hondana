'use client';

import React, { memo, useMemo } from 'react';
import AnimatedCounter from './AnimatedCounter';

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
    ? 'border-amber-500/20 shadow-[0_4px_24px_oklch(from_var(--tpa-accent)_l_c_h_/_0.03)]' 
    : isTBI 
    ? 'border-cyan-500/20 shadow-[0_4px_24px_oklch(from_var(--tbi-accent)_l_c_h_/_0.03)]' 
    : 'border-white/8';

  const displayValue = useMemo(() => {
    if (typeof value === 'number') {
      return <AnimatedCounter value={value} />;
    }
    
    if (typeof value === 'string' && value.endsWith('%')) {
      const num = parseInt(value.slice(0, -1), 10);
      if (!isNaN(num)) {
        return (
          <>
            <AnimatedCounter value={num} />
            <span>%</span>
          </>
        );
      }
    }
    
    if (typeof value === 'string' && value.endsWith('s')) {
      // Check if it has the "Xm Ys" format
      const match = value.match(/^(\d+)m\s+(\d+)s$/);
      if (match) {
        const m = parseInt(match[1], 10);
        const s = parseInt(match[2], 10);
        return (
          <>
            <AnimatedCounter value={m} />
            <span className="ml-0.5 text-2xl font-bold text-text-secondary">m</span>
            <span className="ml-2">
              <AnimatedCounter value={s} />
            </span>
            <span className="ml-0.5 text-2xl font-bold text-text-secondary">s</span>
          </>
        );
      }

      // Check if it's a simple "Ys" format
      const matchSeconds = value.match(/^(\d+)s$/);
      if (matchSeconds) {
        const s = parseInt(matchSeconds[1], 10);
        return (
          <>
            <AnimatedCounter value={s} />
            <span className="ml-0.5 text-2xl font-bold text-text-secondary">s</span>
          </>
        );
      }
    }
    
    return value;
  }, [value]);

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
          {displayValue}
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
