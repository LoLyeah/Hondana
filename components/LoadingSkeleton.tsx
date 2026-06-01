'use client';

import React from 'react';

interface LoadingSkeletonProps {
  type?: 'stats' | 'categories' | 'card' | 'list' | 'settings';
  count?: number;
  className?: string;
}

export default function LoadingSkeleton({
  type = 'card',
  count = 1,
  className = ''
}: LoadingSkeletonProps) {
  // Shimmering reflective gradient trace that sweeps horizontally
  const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent";

  if (type === 'stats') {
    return (
      <div className={`grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 w-full ${className}`}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={`glass p-5 flex flex-col gap-3 border border-white/5 ${shimmer}`}>
            <div className="h-3 w-20 bg-white/10 rounded-md" />
            <div className="h-8 w-16 bg-white/10 rounded-lg mt-1" />
            <div className="h-2 w-28 bg-white/5 rounded-md mt-1" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'categories') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 w-full ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`glass p-4 flex items-center justify-between border border-white/5 h-20 ${shimmer}`}>
            <div className="flex flex-col gap-2.5">
              <div className="h-4 w-36 bg-white/10 rounded-md" />
              <div className="h-2 w-24 bg-white/5 rounded-md" />
            </div>
            <div className="w-8 h-8 rounded-xl bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className={`flex flex-col gap-3 w-full ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className={`glass p-4 flex items-center justify-between border border-white/5 h-16 ${shimmer}`}>
            <div className="flex flex-col gap-2">
              <div className="h-3 w-32 bg-white/10 rounded-md" />
              <div className="h-2 w-48 bg-white/5 rounded-md" />
            </div>
            <div className="w-10 h-6 rounded-full bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (type === 'settings') {
    return (
      <div className={`flex flex-col gap-5 w-full ${className}`}>
        {/* Form header mimic */}
        <div className={`glass p-5 flex flex-col gap-4 border border-white/5 ${shimmer}`}>
          <div className="h-3 w-32 bg-white/10 rounded-md border-b border-white/5 pb-2" />
          <div className="flex flex-col gap-4 mt-2">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-28 bg-white/10 rounded-md" />
                  <div className="h-2 w-44 bg-white/5 rounded-md" />
                </div>
                <div className="w-12 h-6 rounded-full bg-white/10" />
              </div>
            ))}
          </div>
        </div>

        {/* Section title mimic */}
        <div className="h-3 w-28 bg-white/10 rounded-md mt-2 ml-1" />

        {/* Grid cards mimic */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className={`glass p-4 flex flex-col gap-3 border border-white/5 h-28 ${shimmer}`}>
              <div className="h-4 w-24 bg-white/10 rounded-md" />
              <div className="h-2 w-36 bg-white/5 rounded-md" />
              <div className="h-6 w-full bg-white/10 rounded-xl mt-auto" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default generic shimmering card card skeleton
  return (
    <div className="flex flex-col gap-3 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`glass p-5 border border-white/5 rounded-2xl h-32 ${shimmer} ${className}`} />
      ))}
    </div>
  );
}
