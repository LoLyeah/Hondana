'use client';

import React, { useEffect, useState } from 'react';

interface XPPopupProps {
  xp: number | null;
}

export default function XPPopup({ xp }: XPPopupProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (xp !== null) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [xp]);

  if (!visible || xp === null) return null;

  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
      <div className="animate-float px-5 py-2.5 rounded-full bg-accent border border-accent/30 text-white font-black text-lg shadow-[0_8px_30px_rgba(95,99,242,0.4)] flex items-center gap-1.5 backdrop-blur-md">
        <span>🔥</span>
        <span>+{xp} XP</span>
      </div>
    </div>
  );
}
