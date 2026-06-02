'use client';

import React from 'react';

interface QuizOptionProps {
  text: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean | null; // null = unrevealed, true = correct, false = incorrect
  onClick: () => void;
  disabled?: boolean;
  isFigural?: boolean; // TPA figural question option uses SVG
}

export default function QuizOption({
  text,
  index,
  isSelected,
  isCorrect,
  onClick,
  disabled = false,
  isFigural = false
}: QuizOptionProps) {
  const optionLetter = String.fromCharCode(65 + index); // A, B, C, D, E

  // Class names for different visual states
  let cardStyle = 'border-white/8 bg-white/4 text-text-primary hover:bg-white/7 hover:border-white/12';
  let badgeStyle = 'bg-white/10 text-text-secondary';

  if (isSelected && isCorrect === null) {
    cardStyle = 'border-accent/40 bg-accent/15 text-accent shadow-[0_0_15px_rgba(95,99,242,0.15)]';
    badgeStyle = 'bg-accent text-white';
  } else if (isCorrect === true) {
    cardStyle = 'border-success/40 bg-success/15 text-success shadow-[0_0_15px_rgba(112,185,160,0.15)] animate-correct';
    badgeStyle = 'bg-success text-white';
  } else if (isSelected && isCorrect === false) {
    cardStyle = 'border-error/40 bg-error/15 text-error shadow-[0_0_15px_rgba(255,87,87,0.15)] animate-wrong';
    badgeStyle = 'bg-error text-white';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center gap-4 p-4 text-left border rounded-2xl cursor-pointer active:scale-[0.99] transition-all duration-200 outline-none ${cardStyle} disabled:cursor-not-allowed`}
    >
      {/* Option Key Badge */}
      <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all ${badgeStyle}`}>
        {optionLetter}
      </span>

      {/* Content */}
      <div className="flex-1 text-sm font-semibold leading-relaxed">
        {isFigural ? (
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        ) : (
          <span>{text}</span>
        )}
      </div>
    </button>
  );
}
