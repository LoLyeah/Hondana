'use client';

import React, { memo } from 'react';

interface CategoryCardProps {
  title: string;
  type: 'TPA' | 'TBI';
  correct: number;
  total: number;
  seenCount?: number;
  totalInBank?: number;
  onClick: () => void;
}

export default memo(function CategoryCard({
  title,
  type,
  correct,
  total,
  seenCount = 0,
  totalInBank = 0,
  onClick
}: CategoryCardProps) {
  const isTPA = type === 'TPA';
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  const accentColor = isTPA ? 'text-amber-500' : 'text-cyan-500';
  const strokeColor = isTPA ? 'stroke-amber-500' : 'stroke-cyan-500';
  const ringBg = isTPA ? 'bg-amber-500/10' : 'bg-cyan-500/10';
  const hoverBorder = isTPA ? 'hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(245,158,11,0.08)]' : 'hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.08)]';

  // SVG ring variables
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <button
      onClick={onClick}
      className={`w-full text-left glass p-4 flex items-center justify-between gap-4 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 category-card-stack ${hoverBorder}`}
    >
      <div className="flex flex-col gap-1 min-w-0">
        <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
          {type} SUB-KATEGORI
        </span>
        <h3 className="text-sm font-bold truncate text-text-primary leading-tight">
          {title}
        </h3>
        <span className="text-xs font-semibold text-text-secondary">
          {total > 0 ? `${correct} dari ${total} Benar` : 'Belum pernah dilatih'}
          {totalInBank > 0 && (
            <span className="text-[10px] text-text-secondary/50 block mt-0.5">
              Progress: {seenCount}/{totalInBank} Soal ({Math.round((seenCount / totalInBank) * 100)}% Terjawab)
            </span>
          )}
        </span>
      </div>

      {/* Dynamic Conic Progress Ring */}
      <div className="relative shrink-0 flex items-center justify-center w-12 h-12">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/5 fill-none"
            strokeWidth="3.5"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            className={`fill-none transition-all duration-500 ease-out ${strokeColor}`}
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <span className={`absolute text-[10px] font-bold ${accentColor}`}>
          {percentage}%
        </span>
      </div>
    </button>
  );
});
