'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ToggleSwitchProps {
  isOn: boolean;
  onClick: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export default function ToggleSwitch({
  isOn,
  onClick,
  ariaLabel,
  disabled = false
}: ToggleSwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
        isOn 
          ? 'bg-success justify-end' 
          : 'bg-white/10 dark:bg-white/5 justify-start'
      } ${
        disabled 
          ? 'opacity-40 cursor-not-allowed' 
          : ''
      }`}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-[0_2px_5px_rgba(0,0,0,0.25)]"
      />
    </button>
  );
}
