'use client';

import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface AccuracyDonutProps {
  accuracy: number;
}

export default function AccuracyDonut({ accuracy }: AccuracyDonutProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid rendering if accuracy is invalid
  const validAccuracy = isNaN(accuracy) ? 0 : Math.min(100, Math.max(0, accuracy));

  if (!mounted) {
    return (
      <div className="w-full h-[160px] flex items-center justify-center relative select-none">
        {/* Simple placeholder structure matching dimensions */}
      </div>
    );
  }

  const data = [
    { name: 'Benar', value: validAccuracy },
    { name: 'Salah/Dilewati', value: 100 - validAccuracy }
  ];

  // Colors: Warm Gold/Amber for correct, subtle glass-like gray for incorrect
  const COLORS = ['oklch(0.75 0.16 65)', 'rgba(255, 255, 255, 0.05)'];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative min-h-[160px] select-none">
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={54}
            outerRadius={68}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            stroke="none"
          >
            <Cell fill={COLORS[0]} />
            <Cell fill={COLORS[1]} />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 leading-none pointer-events-none">
        <span className="text-2xl font-black text-text-primary">
          {validAccuracy}%
        </span>
        <span className="text-[9px] font-black uppercase tracking-wider text-text-secondary mt-1">
          Akurasi
        </span>
      </div>
    </div>
  );
}
