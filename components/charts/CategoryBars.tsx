'use client';

import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from 'recharts';
import { UserStats } from '../../lib/types';

interface CategoryBarsProps {
  stats: UserStats;
}

export default function CategoryBars({ stats }: CategoryBarsProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[140px]" />;
  }

  let tpaCorrect = 0, tpaTotal = 0;
  let tbiCorrect = 0, tbiTotal = 0;

  // Iterate TPA
  Object.values(stats.tpaStats || {}).forEach((stat) => {
    tpaTotal += stat.total;
    tpaCorrect += stat.correct;
  });

  // Iterate TBI
  Object.values(stats.tbiStats || {}).forEach((stat) => {
    tbiTotal += stat.total;
    tbiCorrect += stat.correct;
  });

  const data = [
    { name: 'TPA', accuracy: tpaTotal > 0 ? Math.round((tpaCorrect / tpaTotal) * 100) : 0, isTPA: true },
    { name: 'TBI', accuracy: tbiTotal > 0 ? Math.round((tbiCorrect / tbiTotal) * 100) : 0, isTPA: false }
  ];

  // Custom colors for bars: Warm Amber/Orange for TPA, Cool Teal/Cyan for TBI
  const tpaColor = 'oklch(0.75 0.16 65)';
  const tbiColor = 'oklch(0.72 0.12 195)';

  return (
    <div className="w-full h-full min-h-[140px] select-none text-left flex items-center">
      <ResponsiveContainer width="100%" height={130}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: 'oklch(0.67 0.01 285)', fontSize: 10, fontWeight: 700 }}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="none"
            tick={{ fill: 'var(--text-primary)', fontSize: 11, fontWeight: 900 }}
            width={60}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="glass border border-white/8 p-2 text-[10px] font-black uppercase tracking-wider text-text-primary shadow-xl">
                    {payload[0].name}: {payload[0].value}%
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="accuracy"
            radius={[0, 6, 6, 0] as any}
            barSize={18}
            background={{ fill: 'rgba(255, 255, 255, 0.02)', radius: [0, 6, 6, 0] as any }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.isTPA ? tpaColor : tbiColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
