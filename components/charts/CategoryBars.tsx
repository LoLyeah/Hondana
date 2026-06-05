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
    return <div className="w-full h-[220px]" />;
  }

  // 1. Group statistics
  let verbalCorrect = 0, verbalTotal = 0;
  let numerikCorrect = 0, numerikTotal = 0;
  let logikaCorrect = 0, logikaTotal = 0;
  let figuralCorrect = 0, figuralTotal = 0;
  let structCorrect = 0, structTotal = 0;
  let readCorrect = 0, readTotal = 0;

  // Iterate TPA
  Object.entries(stats.tpaStats || {}).forEach(([catKey, stat]) => {
    if (catKey.startsWith('verbal-')) {
      verbalTotal += stat.total;
      verbalCorrect += stat.correct;
    } else if (catKey.startsWith('numerik-')) {
      numerikTotal += stat.total;
      numerikCorrect += stat.correct;
    } else if (catKey.startsWith('logika-') && catKey !== 'logika-diagram') {
      logikaTotal += stat.total;
      logikaCorrect += stat.correct;
    } else if (catKey === 'logika-diagram') {
      figuralTotal += stat.total;
      figuralCorrect += stat.correct;
    }
  });

  // Iterate TBI
  Object.entries(stats.tbiStats || {}).forEach(([catKey, stat]) => {
    if (catKey.startsWith('structure-') || catKey.startsWith('listening-')) {
      structTotal += stat.total;
      structCorrect += stat.correct;
    } else if (catKey.startsWith('reading-') || catKey === 'verbal-bacaan') {
      readTotal += stat.total;
      readCorrect += stat.correct;
    }
  });

  const data = [
    { name: 'Verbal', accuracy: verbalTotal > 0 ? Math.round((verbalCorrect / verbalTotal) * 100) : 0, isTPA: true },
    { name: 'Numerik', accuracy: numerikTotal > 0 ? Math.round((numerikCorrect / numerikTotal) * 100) : 0, isTPA: true },
    { name: 'Logika', accuracy: logikaTotal > 0 ? Math.round((logikaCorrect / logikaTotal) * 100) : 0, isTPA: true },
    { name: 'Figural', accuracy: figuralTotal > 0 ? Math.round((figuralCorrect / figuralTotal) * 100) : 0, isTPA: true },
    { name: 'TBI Struct.', accuracy: structTotal > 0 ? Math.round((structCorrect / structTotal) * 100) : 0, isTPA: false },
    { name: 'TBI Read.', accuracy: readTotal > 0 ? Math.round((readCorrect / readTotal) * 100) : 0, isTPA: false }
  ];

  // Custom colors for bars: Warm Amber/Orange for TPA, Cool Teal/Cyan for TBI
  const tpaColor = 'oklch(0.75 0.16 65)';
  const tbiColor = 'oklch(0.72 0.12 195)';

  return (
    <div className="w-full h-full min-h-[220px] select-none text-left">
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
        >
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.2)"
            tick={{ fill: 'oklch(0.65 0.01 55)', fontSize: 9, fontWeight: 700 }}
            axisLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="none"
            tick={{ fill: 'var(--text-primary)', fontSize: 9, fontWeight: 700 }}
            width={75}
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
            barSize={12}
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
