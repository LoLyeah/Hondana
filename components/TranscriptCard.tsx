'use client';

import React, { memo } from 'react';

interface TranscriptCardProps {
  transcript: string;
}

export default memo(function TranscriptCard({ transcript }: TranscriptCardProps) {
  // Parse dialogue lines into structured objects
  const lines = transcript.split('\n').map((line, idx) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > -1) {
      const speaker = line.substring(0, colonIdx).trim();
      const text = line.substring(colonIdx + 1).trim().replace(/^"|"$/g, '');
      return { id: idx, speaker, text };
    }
    return { id: idx, speaker: null, text: line.replace(/^"|"$/g, '') };
  });

  return (
    <div className="w-full flex flex-col gap-3 glass border border-white/8 p-5 bg-white/2 rounded-2xl max-h-[300px] overflow-y-auto">
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-accent">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
        </svg>
        <span className="text-xs font-bold tracking-wider text-text-secondary uppercase">AUDIO TRANSCRIPT (TEXT-BASED SIMULASI)</span>
      </div>

      <div className="flex flex-col gap-3">
        {lines.map((line) => {
          if (!line.speaker) {
            // Monologue bubble
            return (
              <div key={line.id} className="bg-white/4 border border-white/6 rounded-2xl p-3.5 text-sm leading-relaxed text-text-primary self-stretch">
                {line.text}
              </div>
            );
          }

          const isWoman = line.speaker.toLowerCase().includes('woman');
          
          return (
            <div
              key={line.id}
              className={`flex flex-col gap-1 max-w-[85%] ${
                isWoman ? 'self-end items-end' : 'self-start items-start'
              }`}
            >
              {/* Speaker name */}
              <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                {line.speaker}
              </span>
              {/* Text bubble */}
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  isWoman
                    ? 'bg-accent/15 border border-accent/20 text-accent rounded-tr-none'
                    : 'bg-white/6 border border-white/8 text-text-primary rounded-tl-none'
                }`}
              >
                {line.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
