import Groq from 'groq-sdk';
import { Question, TestType, Difficulty } from './types';

// Standard fallback check: if no GROQ_API_KEY, we will let the calling route know to fallback gracefully
const apiKey = process.env.GROQ_API_KEY;
const groq = apiKey ? new Groq({ apiKey }) : null;

const TPA_SYSTEM = `Kamu adalah pembuat soal TPA (Tes Potensi Akademik) profesional untuk ujian masuk kerja BUMN/CPNS/Swasta di Indonesia.
Tugas kamu adalah membuat soal berkualitas tinggi sesuai dengan kelompok kategori dan tingkat kesulitan yang diminta.
Format output HARUS berupa JSON object yang berisi array "questions".
Setiap soal TPA HARUS memiliki:
- 5 pilihan jawaban (A sampai E)
- correctAnswer (0 untuk A, 1 untuk B, 2 untuk C, 3 untuk D, 4 untuk E)
- Pembahasan lengkap ditulis dalam Bahasa Indonesia.
- Tidak ada penalti skor (skor benar = 1, salah = 0).
Format JSON terstruktur:
{
  "questions": [
    {
      "id": "ai-generated-id",
      "testType": "TPA",
      "category": "verbal-sinonim",
      "difficulty": "sedang",
      "question": "Soal Sinonim...",
      "options": ["A...", "B...", "C...", "D...", "E..."],
      "correctAnswer": 0,
      "explanation": "Penjelasan detail...",
      "timeLimit": 30
    }
  ]
}`;

const TBI_SYSTEM = `You are a professional TOEFL-style test writer.
Create high-quality questions for Tes Bahasa Inggris (TBI) according to the requested category and difficulty.
The output MUST be a JSON object containing a "questions" array.

CRITICAL LANGUAGE REQUIREMENT:
- All questions, options (answer choices A-E), and passages (if any) MUST be written entirely in English. Under no circumstances should the question or options contain Indonesian words.
- The "explanation" MUST be written in Bahasa Indonesia to help Indonesian learners understand the grammar rules, vocabulary meaning, or logical context.

Each TBI question MUST have:
- 5 answer choices (A to E)
- correctAnswer (0 for A, 1 for B, 2 for C, 3 for D, 4 for E)
- Written explanations in Bahasa Indonesia to help Indonesian learners.

Standard JSON structure:
{
  "questions": [
    {
      "id": "ai-generated-id",
      "testType": "TBI",
      "category": "structure-completion",
      "difficulty": "sedang",
      "question": "Question text in English...",
      "options": ["Option A in English...", "Option B in English...", "Option C in English...", "Option D in English...", "Option E in English..."],
      "correctAnswer": 0,
      "explanation": "Penjelasan detail dalam Bahasa Indonesia...",
      "timeLimit": 30,
      "passage": "Passage text in English (only if reading-comprehension, otherwise omit or leave blank)",
      "listening": {
        "type": "short-conversation",
        "transcript": "Dialogue transcript in English (only if listening-short or listening-long, otherwise omit)"
      }
    }
  ]
}`;

export async function generateQuestions(
  testType: TestType,
  category: string,
  difficulty: Difficulty,
  count: number,
  aiProvider: string = 'built-in',
  customApiKey?: string,
  aiModel?: string,
  aiBaseUrl?: string
): Promise<Question[]> {
  const systemPrompt = testType === 'TPA' ? TPA_SYSTEM : TBI_SYSTEM;
  
  let prompt = '';
  if (testType === 'TPA') {
    prompt = `Buatlah ${count} buah soal TPA kategori "${category}" dengan tingkat kesulitan "${difficulty}".
    Pastikan format JSON valid dan persis sesuai petunjuk sistem.`;
  } else {
    prompt = `Create ${count} high-quality TBI (Tes Bahasa Inggris) questions for the category "${category}" with a difficulty level of "${difficulty}".
    
    IMPORTANT REQUIREMENTS:
    1. The questions, passages (if any), and options MUST be written entirely in English.
    2. The explanation MUST be written in Bahasa Indonesia.
    3. Ensure the JSON format is valid and strictly follows the system prompt.`;
    
    if (category === 'reading-comprehension') {
      prompt += `\n\nREADING COMPREHENSION PASSAGE REQUIREMENTS:
      - You MUST write a single, comprehensive passage of AT LEAST 300 words.
      - Do NOT write a new passage for each question.
      - Instead, use the EXACT SAME passage text for at least 2 consecutive questions (by copying the exact same passage string in the "passage" property of those questions) so they form a set based on a single reading passage.`;
    }
  }

  let responseText = '';

  // 1. Built-in Groq Provider
  if (aiProvider === 'built-in') {
    let activeGroq = groq;
    
    // Fallback to customApiKey if server-side key is missing
    if (!activeGroq && customApiKey && customApiKey.trim() !== '') {
      activeGroq = new Groq({ apiKey: customApiKey });
    }

    if (!activeGroq) {
      throw new Error('Kunci API bawaan Groq belum dikonfigurasi di server (.env). Silakan masukkan Kunci API Kustom di halaman Pengaturan.');
    }
    
    const model = aiModel || 'llama-3.1-8b-instant';
    
    const completion = await activeGroq.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });
    responseText = completion.choices[0]?.message?.content || '';
  } 
  
  // 2. Custom Groq Provider
  else if (aiProvider === 'groq-custom') {
    if (!customApiKey) {
      throw new Error('Groq Custom API Key is required but not provided.');
    }
    const customGroq = new Groq({ apiKey: customApiKey });
    const model = aiModel || 'llama-3.1-8b-instant';

    const completion = await customGroq.chat.completions.create({
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });
    responseText = completion.choices[0]?.message?.content || '';
  }

  // 3. Custom OpenAI Provider (OpenAI endpoint compatible in general)
  else if (aiProvider === 'openai-custom') {
    if (!customApiKey) {
      throw new Error('OpenAI API Key is required but not provided.');
    }
    const model = aiModel || 'gpt-5.4-mini';
    const baseUrl = aiBaseUrl && aiBaseUrl.trim() !== '' ? aiBaseUrl : 'https://api.openai.com/v1';
    const url = `${baseUrl.replace(/\/$/, '')}/chat/completions`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${customApiKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error?.message || `OpenAI API error (${res.status})`);
    }

    const data = await res.json();
    responseText = data.choices?.[0]?.message?.content || '';
  }

  // 4. Custom Gemini Provider
  else if (aiProvider === 'gemini-custom') {
    if (!customApiKey) {
      throw new Error('Gemini API Key is required but not provided.');
    }
    const model = aiModel || 'gemini-3.5-flash';
    
    // Using gemini REST API generateContent
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${customApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemPrompt}\n\n${prompt}` }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      })
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error?.message || `Gemini API error (${res.status})`);
    }

    const data = await res.json();
    responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } 
  
  else {
    throw new Error(`Unsupported AI Provider: ${aiProvider}`);
  }

  if (!responseText) {
    throw new Error('Empty response received from AI service.');
  }

  try {
    const data = JSON.parse(responseText);
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid JSON structure returned by AI (missing questions array)');
    }

    // Map and sanitize the generated questions
    return data.questions.map((q: any, idx: number) => ({
      id: q.id || `ai-${testType.toLowerCase()}-${category}-${difficulty}-${Date.now()}-${idx}`,
      testType: testType,
      category: q.category || category,
      difficulty: difficulty,
      question: q.question,
      options: q.options || [],
      correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
      explanation: q.explanation || 'Jawaban benar.',
      timeLimit: q.timeLimit || (testType === 'TPA' ? 60 : 30),
      figural: q.figural,
      listening: q.listening,
      passage: q.passage
    }));
  } catch (error: any) {
    console.error('AI Response Parsing Error:', error);
    throw new Error(`Gagal memproses respons AI: ${error.message || 'JSON tidak valid'}`);
  }
}
