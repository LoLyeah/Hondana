'use client';

import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { SavedSession } from '../../lib/types';

interface AccuracyTrendProps {
  history: SavedSession[];
}

export default function AccuracyTrend({ history }: AccuracyTrendProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Take last 10 sessions and reverse to show oldest first (chronological order)
  const lastTen = history.slice(0, 10).reverse();
  const data = lastTen.map((session, index) => ({
    sessionIndex: index + 1,
    accuracy: Math.round(session.accuracy),
    date: new Date(session.timestamp).toLocaleDateString('id-ID', {
      month: 'short',
      day: 'numeric'
    })
  }));

  const accentColor = 'oklch(0.75 0.16 65)'; // Warm Amber/Gold

  if (!mounted) {
    return <div className="w-full h-[160px]" />;
  }

  // If not enough sessions, render a placeholder state
  if (data.length < 2) {
    return (
      <div className="w-full flex-1 flex items-center justify-center text-center p-4">
        <span className="text-xs md:text-sm font-semibold text-text-secondary leading-normal max-w-[200px]">
          Selesaikan minimal 2 sesi kuis untuk melihat grafik tren akurasi.
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 min-h-[150px] select-none text-left">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: -25, bottom: 5 }}
        >
          <defs>
            <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={accentColor} stopOpacity={0.25} />
              <stop offset="95%" stopColor={accentColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="sessionIndex"
            stroke="rgba(255, 255, 255, 0.1)"
            tick={{ fill: 'oklch(0.65 0.01 55)', fontSize: 8, fontWeight: 700 }}
            axisLine={false}
          />
          <YAxis
            domain={[0, 100]}
            stroke="rgba(255, 255, 255, 0.1)"
            tick={{ fill: 'oklch(0.65 0.01 55)', fontSize: 8, fontWeight: 700 }}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const dataPoint = payload[0].payload;
                return (
                  <div className="glass border border-white/8 p-2 text-[10px] font-black uppercase tracking-wider text-text-primary shadow-xl">
                    <div className="text-[9px] text-text-secondary mb-0.5">{dataPoint.date}</div>
                    Akurasi: {dataPoint.accuracy}%
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="accuracy"
            stroke={accentColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#trendGradient)"
            dot={{ r: 3, fill: accentColor, strokeWidth: 0 }}
            activeDot={{ r: 5, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
