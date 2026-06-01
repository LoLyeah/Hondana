'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../context/QuizContext';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ title, showBack = false, onBack }: HeaderProps) {
  const router = useRouter();
  const { stats } = useQuiz();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-text-primary flex items-center justify-center"
            aria-label="Kembali"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}
        <h1 className="text-lg font-bold bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* XP Badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/8">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-semibold text-text-secondary">Lvl {stats.level}</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-xs font-bold text-accent">{stats.totalXP} XP</span>
        </div>
      </div>
    </header>
  );
}
