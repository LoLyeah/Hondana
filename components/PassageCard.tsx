'use client';

import React, { useState } from 'react';

interface PassageCardProps {
  passage: string;
}

export default function PassageCard({ passage }: PassageCardProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full glass border border-white/8 bg-white/2 rounded-2xl overflow-hidden transition-all duration-300">
      {/* Header / Summary bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between border-b border-white/5 bg-white/1 cursor-pointer outline-none"
      >
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
          <span className="text-xs font-bold tracking-wider text-text-secondary uppercase">READING PASSAGE / BACAAN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-accent uppercase">
            {isOpen ? 'Sembunyikan' : 'Tampilkan'}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className={`w-3.5 h-3.5 text-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </button>

      {/* Body content with smooth height toggle */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[350px] p-5 overflow-y-auto border-t-0' : 'max-h-0 overflow-hidden'
        }`}
      >
        {passage.split(/\r?\n/).map((paragraph, index) => {
          const trimmed = paragraph.trim();
          if (!trimmed) return null;
          return (
            <p
              key={index}
              className="text-sm leading-relaxed text-text-primary text-justify mb-4 last:mb-0"
            >
              {trimmed}
            </p>
          );
        })}
      </div>
    </div>
  );
}
