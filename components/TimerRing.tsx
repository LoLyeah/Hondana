'use client';

import React, { memo } from 'react';

interface TimerRingProps {
  timeLeft: number;
  timeLimit: number;
}

export default memo(function TimerRing({ timeLeft, timeLimit }: TimerRingProps) {
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

  if (progress <= 0.1) {
    ringColor = 'stroke-error';
    isUrgent = true;
  } else if (progress <= 0.25) {
    ringColor = 'stroke-amber-500';
  }

  // Format time as MM:SS (e.g. 59:59)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Find key milestones (in seconds)
  const halfTime = Math.floor(timeLimit * 0.5);
  const quarterTime = Math.floor(timeLimit * 0.25);
  
  // Decide whether to announce
  let announcement = '';
  if (timeLeft === halfTime) {
    announcement = `Sisa waktu kuis setengah: ${Math.floor(timeLeft / 60)} menit`;
  } else if (timeLeft === quarterTime) {
    announcement = `Sisa waktu kuis seperempat: ${Math.floor(timeLeft / 60)} menit`;
  } else if (timeLeft === 300 && timeLimit > 300) {
    announcement = 'Sisa waktu kuis 5 menit';
  } else if (timeLeft === 60) {
    announcement = 'Sisa waktu kuis 1 menit';
  } else if (timeLeft === 30) {
    announcement = 'Sisa waktu kuis 30 detik';
  } else if (timeLeft === 10) {
    announcement = 'Sisa waktu kuis 10 detik';
  }

  return (
    <div
      className="relative flex items-center justify-center w-12 h-12"
      role="timer"
      aria-label={`Sisa waktu: ${formatTime(timeLeft)}`}
    >
      {announcement && (
        <span className="sr-only" role="status" aria-live="assertive">
          {announcement}
        </span>
      )}
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
      <span className={`absolute text-[9px] font-black tracking-tighter ${isUrgent ? 'text-error animate-pulse' : 'text-text-primary'}`}>
        {formatTime(timeLeft)}
      </span>
    </div>
  );
});
