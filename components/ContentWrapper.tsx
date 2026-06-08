'use client';

import React from 'react';

interface ContentWrapperProps {
  children: React.ReactNode;
  narrow?: boolean;      // For quiz/pembahasan/focused views (768px max)
  hasSidebar?: boolean;  // For standard pages with a desktop sidebar (Home, Results, Categories, Settings)
  noPadding?: boolean;   // Override to remove default padding
  className?: string;
  id?: string;
}

export default function ContentWrapper({
  children,
  narrow = false,
  hasSidebar = false,
  noPadding = false,
  className = '',
  id,
}: ContentWrapperProps) {
  return (
    <main
      id={id}
      className={`w-full mx-auto content-container transition-all duration-300
        ${hasSidebar ? 'has-sidebar-offset' : ''}
        ${narrow ? 'max-w-[var(--content-narrow-max-width)]' : 'max-w-[var(--content-max-width)]'}
        ${noPadding ? '' : 'px-4 py-6'}
        ${hasSidebar && !noPadding ? 'pb-24 md:pb-12' : ''}
        ${className}`}
    >
      {children}
    </main>
  );
}
