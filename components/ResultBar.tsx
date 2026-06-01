'use client';

import React from 'react';

interface ResultBarProps {
  label: string;
  correct: number;
  total: number;
  type: 'TPA' | 'TBI';
}

export default function ResultBar({ label, correct, total, type }: ResultBarProps) {
  const isTPA = type === 'TPA';
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  
  const barBg = isTPA ? 'bg-amber-500' : 'bg-cyan-500';
  const accentColor = isTPA ? 'text-amber-500' : 'text-cyan-500';
  const containerBg = isTPA ? 'bg-amber-500/10' : 'bg-cyan-500/10';

  return (
    <div className="w-full flex flex-col gap-1.5 py-1">
      {/* Label and statistics */}
      <div className="flex items-center justify-between text-xs font-bold leading-none">
        <span className="text-text-primary uppercase tracking-tight">{label}</span>
        <span className={accentColor}>
          {correct}/{total} ({percentage}%)
        </span>
      </div>

      {/* Progress container and fill bar */}
      <div className={`h-2.5 w-full ${containerBg} rounded-full overflow-hidden`}>
        <div
          className={`h-full ${barBg} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
