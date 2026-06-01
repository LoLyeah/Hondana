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
  const { settings, updateSettings } = useQuiz();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  const toggleTheme = () => {
    updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' });
  };

  return (
    <header className="sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 md:pl-60 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all text-text-primary flex items-center justify-center cursor-pointer min-h-0 min-w-0"
            style={{ minBlockSize: 0, minInlineSize: 0 }}
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
        <h1 className="text-lg font-black bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 active:scale-95 transition-all text-text-primary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0"
        style={{ minBlockSize: 0, minInlineSize: 0 }}
        aria-label="Toggle Theme"
      >
        <span className="text-sm select-none leading-none">
          {settings.theme === 'light' ? '🌙' : '☀️'}
        </span>
      </button>
    </header>
  );
}
