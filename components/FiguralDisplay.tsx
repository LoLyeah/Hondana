'use client';

import React from 'react';

interface FiguralDisplayProps {
  figures: string[];
}

export default function FiguralDisplay({ figures }: FiguralDisplayProps) {
  return (
    <div className="w-full glass border border-white/8 p-5 flex flex-col items-center justify-center gap-4 bg-white/2 rounded-2xl">
      <div className="w-full flex items-center justify-center gap-3 md:gap-4">
        {/* Render series figures */}
        {figures.map((svg, idx) => (
          <React.Fragment key={idx}>
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 border border-white/10 bg-white/4 rounded-xl flex items-center justify-center p-2"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
            {idx < figures.length - 1 && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 text-text-secondary shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </React.Fragment>
        ))}

        {/* Question mark block */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-4 h-4 text-text-secondary shrink-0"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>

        <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-accent/40 bg-accent/5 rounded-xl flex items-center justify-center select-none animate-pulse">
          <span className="text-xl font-black text-accent">?</span>
        </div>
      </div>
    </div>
  );
}
