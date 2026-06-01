'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label?: string;
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  label,
  className = ''
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-[2px]',
    md: 'w-10 h-10 border-[3px]',
    lg: 'w-14 h-14 border-[4px]',
    xl: 'w-20 h-20 border-[5px]'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3.5 ${className}`}>
      <div className="relative">
        {/* Specular glowing blur background behind the spinner */}
        <div 
          className={`absolute inset-0 rounded-full bg-accent/20 blur-md animate-pulse ${
            size === 'sm' ? 'scale-75' : size === 'lg' ? 'scale-110' : size === 'xl' ? 'scale-125' : ''
          }`} 
        />
        
        {/* Custom premium SVG spinner style using nested Tailwind borders */}
        <div
          className={`rounded-full border-white/10 border-t-accent animate-spin ${sizeClasses[size]}`}
          style={{ animationDuration: '0.75s' }}
        />
      </div>
      
      {label && (
        <span className="text-xs font-bold text-accent tracking-wide animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
