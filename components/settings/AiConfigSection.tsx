'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useSettings } from '../../context/QuizContext';
import GroqModelsCatalog from './GroqModelsCatalog';

export default function AiConfigSection() {
  const { settings, updateSettings } = useSettings();
  const [showKey, setShowKey] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [status, setStatus] = React.useState<'ready' | 'checking' | 'error' | 'unconfigured'>('checking');
  const [statusError, setStatusError] = React.useState<string | null>(null);

  const aiProvider = settings?.aiProvider || 'built-in';
  const aiModel = settings?.aiModel || 'llama-3.1-8b-instant';
  const customApiKey = settings?.customApiKey || '';
  const aiBaseUrl = settings?.aiBaseUrl || '';

  // Debounced connection status trigger
  React.useEffect(() => {
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
  }, [aiProvider, customApiKey, aiBaseUrl]);

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
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass border border-white/8 p-5 flex flex-col gap-4 glow-tpa"
    >
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
            status === 'ready' ? 'text-success' :
            status === 'checking' ? 'text-amber-500' :
            status === 'error' ? 'text-error' : 'text-text-secondary'
          }`}>
            <span className={`h-1.5 w-1.5 rounded-full ${
              status === 'ready' ? 'bg-success' :
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

        {/* API Key Input */}
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
                {showKey ? '👁' : '👁‍🗨'}
              </button>
            </div>
            
            {status === 'error' && statusError && (
              <span className="text-[9px] font-bold text-error leading-normal bg-error/5 border border-error/15 rounded-lg px-2.5 py-1.5 mt-1">
                ⚠️ {statusError}
              </span>
            )}
          </div>
        )}

        {/* Custom Endpoint Base URL Input */}
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

        {/* Dynamic Models List Trigger */}
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

      <GroqModelsCatalog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.section>
  );
}
