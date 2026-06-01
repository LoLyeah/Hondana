'use client';

import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  initialTime: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export function useTimer({ initialTime, onTimeUp, isActive }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const onTimeUpRef = useRef(onTimeUp);

  // Keep callback ref fresh to avoid restarting timer when it changes
  useEffect(() => {
    onTimeUpRef.current = onTimeUp;
  }, [onTimeUp]);

  // Reset time left when initialTime changes
  useEffect(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  useEffect(() => {
    if (!isActive || timeLeft <= 0) {
      if (timeLeft <= 0 && isActive) {
        onTimeUpRef.current();
      }
      return;
    }

    const startTime = Date.now();
    const startVal = timeLeft;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const nextTime = Math.max(0, startVal - elapsed);
      
      setTimeLeft(nextTime);

      if (nextTime === 0) {
        clearInterval(interval);
        onTimeUpRef.current();
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, initialTime]);

  const resetTimer = (newTime = initialTime) => {
    setTimeLeft(newTime);
  };

  return {
    timeLeft,
    resetTimer,
  };
}
