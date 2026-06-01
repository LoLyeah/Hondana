'use client';

import React from 'react';

interface ProgressBarProps {
  currentIndex: number;
  total: number;
  answers: (number | null)[];
}

export default function ProgressBar({ currentIndex, total, answers }: ProgressBarProps) {
  const percentage = ((currentIndex) / total) * 100;

  // For small quizzes (<= 15 questions), render individual segmented dots
  const isSmallQuiz = total <= 15;

  return (
    <div className="w-full flex flex-col gap-2 px-1">
      <div className="flex items-center justify-between text-xs font-bold text-text-secondary">
        <span>SOAL {currentIndex + 1} DARI {total}</span>
        <span>{Math.round(percentage)}% SELESAI</span>
      </div>

      {isSmallQuiz ? (
        <div className="flex items-center gap-1.5 w-full">
          {Array.from({ length: total }).map((_, idx) => {
            const isCompleted = answers[idx] !== null;
            const isActive = idx === currentIndex;
            
            return (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full active-dot-scale transition-all duration-350 ${
                  isActive
                    ? 'bg-accent scale-y-125'
                    : isCompleted
                    ? 'bg-accent/40'
                    : 'bg-white/10'
                }`}
              />
            );
          })}
        </div>
      ) : (
        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  );
}
