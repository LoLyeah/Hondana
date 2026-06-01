'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../components/Header';
import BottomNav from '../../components/BottomNav';
import { useQuiz } from '../../context/QuizContext';
import { usePWAInstall } from '../../hooks/usePWAInstall';

const containerVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut" as const
    }
  }
};

const itemVariants = {
  hidden: {},
  show: {}
};

export default function Pengaturan() {
  const { settings, updateSettings, stats, resetStats, preGeneratedCache, preGenerateQuestions, clearPreGenerated } = useQuiz();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [installStatus, setInstallStatus] = React.useState<'idle' | 'accepted' | 'dismissed'>('idle');
  const [mounted, setMounted] = React.useState(false);

  // Pre-generate cache state — ALL hooks must be before any conditional return
  const [pregenLoading, setPregenLoading] = React.useState<string | null>(null);
  const [pregenError, setPregenError] = React.useState<string | null>(null);
  const [pregenPreset, setPregenPreset] = React.useState<5 | 10 | 20>(10);
  const [pregenTestType, setPregenTestType] = React.useState<'TPA' | 'TBI'>('TPA');
  const [pregenCategory, setPregenCategory] = React.useState<string>('verbal-sinonim');

  // Custom States
  const [showKey, setShowKey] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState<'ready' | 'checking' | 'error' | 'unconfigured'>('checking');
  const [statusError, setStatusError] = React.useState<string | null>(null);

  // Dynamic Groq Models States
  const [fetchedModels, setFetchedModels] = React.useState<any[]>([]);
  const [isLoadingModels, setIsLoadingModels] = React.useState(false);
  const [modelsFetchError, setModelsFetchError] = React.useState<string | null>(null);

  // Safe default extractors to prevent crash when settings are loaded from outdated localStorage
  const aiProvider = settings?.aiProvider || 'built-in';
  const aiModel = settings?.aiModel || 'llama-3.1-8b-instant';
  const customApiKey = settings?.customApiKey || '';
  const aiBaseUrl = settings?.aiBaseUrl || '';

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch Groq models when modal opens — must be before early return
  React.useEffect(() => {
    if (!mounted) return;
    if (isModalOpen && (aiProvider === 'built-in' || aiProvider === 'groq-custom')) {
      const doFetch = async () => {
        setIsLoadingModels(true);
        setModelsFetchError(null);
        try {
          const res = await fetch('/api/groq-models', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aiProvider, customApiKey })
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setFetchedModels(data.models || []);
          } else {
            setModelsFetchError(data.error || 'Gagal mengambil daftar model dari Groq.');
          }
        } catch (e: any) {
          setModelsFetchError(e.message || 'Terjadi kesalahan saat menghubungi API kuis.');
        } finally {
          setIsLoadingModels(false);
        }
      };
      doFetch();
    }
  }, [mounted, isModalOpen, aiProvider, customApiKey]);

  // Debounced connection status trigger — must be before early return
  React.useEffect(() => {
    if (!mounted) return;
    const delayDebounce = setTimeout(() => {
      const doTest = async () => {
        if (aiProvider !== 'built-in' && (!customApiKey || customApiKey.trim() === '')) {
          setStatus('unconfigured');
          setStatusError(null);
          return;
        }
        setStatus('checking');
        setStatusError(null);
        try {
          const res = await fetch('/api/test-ai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ aiProvider, customApiKey, aiBaseUrl })
          });
          const data = await res.json();
          if (data.success) {
            setStatus('ready');
          } else {
            setStatus('error');
            setStatusError(data.error);
          }
        } catch (e: any) {
          setStatus('error');
          setStatusError(e.message || 'Gagal menghubungi server kuis');
        }
      };
      doTest();
    }, 850);
    return () => clearTimeout(delayDebounce);
  }, [mounted, aiProvider, customApiKey, aiBaseUrl]);

  if (!mounted) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <span className="text-4xl animate-spin">⏳</span>
      </div>
    );
  }
  
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
    const cacheKey = `${pregenTestType}:${pregenCategory}`;
    setPregenLoading(cacheKey);
    setPregenError(null);
    try {
      await preGenerateQuestions(pregenTestType, pregenCategory, pregenPreset);
    } catch (e: any) {
      setPregenError(e?.message || 'Gagal menghasilkan soal AI. Cek konfigurasi AI terlebih dahulu.');
    } finally {
      setPregenLoading(null);
    }
  };

  // Total cached questions
  const totalCached = Object.values(preGeneratedCache || {}).reduce((s, arr) => s + arr.length, 0);


  const fetchGroqModels = async () => {
    setIsLoadingModels(true);
    setModelsFetchError(null);
    try {
      const res = await fetch('/api/groq-models', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiProvider,
          customApiKey
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFetchedModels(data.models || []);
      } else {
        setModelsFetchError(data.error || 'Gagal mengambil daftar model dari Groq.');
      }
    } catch (e: any) {
      setModelsFetchError(e.message || 'Terjadi kesalahan saat menghubungi API kuis.');
    } finally {
      setIsLoadingModels(false);
    }
  };

  // Connection Tester
  const testConnection = async () => {
    if (aiProvider !== 'built-in' && (!customApiKey || customApiKey.trim() === '')) {
      setStatus('unconfigured');
      setStatusError(null);
      return;
    }

    setStatus('checking');
    setStatusError(null);

    try {
      const res = await fetch('/api/test-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          aiProvider,
          customApiKey,
          aiBaseUrl
        })
      });

      const data = await res.json();
      if (data.success) {
        setStatus('ready');
      } else {
        setStatus('error');
        setStatusError(data.error);
      }
    } catch (e: any) {
      setStatus('error');
      setStatusError(e.message || 'Gagal menghubungi server kuis');
    }
  };

  const handleProviderChange = (provider: typeof settings.aiProvider) => {
    let defaultModel = 'llama-3.1-8b-instant';
    if (provider === 'groq-custom') defaultModel = 'llama-3.1-8b-instant';
    else if (provider === 'openai-custom') defaultModel = 'gpt-5.4-mini';
    else if (provider === 'gemini-custom') defaultModel = 'gemini-3.5-flash';

    updateSettings({
      aiProvider: provider,
      aiModel: defaultModel
    });
  };

  const handleReset = () => {
    if (window.confirm('PERINGATAN: Apakah Anda yakin ingin mereset seluruh progress latihan Anda? Tindakan ini akan menghapus statistik latihan dan riwayat akurasi secara permanen dan tidak dapat dibatalkan.')) {
      resetStats();
      alert('Progress latihan Anda telah berhasil direset.');
    }
  };

  const toggleTimer = () => {
    updateSettings({ timerEnabled: !settings.timerEnabled });
  };

  const toggleSound = () => {
    updateSettings({ soundEnabled: !settings.soundEnabled });
  };

  // Determine model list based on provider
  const getAvailableModels = () => {
    if (aiProvider === 'built-in' || aiProvider === 'groq-custom') {
      return ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
    }
    if (aiProvider === 'openai-custom') {
      return ['gpt-5.4-mini', 'gpt-5.5-instant', 'gpt-5.5', 'gpt-5.4-pro'];
    }
    if (aiProvider === 'gemini-custom') {
      return ['gemini-3.5-flash', 'gemini-3.1-pro', 'gemini-3.1-flash-lite'];
    }
    return [];
  };

  return (
    <>
      <Header title="Pengaturan" />

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex-1 flex flex-col gap-6 px-4 md:pl-60 py-6"
      >
        {/* Settings Group: AI Configuration */}
        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4 glow-tpa">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🤖</span>
              <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
                KONFIGURASI AI
              </h3>
            </div>
            
            {/* Live AI Status */}
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary leading-none">
              <span>Status AI:</span>
              <span className={`inline-flex items-center gap-1 font-black ${
                status === 'ready' ? 'text-[#34C759]' :
                status === 'checking' ? 'text-amber-500' :
                status === 'error' ? 'text-error' : 'text-text-secondary'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${
                  status === 'ready' ? 'bg-[#34C759]' :
                  status === 'checking' ? 'bg-amber-500 animate-ping' :
                  status === 'error' ? 'bg-error animate-pulse' : 'bg-text-secondary'
                }`} />
                {status === 'ready' ? 'Siap' :
                 status === 'checking' ? 'Memeriksa...' :
                 status === 'error' ? 'Error' : 'Belum Siap'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* AI Provider Select */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                PROVIDER AI
              </label>
              <div className="relative">
                <select
                  value={aiProvider}
                  onChange={(e) => handleProviderChange(e.target.value as any)}
                  className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2 text-sm font-bold text-text-primary outline-none transition-all appearance-none cursor-pointer pr-10 min-h-0 [min-block-size:0] [min-inline-size:0]"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                >
                  <option value="built-in" className="bg-gray-950 text-white font-bold">Groq AI (Gratis | Bawaan)</option>
                  <option value="groq-custom" className="bg-gray-950 text-white font-bold">Groq AI (Kunci Kustom)</option>
                  <option value="openai-custom" className="bg-gray-950 text-white font-bold">OpenAI (Kunci Kustom)</option>
                  <option value="gemini-custom" className="bg-gray-950 text-white font-bold">Gemini (Kunci Kustom)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                </div>
              </div>
            </div>

            {/* API Key Input (Visible if custom selected) */}
            {aiProvider !== 'built-in' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary flex justify-between items-center">
                  <span>KUNCI API KUSTOM</span>
                  <button 
                    onClick={() => testConnection()}
                    className="text-[9px] font-bold text-accent hover:text-accent-hover cursor-pointer outline-none select-none min-h-0 min-w-0"
                    style={{ minBlockSize: 0, minInlineSize: 0 }}
                  >
                    Uji Ulang Koneksi
                  </button>
                </label>
                <div className="relative">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={customApiKey}
                    onChange={(e) => updateSettings({ customApiKey: e.target.value })}
                    placeholder={
                      aiProvider === 'groq-custom' ? 'Masukkan Kunci API Groq (gsk_...)' :
                      aiProvider === 'openai-custom' ? 'Masukkan Kunci API OpenAI (sk-...)' :
                      'Masukkan Kunci API Gemini (AIzaSy...)'
                    }
                    className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-text-primary outline-none transition-all pr-10 min-h-0 [min-block-size:0] [min-inline-size:0]"
                    style={{ minBlockSize: 0, minInlineSize: 0 }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary hover:text-text-primary cursor-pointer outline-none min-h-0 min-w-0"
                    style={{ minBlockSize: 0, minInlineSize: 0 }}
                    aria-label="Toggle Password Visibility"
                  >
                    {showKey ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
                
                {/* Visual Connection Error Description */}
                {status === 'error' && statusError && (
                  <span className="text-[9px] font-bold text-error leading-normal bg-error/5 border border-error/15 rounded-lg px-2.5 py-1.5 mt-1">
                    ⚠️ {statusError}
                  </span>
                )}
              </div>
            )}

            {/* Custom Endpoint Base URL Input (Visible only for OpenAI-compatible endpoints) */}
            {aiProvider === 'openai-custom' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  BASE URL ENDPOINT KUSTOM (OPSIONAL)
                </label>
                <input
                  type="text"
                  value={aiBaseUrl}
                  onChange={(e) => updateSettings({ aiBaseUrl: e.target.value })}
                  placeholder="Contoh: https://api.openai.com/v1"
                  className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-text-primary outline-none transition-all min-h-0 [min-block-size:0] [min-inline-size:0]"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                />
                <span className="text-[9px] font-semibold text-text-secondary leading-normal">
                  Kosongkan untuk OpenAI standar, atau masukkan base URL kustom (misal: OpenRouter, DeepSeek, Ollama lokal) untuk kompatibilitas penuh.
                </span>
              </div>
            )}

            {/* AI Model Input Section */}
            {aiProvider === 'openai-custom' ? (
              // 1. General OpenAI Compatible Model Input
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  MODEL OPENAI COMPATIBLE (ID MODEL)
                </label>
                <input
                  type="text"
                  value={aiModel}
                  onChange={(e) => updateSettings({ aiModel: e.target.value })}
                  placeholder="Contoh: gpt-5.4-mini, deepseek-chat, mixtral-8x7b"
                  className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-text-primary outline-none transition-all min-h-0 [min-block-size:0] [min-inline-size:0]"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                />
                {/* Presets Row */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['gpt-5.5-instant', 'gpt-5.4-mini', 'gpt-5.5', 'deepseek-chat'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => updateSettings({ aiModel: preset })}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-black border transition-all cursor-pointer select-none min-h-0 min-w-0 ${
                        aiModel === preset 
                          ? 'bg-accent/20 text-accent border-accent/30' 
                          : 'bg-white/3 text-text-secondary border-white/5 hover:border-white/10 hover:text-text-primary'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            ) : aiProvider === 'gemini-custom' ? (
              // 2. Gemini Model Input (latest models preset)
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  MODEL GEMINI (ID MODEL)
                </label>
                <input
                  type="text"
                  value={aiModel}
                  onChange={(e) => updateSettings({ aiModel: e.target.value })}
                  placeholder="Contoh: gemini-3.5-flash, gemini-3.1-pro"
                  className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-text-primary outline-none transition-all min-h-0 [min-block-size:0] [min-inline-size:0]"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                />
                {/* Presets Row */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {['gemini-3.5-flash', 'gemini-3.1-pro', 'gemini-3.1-flash-lite'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => updateSettings({ aiModel: preset })}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-black border transition-all cursor-pointer select-none min-h-0 min-w-0 ${
                        aiModel === preset 
                          ? 'bg-accent/20 text-accent border-accent/30' 
                          : 'bg-white/3 text-text-secondary border-white/5 hover:border-white/10 hover:text-text-primary'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              // 3. Groq / Built-in Standard Selector
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                  MODEL GROQ
                </label>
                <div className="relative">
                  <select
                    value={aiModel}
                    onChange={(e) => updateSettings({ aiModel: e.target.value })}
                    className="w-full bg-white/4 border border-white/8 hover:border-white/12 focus:border-accent/40 rounded-xl px-3 py-2 text-sm font-bold text-text-primary outline-none transition-all appearance-none cursor-pointer pr-10 min-h-0 [min-block-size:0] [min-inline-size:0]"
                    style={{ minBlockSize: 0, minInlineSize: 0 }}
                  >
                    {getAvailableModels().map((model) => (
                      <option key={model} value={model} className="bg-gray-950 text-white font-bold">
                        {model}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-text-secondary">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* Dynamic Models List Trigger (Visible ONLY for Groq) */}
            {(aiProvider === 'built-in' || aiProvider === 'groq-custom') && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-2.5 bg-white/4 hover:bg-white/8 text-text-primary text-xs font-black rounded-xl border border-white/8 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] outline-none min-h-0 min-w-0"
                style={{ minBlockSize: 0, minInlineSize: 0 }}
              >
                <span className="text-[14px]">🧠</span>
                Lihat Semua Model Groq yang Tersedia
              </button>
            )}

            {/* Storage Autosave Box */}
            <div className="p-3 bg-white/3 border border-white/6 rounded-2xl flex flex-col gap-1 text-[10px] text-text-secondary leading-normal select-none">
              <span className="font-bold text-text-primary/70">ℹ️ Penjelasan Konfigurasi</span>
              <span>Konfigurasi disimpan secara otomatis ke penyimpanan browser lokal. Kunci API Anda disimpan sepenuhnya di memori browser lokal dan hanya dikirimkan ke server kuis untuk menghasilkan soal kuis secara instan.</span>
            </div>
          </div>
        </motion.section>

        {/* Settings Group: Cache Soal AI */}
        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4">
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
              <label className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                KATEGORI
              </label>
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

            {/* Error message */}
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
                  <span className="animate-spin text-sm">⏳</span>
                  Menyiapkan Soal AI...
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
                  <span className="text-[10px] font-black uppercase tracking-wider text-text-secondary">
                    ISI CACHE SAAT INI
                  </span>
                  <button
                    onClick={() => clearPreGenerated()}
                    className="text-[9px] font-bold text-error hover:text-error/80 cursor-pointer outline-none select-none min-h-0 min-w-0"
                    style={{ minBlockSize: 0, minInlineSize: 0 }}
                  >
                    Hapus Semua
                  </button>
                </div>
                <div className="flex flex-col gap-1.5">
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
                </div>
              </div>
            )}

            <div className="p-3 bg-white/3 border border-white/6 rounded-2xl flex flex-col gap-1 text-[10px] text-text-secondary leading-normal select-none">
              <span className="font-bold text-text-primary/70">ℹ️ Cara Kerja Cache</span>
              <span>Soal yang di-generate disimpan di browser dan akan digunakan secara otomatis saat bank offline habis — tanpa memerlukan koneksi saat latihan berlangsung.</span>
            </div>
          </div>
        </motion.section>

        {/* Settings Group 1: General Preferences */}

        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4">
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
              <button
                onClick={toggleTimer}
                className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none min-h-0 min-w-0 [min-block-size:0] [min-inline-size:0] ${
                  settings.timerEnabled ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-[#39393D]'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Toggle Timer"
              >
                <span
                  className={`absolute top-[2px] left-[2px] block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-in-out ${
                    settings.timerEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                />
              </button>
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
              <button
                onClick={toggleSound}
                className={`relative inline-flex h-[31px] w-[51px] shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out outline-none min-h-0 min-w-0 [min-block-size:0] [min-inline-size:0] ${
                  settings.soundEnabled ? 'bg-[#34C759]' : 'bg-[#E9E9EA] dark:bg-[#39393D]'
                }`}
                style={{ minBlockSize: 0, minInlineSize: 0 }}
                aria-label="Toggle Sound Effects"
              >
                <span
                  className={`absolute top-[2px] left-[2px] block h-[27px] w-[27px] transform rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.15),0_3px_1px_rgba(0,0,0,0.06)] transition-transform duration-200 ease-in-out ${
                    settings.soundEnabled ? 'translate-x-[20px]' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* Settings Group 2: Account & Progress */}
        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-base">🏆</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              AKUN & PROGRESS BELAJAR
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">Total Sesi Latihan</span>
              <span className="text-accent font-black">{stats?.sessionsCompleted ?? 0} Sesi</span>
            </div>
            
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">Total Soal Dijawab</span>
              <span className="text-accent font-black">{stats?.totalAnswered ?? 0} Soal</span>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-text-secondary">Rasio Akurasi Belajar</span>
              <span className="text-accent font-black">
                {stats?.totalAnswered ? Math.round(((stats.totalCorrect || 0) / stats.totalAnswered) * 100) : 0}%
              </span>
            </div>

            <div className="w-full h-px bg-[var(--border-badge)]" />

            {/* Reset Progress Button */}
            <div className="flex flex-col gap-3 mt-1">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-error">Hapus Semua Progress</span>
                <span className="text-[10px] font-bold text-text-secondary leading-normal">
                  Tindakan ini akan mengosongkan seluruh statistik latihan dan riwayat akurasi Anda dari awal secara permanen.
                </span>
              </div>
              <button
                onClick={handleReset}
                className="w-full py-3 border border-error/20 bg-error/5 hover:bg-error/10 text-error text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none"
              >
                Reset Progress Latihan
              </button>
            </div>
          </div>
        </motion.section>

        {/* Settings Group: PWA Install */}
        <motion.section variants={itemVariants} className="glass border border-white/8 p-5 flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-2">
            <span className="text-base">📲</span>
            <h3 className="text-xs font-black uppercase tracking-wider text-text-primary leading-none">
              PASANG APLIKASI
            </h3>
          </div>

          <div className="flex flex-col gap-4">
            {isInstalled ? (
              // Already installed state
              <div className="flex flex-col items-center gap-3 py-4">
                <div className="w-14 h-14 rounded-2xl bg-success/10 border border-success/20 flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <span className="text-sm font-black text-success">Aplikasi Sudah Terpasang!</span>
                  <span className="text-[10px] font-bold text-text-secondary leading-normal max-w-[260px]">
                    Hondana sudah berjalan sebagai aplikasi. Buka dari layar utama perangkat Anda.
                  </span>
                </div>
              </div>
            ) : isIOS ? (
              // iOS manual install instructions
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-accent/5 border border-accent/15 rounded-2xl flex flex-col gap-3">
                  <span className="text-[11px] font-black text-accent uppercase tracking-wide">Cara Pasang di iPhone / iPad</span>
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                      <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                        Ketuk ikon <span className="font-black">Bagikan</span> <span className="text-accent">⬆</span> di toolbar bawah Safari
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                      <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                        Gulir ke bawah dan pilih <span className="font-black">"Tambahkan ke Layar Utama"</span>
                      </span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-accent/20 text-accent text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                      <span className="text-[11px] font-semibold text-text-primary leading-relaxed">
                        Ketuk <span className="font-black">"Tambahkan"</span> di pojok kanan atas
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : isInstallable ? (
              // Android / Desktop install prompt
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 p-3.5 bg-white/3 border border-white/6 rounded-2xl">
                  <img src="/icon-192.png" alt="Hondana" className="w-12 h-12 rounded-xl shrink-0" />
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-sm font-black text-text-primary truncate">Hondana</span>
                    <span className="text-[10px] font-bold text-text-secondary">Latihan TPA & TBI — Offline Ready</span>
                  </div>
                </div>

                {installStatus === 'dismissed' ? (
                  <div className="flex items-center gap-2 text-[10px] font-bold text-text-secondary p-2.5 bg-white/3 rounded-xl border border-white/5">
                    <span>ℹ️</span>
                    <span>Anda menutup dialog. Ketuk ikon ⊕ di address bar browser untuk memasang aplikasi kapan saja.</span>
                  </div>
                ) : (
                  <button
                    onClick={async () => {
                      const outcome = await install();
                      if (outcome !== 'unavailable') setInstallStatus(outcome);
                    }}
                    className="w-full py-3.5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-2xl cursor-pointer transition-all active:scale-[0.98] outline-none flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Pasang Hondana di Perangkat Ini
                  </button>
                )}
              </div>
            ) : (
              // Browser doesn't support install prompt
              <div className="flex flex-col items-center gap-2.5 py-3 text-center">
                <span className="text-2xl">🌐</span>
                <span className="text-xs font-bold text-text-secondary leading-normal max-w-[260px]">
                  Browser Anda belum mendukung pemasangan PWA, atau aplikasi sudah terpasang. Gunakan Chrome / Edge untuk pengalaman terbaik.
                </span>
              </div>
            )}

            <div className="p-3 bg-white/3 border border-white/6 rounded-2xl flex flex-col gap-1 text-[10px] text-text-secondary leading-normal select-none">
              <span className="font-bold text-text-primary/70">ℹ️ Apa itu PWA?</span>
              <span>Hondana dapat dipasang sebagai aplikasi di perangkat Anda — berjalan seperti aplikasi native, bisa digunakan saat offline, dan tidak memerlukan toko aplikasi.</span>
            </div>
          </div>
        </motion.section>

        {/* About App Info */}
        <motion.section variants={itemVariants} className="flex flex-col items-center gap-1 mt-4 text-center select-none">
          <span className="text-xs font-black tracking-widest text-text-secondary/50">HONDANA V1.0.0</span>
          <span className="text-[10px] font-bold text-text-secondary/30">PREPARED BY GOOGLE DEEPMIND ANTIGRAVITY</span>
        </motion.section>
      </motion.main>

      <BottomNav />

      {/* Models Catalog Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="glass border border-white/10 w-full max-w-xl max-h-[85vh] flex flex-col p-6 shadow-2xl glow-tbi"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                <div className="flex flex-col">
                  <h2 className="text-lg font-black tracking-tight leading-none">🧠 Model Groq yang Tersedia</h2>
                  <span className="text-[10px] text-text-secondary font-bold mt-1.5">Pilih model kuis dari daftar aktif di server Groq secara real-time</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 hover:bg-white/8 rounded-full cursor-pointer text-text-secondary hover:text-text-primary transition-all outline-none min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                  aria-label="Tutup Catalog"
                >
                  ❌
                </button>
              </div>

              {/* Modal Body - Dynamic scrollable list */}
              <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3 scrollbar-thin">
                {isLoadingModels ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <span className="text-3xl animate-spin">⏳</span>
                    <span className="text-xs font-bold text-accent animate-pulse">Menghubungi API Groq & Mengambil Model...</span>
                  </div>
                ) : modelsFetchError ? (
                  <div className="p-5 bg-error/10 border border-error/20 rounded-2xl flex flex-col gap-3 text-center items-center">
                    <span className="text-3xl">⚠️</span>
                    <span className="text-xs font-bold text-error leading-normal">{modelsFetchError}</span>
                    <button 
                      onClick={fetchGroqModels}
                      className="px-5 py-2 bg-error/20 hover:bg-error/35 text-error text-[10px] font-black rounded-xl cursor-pointer active:scale-95 transition-all outline-none"
                    >
                      Coba Ulang
                    </button>
                  </div>
                ) : fetchedModels.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 gap-2 text-text-secondary">
                    <span className="text-3xl">📁</span>
                    <span className="text-xs font-bold">Tidak ada model aktif ditemukan.</span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2.5">
                    {fetchedModels.map((model: any) => {
                      const isSelected = aiModel === model.id;
                      return (
                        <div 
                          key={model.id}
                          onClick={() => {
                            updateSettings({ aiModel: model.id });
                            setIsModalOpen(false);
                          }}
                          className={`p-3.5 border rounded-2xl flex flex-col gap-2 hover:bg-white/4 cursor-pointer transition-all active:scale-[0.99] select-none ${
                            isSelected 
                              ? 'border-accent/40 bg-accent/5 shadow-md shadow-accent/5' 
                              : 'border-white/6 bg-white/2 hover:border-white/10'
                          }`}
                        >
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div className="flex flex-col">
                              <span className={`text-xs font-black font-mono ${isSelected ? 'text-accent' : 'text-text-primary'}`}>{model.id}</span>
                              <span className="text-[9px] text-text-secondary font-bold uppercase tracking-wider mt-0.5">Disediakan oleh: {model.owned_by}</span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              {model.active !== undefined && (
                                <span className={`text-[8px] font-black px-1.5 py-0.5 rounded leading-none ${
                                  model.active ? 'bg-success/15 text-success border border-success/25' : 'bg-white/5 text-text-secondary border border-white/5'
                                }`}>
                                  {model.active ? 'AKTIF' : 'NONAKTIF'}
                                </span>
                              )}
                              {isSelected && (
                                <span className="text-[9px] font-bold text-accent bg-accent/15 border border-accent/25 px-2 py-0.5 rounded-full">
                                  Terpilih
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-[9px] font-bold text-text-secondary pt-1.5 border-t border-white/5 mt-0.5">
                            {model.context_window && (
                              <div className="flex items-center gap-1">
                                <span>Konteks Maksimal:</span>
                                <span className="text-text-primary">{(model.context_window / 1024).toFixed(0)}k token</span>
                              </div>
                            )}
                            {model.created && (
                              <div className="flex items-center gap-1">
                                <span>Rilis:</span>
                                <span className="text-text-primary">{new Date(model.created * 1000).toLocaleDateString('id-ID')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="border-t border-white/5 pt-4 mt-4 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-5 bg-accent hover:bg-accent-hover text-white text-xs font-black rounded-xl cursor-pointer active:scale-[0.98] outline-none shadow-lg min-h-0 min-w-0"
                  style={{ minBlockSize: 0, minInlineSize: 0 }}
                >
                  Tutup Catalog
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
