'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  startTime: number;
  totalDurationSeconds: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function useTimer({ startTime, totalDurationSeconds, onTimeUp, isActive }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(0, totalDurationSeconds - elapsed);
  });
  const onTimeUpRef = useRef(onTimeUp);

  // Keep callback ref fresh to avoid restarting timer when it changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  useEffect(() => {
    if (!isActive) return;

    const tick = () => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const nextTime = Math.max(0, totalDurationSeconds - elapsed);
      setTimeLeft(nextTime);

      if (nextTime <= 0) {
        onTimeUpRef.current();
        return true;
      }
      return false;
    };

    // Run tick immediately on effect start
    const isDone = tick();
    if (isDone) return;

    const interval = setInterval(() => {
      const isDone = tick();
      if (isDone) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, startTime, totalDurationSeconds]);

  return {
    timeLeft,
  };
}
