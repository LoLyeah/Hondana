'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHistory } from '../../context/QuizContext';
import LoadingSpinner from '../LoadingSpinner';

export default function CacheSection() {
  const { preGeneratedCache, preGenerateQuestions, clearPreGenerated } = useHistory();
  const [pregenLoading, setPregenLoading] = React.useState<string | null>(null);
  const [pregenError, setPregenError] = React.useState<string | null>(null);
  const [pregenPreset, setPregenPreset] = React.useState<5 | 10 | 20>(10);
  const [pregenTestType, setPregenTestType] = React.useState<'TPA' | 'TBI'>('TPA');
  const [pregenCategory, setPregenCategory] = React.useState<string>('verbal-sinonim');
  const [selectedTPACategories, setSelectedTPACategories] = React.useState<string[]>(['verbal-sinonim']);
  const [showCacheInventory, setShowCacheInventory] = React.useState(true);

  const pregenTPACategories = [
    { key: 'verbal-sinonim', label: 'Sinonim' },
    { key: 'verbal-antonim', label: 'Antonim' },
    { key: 'verbal-analogi', label: 'Analogi' },
    { key: 'verbal-bacaan', label: 'Bacaan' },
    { key: 'numerik-deret', label: 'Deret' },
    { key: 'numerik-aritmatika', label: 'Aritmatika' },
    { key: 'numerik-perbandingan', label: 'Perbandingan' },
    { key: 'numerik-cerita', label: 'Cerita' },
    { key: 'logika-penalaran', label: 'Penalaran' },
    { key: 'logika-silogisme', label: 'Silogisme' },
    { key: 'logika-analitis', label: 'Analitis' },
    { key: 'logika-diagram', label: 'Diagram' },
  ];

  const pregenTBICategories = [
    { key: 'structure-completion', label: 'Structure Completion' },
    { key: 'reading-comprehension', label: 'Reading Comprehension' },
  ];

  const pregenCategories = pregenTestType === 'TPA' ? pregenTPACategories : pregenTBICategories;

  const handlePregenTestTypeChange = (tt: 'TPA' | 'TBI') => {
    setPregenTestType(tt);
    setPregenCategory(tt === 'TPA' ? 'verbal-sinonim' : 'structure-completion');
  };

  const handlePreGenerate = async () => {
    setPregenError(null);
    if (pregenTestType === 'TPA') {
      if (selectedTPACategories.length === 0) {
        setPregenError('Silakan pilih minimal 1 kategori TPA untuk di-generate.');
        return;
      }
      
      const failedCategories: string[] = [];
      for (const cat of selectedTPACategories) {
        setPregenLoading(cat);
        try {
          await preGenerateQuestions('TPA', cat, pregenPreset);
        } catch (e: any) {
          console.error(`Failed to pre-generate ${cat}:`, e);
          const catLabel = pregenTPACategories.find(c => c.key === cat)?.label || cat;
          failedCategories.push(catLabel);
        }
      }
      setPregenLoading(null);
      
      if (failedCategories.length > 0) {
        setPregenError(`Gagal men-generate kategori: ${failedCategories.join(', ')}. Pastikan kunci API kustom Anda valid dan status AI 'Siap'.`);
      }
    } else {
      const cacheKey = `${pregenTestType}:${pregenCategory}`;
      setPregenLoading(cacheKey);
      try {
        await preGenerateQuestions(pregenTestType, pregenCategory, pregenPreset);
      } catch (e: any) {
        setPregenError(e?.message || 'Gagal menghasilkan soal AI. Cek konfigurasi AI terlebih dahulu.');
      } finally {
        setPregenLoading(null);
      }
    }
  };

  const totalCached = Object.values(preGeneratedCache || {}).reduce((s, arr) => s + arr.length, 0);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-white/8 p-5 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-base">⚡</span>
          <div className="flex flex-col">
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              CACHE SOAL AI
            </h3>
            <span className="text-[9px] font-semibold text-text-secondary mt-0.5">
              Generate &amp; simpan soal AI lebih awal agar siap digunakan offline
            </span>
          </div>
        </div>
        {totalCached > 0 && (
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/25 leading-none whitespace-nowrap">
            {totalCached} Soal
          </span>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {/* Test Type Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
            MODUL
          </label>
          <div className="flex gap-2 bg-white/4 border border-white/8 rounded-xl p-1 w-fit">
            {(['TPA', 'TBI'] as const).map((tt) => (
              <button
                key={tt}
                onClick={() => handlePregenTestTypeChange(tt)}
                className={`py-1.5 px-4 rounded-lg text-xs font-bold cursor-pointer transition-all min-h-0 min-w-0 outline-none ${
                  pregenTestType === tt ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                {tt}
              </button>
            ))}
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary flex justify-between">
            <span>KATEGORI</span>
            {pregenTestType === 'TPA' && (
              <span className="text-[9px] text-accent font-black">
                {selectedTPACategories.length}/5 Terpilih
              </span>
            )}
          </label>
          
          {pregenTestType === 'TPA' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 bg-white/3 border border-white/6 rounded-2xl">
              {pregenTPACategories.map((cat) => {
                const isSelected = selectedTPACategories.includes(cat.key);
                const cacheCount = (preGeneratedCache?.[`TPA:${cat.key}`] || []).length;
                const isDisabled = !isSelected && selectedTPACategories.length >= 5;
                const isGenerating = pregenLoading === cat.key;
                
                return (
                  <button
                    key={cat.key}
                    type="button"
                    disabled={!!pregenLoading || (isDisabled && !isSelected)}
                    onClick={() => {
                      if (isSelected) {
                        if (selectedTPACategories.length > 1) {
                          setSelectedTPACategories(prev => prev.filter(k => k !== cat.key));
                        }
                      } else {
                        if (selectedTPACategories.length < 5) {
                          setSelectedTPACategories(prev => [...prev, cat.key]);
                        }
                      }
                    }}
                    className={`flex flex-col items-start gap-1 p-2.5 rounded-xl border text-left transition-all relative ${
                      isSelected 
                        ? 'bg-accent/10 border-accent/40 text-text-primary' 
                        : 'bg-white/2 border-white/6 text-text-secondary hover:border-white/12 hover:text-text-primary'
                    } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'} ${pregenLoading ? 'cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-1.5 w-full">
                      <span className={`h-3 w-3 rounded flex items-center justify-center text-[8px] font-black ${
                        isSelected ? 'bg-accent text-white' : 'border border-white/20'
                      }`}>
                        {isSelected && '✓'}
                      </span>
                      <span className="text-[10px] font-bold truncate leading-tight select-none">
                        {cat.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5 justify-between w-full">
                      <span className="text-[8px] text-text-secondary font-bold select-none">
                        {cacheCount > 0 ? `${cacheCount} di cache` : '0 di cache'}
                      </span>
                      {isGenerating && (
                        <span className="absolute bottom-1 right-2 inline-block h-3 w-3 animate-spin rounded-full border border-accent border-t-transparent" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="relative">
              <select
                value={pregenCategory}
                onChange={(e) => setPregenCategory(e.target.value)}
                className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2 text-sm font-bold text-text-primary outline-none transition-all appearance-none cursor-pointer pr-10 min-h-0 [min-block-size:0] [min-inline-size:0]"
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                {pregenCategories.map((cat) => (
                  <option key={cat.key} value={cat.key} className="bg-gray-950 text-white font-bold">
                    {cat.label}
                    {(preGeneratedCache?.[`${pregenTestType}:${cat.key}`] || []).length > 0
                      ? ` (${(preGeneratedCache?.[`${pregenTestType}:${cat.key}`] || []).length} di cache)`
                      : ''}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                  <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Preset Quantity */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
            JUMLAH SOAL YANG AKAN DI-GENERATE
          </label>
          <div className="flex items-center gap-2 bg-white/4 border border-white/8 rounded-2xl p-1 w-fit">
            {([5, 10, 20] as const).map((n) => (
              <button
                key={n}
                onClick={() => setPregenPreset(n)}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold cursor-pointer transition-all min-h-0 min-w-0 outline-none ${
                  pregenPreset === n ? 'bg-accent text-white' : 'text-text-secondary hover:text-text-primary'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                {n} Soal
              </button>
            ))}
          </div>
        </div>

        {pregenError && (
          <span className="text-[9px] font-bold text-error leading-normal bg-error/5 border border-error/15 rounded-lg px-2.5 py-1.5">
            ⚠️ {pregenError}
          </span>
        )}

        {/* Generate Button */}
        <button
          id="pregen-generate-btn"
          onClick={handlePreGenerate}
          disabled={!!pregenLoading}
          className="w-full py-3 bg-accent hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none shadow-lg shadow-accent/15 flex items-center justify-center gap-2 min-h-0 min-w-0"
          style={{ minBlockSize: 0, minInlineSize: 0 }}
        >
          {pregenLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>
                {pregenTestType === 'TPA' 
                  ? `Generating: ${pregenTPACategories.find(c => c.key === pregenLoading)?.label || 'Soal TPA'}...`
                  : 'Menyiapkan Soal AI...'}
              </span>
            </>
          ) : (
            <>
              <span>⚡</span>
              Generate &amp; Simpan ke Cache
            </>
          )}
        </button>

        {/* Cache Inventory */}
        {totalCached > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowCacheInventory(!showCacheInventory)}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-text-secondary hover:text-text-primary cursor-pointer select-none outline-none min-h-0 min-w-0"
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                <span>ISI CACHE SAAT INI</span>
                <span 
                  className="text-[9px] transition-transform duration-200" 
                  style={{ transform: showCacheInventory ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                >
                  ▼
                </span>
              </button>
              {showCacheInventory && (
                <button
                  onClick={() => clearPreGenerated()}
                  className="text-[9px] font-bold text-error hover:text-error/80 cursor-pointer outline-none select-none min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                >
                  Hapus Semua
                </button>
              )}
            </div>

            <AnimatePresence initial={false}>
              {showCacheInventory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  className="overflow-hidden flex flex-col gap-1.5"
                >
                  {Object.entries(preGeneratedCache || {})
                    .filter(([, arr]) => arr.length > 0)
                    .map(([key, arr]) => {
                      const [tt, ...catParts] = key.split(':');
                      const catKey = catParts.join(':');
                      const allCats = tt === 'TPA' ? pregenTPACategories : pregenTBICategories;
                      const catLabel = allCats.find((c) => c.key === catKey)?.label || catKey;
                      return (
                        <div key={key} className="flex items-center justify-between px-3 py-2 bg-white/3 border border-white/6 rounded-xl">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-text-primary">{catLabel}</span>
                            <span className="text-[9px] font-semibold text-text-secondary">{tt} · {arr.length} soal tersimpan</span>
                          </div>
                          <button
                            onClick={() => clearPreGenerated(key)}
                            className="text-[9px] font-bold text-error/70 hover:text-error cursor-pointer outline-none select-none min-h-0 min-w-0 px-2 py-1"
                            style={{ minBlockSize: 0, minInlineSize: 0 }}
                          >
                            Hapus
                          </button>
                        </div>
                      );
                    })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="p-3 bg-white/3 border border-white/6 rounded-2xl flex flex-col gap-1 text-[10px] text-text-secondary leading-normal select-none">
          <span className="font-bold text-text-primary/70">ℹ️ Cara Kerja Cache</span>
          <span>Soal yang di-generate disimpan di browser dan akan digunakan secara otomatis saat bank offline habis — tanpa memerlukan koneksi saat latihan berlangsung.</span>
        </div>
      </div>
    </motion.section>
  );
}
