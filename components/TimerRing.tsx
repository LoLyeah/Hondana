'use client';

import React from 'react';

interface TimerRingProps {
  timeLeft: number;
  timeLimit: number;
}

export default function TimerRing({ timeLeft, timeLimit }: TimerRingProps) {
  const progress = timeLeft / timeLimit;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // Smooth color interpolation based on time percentage remaining
  // Green: oklch(0.70 0.17 160)
  // Yellow: oklch(0.75 0.18 75)
  // Red: oklch(0.60 0.22 25)
  let ringColor = 'stroke-success';
  let isUrgent = false;

  if (progress <= 0.2) {
    ringColor = 'stroke-error';
    isUrgent = true;
  } else if (progress <= 0.5) {
    ringColor = 'stroke-amber-500';
  }

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Ring */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          className="stroke-white/10 fill-none"
          strokeWidth="3.5"
        />
        {/* Countdown Ring */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          className={`fill-none transition-all duration-300 ${ringColor} ${isUrgent ? 'animate-pulse' : ''}`}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Time Text */}
      <span className={`absolute text-xs font-bold ${isUrgent ? 'text-error animate-pulse' : 'text-text-primary'}`}>
        {timeLeft}s
      </span>
    </div>
  );
}
