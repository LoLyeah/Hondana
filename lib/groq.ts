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
- correctIndex (0 untuk A, 1 untuk B, 2 untuk C, 3 untuk D, 4 untuk E)
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

const TBI_SYSTEM = `You are a professional TOEFL ITP test writer.
Create high-quality questions for Tes Bahasa Inggris (TBI) according to the requested category and difficulty.
The output MUST be a JSON object containing a "questions" array.
Each TBI question MUST have:
- 4 answer choices (A to D)
- correctAnswer (0 for A, 1 for B, 2 for C, 3 for D)
- Written explanations in Bahasa Indonesia to help Indonesian learners.
Format JSON structure:
{
  "questions": [
    {
      "id": "ai-generated-id",
      "testType": "TBI",
      "category": "structure-completion",
      "difficulty": "sedang",
      "question": "Question...",
      "options": ["A...", "B...", "C...", "D..."],
      "correctAnswer": 0,
      "explanation": "Penjelasan detail dalam Bahasa Indonesia...",
      "timeLimit": 30
    }
  ]
}`;

export async function generateQuestions(
  testType: TestType,
  category: string,
  difficulty: Difficulty,
  count: number
): Promise<Question[]> {
  if (!groq) {
    throw new Error('Groq API Key not configured');
  }

  const prompt = `Buatlah ${count} buah soal ${testType} kategori "${category}" dengan tingkat kesulitan "${difficulty}".
Pastikan format JSON valid dan persis sesuai petunjuk sistem.`;

  const systemPrompt = testType === 'TPA' ? TPA_SYSTEM : TBI_SYSTEM;

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('Empty response from Groq API');
    }

    const data = JSON.parse(content);
    if (!data.questions || !Array.isArray(data.questions)) {
      throw new Error('Invalid JSON structure returned by AI');
    }

    // Map and sanitize the generated questions
    return data.questions.map((q: any, idx: number) => ({
      id: q.id || `ai-${testType.toLowerCase()}-${category}-${difficulty}-${Date.now()}-${idx}`,
      testType: testType,
      category: category,
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
  } catch (error) {
    console.error('Groq Generation Error:', error);
    throw error;
  }
}
