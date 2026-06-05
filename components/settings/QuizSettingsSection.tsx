'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/QuizContext';
import ToggleSwitch from '../ToggleSwitch';
import { sfx } from '../../lib/audio';

export default function QuizSettingsSection() {
  const { settings, updateSettings } = useSettings();

  const toggleTimer = () => {
    const newVal = !settings.timerEnabled;
    updateSettings({ timerEnabled: newVal });
    if (settings.soundEnabled) {
      sfx.playToggle(newVal);
    }
  };
 
  const toggleSound = () => {
    const newVal = !settings.soundEnabled;
    updateSettings({ soundEnabled: newVal });
    sfx.playToggle(newVal);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-white/8 p-5 flex flex-col gap-4"
    >
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <span className="text-base">⚙️</span>
        <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
          PENGATURAN KUIS & LATIHAN
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {/* Timer Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Batasan Waktu (Timer)</span>
            <span className="text-[10px] font-bold text-text-secondary leading-tight">
              Aktifkan batasan waktu ujian per sesi (TPA: 60 menit, TBI: 50 menit)
            </span>
          </div>
          <ToggleSwitch
            isOn={settings.timerEnabled}
            onClick={toggleTimer}
            ariaLabel="Toggle Timer"
          />
        </div>
 
        <div className="w-full h-px bg-[var(--border-badge)]" />
 
        {/* Sound Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold">Efek Suara Interaktif</span>
            <span className="text-[10px] font-bold text-text-secondary leading-tight">
              Putar audio singkat ketika menjawab benar atau salah
            </span>
          </div>
          <ToggleSwitch
            isOn={settings.soundEnabled}
            onClick={toggleSound}
            ariaLabel="Toggle Sound Effects"
          />
        </div>
      </div>
    </motion.section>
  );
}
