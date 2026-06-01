import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { aiProvider, customApiKey } = await request.json();

    let apiKey = '';

    if (aiProvider === 'built-in') {
      apiKey = process.env.GROQ_API_KEY || '';
      
      // Fallback to customApiKey if server-side key is missing
      if (!apiKey && customApiKey && customApiKey.trim() !== '') {
        apiKey = customApiKey;
      }

      if (!apiKey) {
        return NextResponse.json(
          { error: 'Kunci API bawaan Groq belum dikonfigurasi di server (.env). Silakan masukkan Kunci API Kustom Anda di menu Pengaturan.' },
          { status: 400 }
        );
      }
    } else if (aiProvider === 'groq-custom') {
      apiKey = customApiKey || '';
      if (!apiKey || apiKey.trim() === '') {
        return NextResponse.json(
          { error: 'Kunci API Groq kustom belum dimasukkan.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Provider bukan Groq. Mengambil model hanya didukung untuk Groq.' },
        { status: 400 }
      );
    }

    // Call Groq API endpoint directly via REST fetch to return list of all active models
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Kode respon API Groq: ${res.status}`);
    }

    const data = await res.json();
    
    // API returns a list of models under 'data' key
    const rawModels = data.data || [];

    // Sort models alphabetically by ID for clean display
    const models = rawModels.sort((a: any, b: any) => a.id.localeCompare(b.id));

    return NextResponse.json({ success: true, models });
  } catch (error: any) {
    console.error('Error fetching Groq models:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal mengambil daftar model dari Groq.' },
      { status: 500 }
    );
  }
}
