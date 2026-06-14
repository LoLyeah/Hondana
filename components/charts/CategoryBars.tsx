'use client';

import React, { memo } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { UserStats } from '../../lib/types';

interface CategoryBarsProps {
  stats: UserStats;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = memo(({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass border border-white/8 p-2 text-[10px] font-black uppercase tracking-wider text-text-primary shadow-xl">
        {payload[0].name}: {payload[0].value}%
      </div>
    );
  }
  return null;
});

CustomTooltip.displayName = 'CustomTooltip';

const CustomBar = (props: any) => {
  const { x, y, width, height, background, payload } = props;

  const isTPA = payload.isTPA;
  const accentColor = isTPA ? 'oklch(0.75 0.16 65)' : 'oklch(0.72 0.12 195)';
  const gradientId = isTPA ? 'url(#tpaGradient)' : 'url(#tbiGradient)';
  const glowFilterId = isTPA ? 'url(#glow-tpa)' : 'url(#glow-tbi)';
  const labelText = isTPA ? 'TPA (Tes Potensi Akademik)' : 'TBI (Tes Bahasa Inggris)';

  const rx = height / 2;
  const ry = height / 2;

  const bgX = background?.x ?? x;
  const bgWidth = background?.width ?? width;

  // Position the dot center at the leading edge (x + width)
  const dotX = x + width;
  const dotY = y + height / 2;
  const dotRadius = 4.5;

  return (
    <g>
      {/* Category Name Label above the bar */}
      <text
        x={bgX}
        y={y - 10}
        fill="var(--text-secondary)"
        fontSize={10}
        fontWeight={800}
        textAnchor="start"
        className="uppercase tracking-wider select-none font-sans"
      >
        {labelText}
      </text>

      {/* Accuracy Percentage above the bar on the right */}
      <text
        x={bgX + bgWidth}
        y={y - 10}
        fill={accentColor}
        fontSize={11}
        fontWeight={900}
        textAnchor="end"
        className="font-mono select-none"
      >
        {payload.accuracy}%
      </text>

      {/* Track capsule background */}
      <rect
        x={bgX}
        y={y}
        width={bgWidth}
        height={height}
        rx={rx}
        ry={ry}
        fill="rgba(255, 255, 255, 0.02)"
        stroke="rgba(255, 255, 255, 0.04)"
        strokeWidth={1}
      />

      {/* Filled bar segment with gradient */}
      {width > 0 && (
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={rx}
          ry={ry}
          fill={gradientId}
        />
      )}

      {/* Leading edge glow and bead */}
      {width > 0 && (
        <g>
          {/* Blur glow circle */}
          <circle
            cx={dotX}
            cy={dotY}
            r={dotRadius + 3}
            fill={accentColor}
            filter={glowFilterId}
            opacity={0.5}
          />
          {/* Inner bead */}
          <circle
            cx={dotX}
            cy={dotY}
            r={dotRadius}
            fill="#ffffff"
            stroke={accentColor}
            strokeWidth={2}
          />
        </g>
      )}
    </g>
  );
};

export default memo(function CategoryBars({ stats }: CategoryBarsProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-[160px]" />;
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

  return (
    <div className="w-full h-full min-h-[160px] select-none text-left flex items-center">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            {/* TPA Gradient (Amber) */}
            <linearGradient id="tpaGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.6 0.14 65 / 0.8)" />
              <stop offset="100%" stopColor="oklch(0.75 0.16 65)" />
            </linearGradient>
            {/* TBI Gradient (Teal/Cyan) */}
            <linearGradient id="tbiGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.55 0.12 195 / 0.8)" />
              <stop offset="100%" stopColor="oklch(0.72 0.12 195)" />
            </linearGradient>
            {/* Glow Filter for TPA */}
            <filter id="glow-tpa" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Glow Filter for TBI */}
            <filter id="glow-tbi" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <CartesianGrid
            horizontal={false}
            stroke="rgba(255, 255, 255, 0.04)"
            strokeDasharray="2 2"
          />

          <XAxis
            type="number"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            stroke="none"
            tick={{ fill: 'oklch(0.65 0.01 55)', fontSize: 9, fontWeight: 700 }}
          />

          <YAxis
            type="category"
            dataKey="name"
            stroke="none"
            tick={false}
            width={0}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.01)' }} />

          <Bar
            dataKey="accuracy"
            barSize={12}
            shape={<CustomBar />}
            background={{ fill: 'rgba(255, 255, 255, 0.02)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});
