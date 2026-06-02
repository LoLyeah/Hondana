'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import { useQuiz } from '../context/QuizContext';
import { useFullscreen } from '../hooks/useFullscreen';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  noSidebar?: boolean;
  rightElement?: React.ReactNode;
}

export default function Header({ title, showBack = false, onBack, noSidebar = false, rightElement }: HeaderProps) {
  const router = useRouter();
  const { settings, updateSettings } = useQuiz();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

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
    <header
      className={`sticky top-0 z-40 w-full glass border-b border-white/8 backdrop-blur-md px-4 ${noSidebar ? '' : 'md:pl-60'} flex items-center justify-between`}
      style={{ paddingTop: 'calc(12px + env(safe-area-inset-top, 0px))', paddingBottom: '12px' }}
    >
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
        {title === 'Hondana' && (
          <img src="/icon-192.png" alt="Hondana Logo" className="w-6 h-6 rounded-md object-contain md:hidden shrink-0" />
        )}
        <h1 className="text-lg font-black bg-gradient-to-r from-[var(--text-primary)] to-[var(--text-secondary)] bg-clip-text text-transparent">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {rightElement}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 active:scale-95 transition-all text-text-primary flex items-center justify-center cursor-pointer outline-none min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
          aria-label="Toggle Fullscreen"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5M15 15l5.25 5.25" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
          )}
        </button>
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
      </div>
    </header>
  );
}
