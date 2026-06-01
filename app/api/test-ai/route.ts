import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

export async function POST(request: Request) {
  try {
    const { aiProvider, customApiKey, aiBaseUrl } = await request.json();

    // 1. Built-in Groq Verification
    if (aiProvider === 'built-in') {
      let apiKey = process.env.GROQ_API_KEY;
      
      // Fallback to customApiKey if server-side key is missing
      if (!apiKey && customApiKey && customApiKey.trim() !== '') {
        apiKey = customApiKey;
      }

      if (!apiKey) {
        return NextResponse.json({ 
          success: false, 
          error: 'API Key bawaan Groq belum dikonfigurasi di server (.env). Silakan masukkan Kunci API Kustom Anda di menu Pengaturan.' 
        });
      }
      
      try {
        const groq = new Groq({ apiKey });
        // Use a lightweight model for instant testing
        await groq.chat.completions.create({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 3
        });
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ 
          success: false, 
          error: `Gagal menghubungkan ke Groq: ${err.message || 'Error tidak diketahui'}` 
        });
      }
    }

    // 2. Custom Groq Verification
    if (aiProvider === 'groq-custom') {
      if (!customApiKey || customApiKey.trim() === '') {
        return NextResponse.json({ 
          success: false, 
          error: 'API Key Groq kustom belum dimasukkan.' 
        });
      }
      
      try {
        const groq = new Groq({ apiKey: customApiKey });
        await groq.chat.completions.create({
          model: 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: 'hi' }],
          max_tokens: 3
        });
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ 
          success: false, 
          error: `Gagal memverifikasi API Key Groq: ${err.message || 'API Key salah atau tidak valid'}` 
        });
      }
    }

    // 3. Custom OpenAI Verification
    if (aiProvider === 'openai-custom') {
      if (!customApiKey || customApiKey.trim() === '') {
        return NextResponse.json({ 
          success: false, 
          error: 'API Key OpenAI kustom belum dimasukkan.' 
        });
      }

      try {
        const baseUrl = aiBaseUrl && aiBaseUrl.trim() !== '' ? aiBaseUrl : 'https://api.openai.com/v1';
        const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${customApiKey}`
          },
          body: JSON.stringify({
            model: 'gpt-5.4-mini',
            messages: [{ role: 'user', content: 'hi' }],
            max_tokens: 3
          })
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Kode respon API OpenAI: ${res.status}`);
        }
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ 
          success: false, 
          error: `Gagal memverifikasi API Key OpenAI: ${err.message || 'API Key salah atau tidak aktif'}` 
        });
      }
    }

    // 4. Custom Gemini Verification
    if (aiProvider === 'gemini-custom') {
      if (!customApiKey || customApiKey.trim() === '') {
        return NextResponse.json({ 
          success: false, 
          error: 'API Key Gemini kustom belum dimasukkan.' 
        });
      }

      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${customApiKey}`, 
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: 'hi' }] }],
              generationConfig: { maxOutputTokens: 3 }
            })
          }
        );

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error?.message || `Kode respon API Gemini: ${res.status}`);
        }
        return NextResponse.json({ success: true });
      } catch (err: any) {
        return NextResponse.json({ 
          success: false, 
          error: `Gagal memverifikasi API Key Gemini: ${err.message || 'API Key salah atau tidak aktif'}` 
        });
      }
    }

    return NextResponse.json({ success: false, error: 'Provider tidak didukung.' });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      error: `Verifikasi gagal: ${error.message || 'Terjadi kesalahan sistem'}` 
    });
  }
}
