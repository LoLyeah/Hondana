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
      style={{ minInlineSize: 'auto', minBlockSize: 'auto' }}
      className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer items-center rounded-full p-[2px] transition-colors duration-250 ease-in-out outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 ${
        isOn 
          ? 'bg-[#34C759] dark:bg-[#30D158]' 
          : 'bg-[#E9E9EA] dark:bg-[#39393D]'
      } ${
        disabled 
          ? 'opacity-40 cursor-not-allowed' 
          : ''
      }`}
    >
      <motion.span
        animate={{ x: isOn ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none block h-[27px] w-[27px] rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06),0_0_1px_rgba(0,0,0,0.04)]"
      />
    </button>
  );
}
