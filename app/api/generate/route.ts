import { NextResponse } from 'next/server';
import { generateQuestions } from '../../../lib/groq';

export async function POST(request: Request) {
  try {
    const { testType, category, difficulty, count, aiProvider, customApiKey, aiModel, aiBaseUrl } = await request.json();

    if (!testType || !category || !difficulty || !count) {
      return NextResponse.json(
        { error: 'Parameter tidak lengkap (testType, category, difficulty, count dibutuhkan)' },
        { status: 400 }
      );
    }

    const questions = await generateQuestions(
      testType,
      category,
      difficulty,
      Number(count),
      aiProvider,
      customApiKey,
      aiModel,
      aiBaseUrl
    );
    
    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error('API Generation Route Error:', error);
    return NextResponse.json(
      { error: error.message || 'Gagal menghasilkan soal via AI' },
      { status: 500 }
    );
  }
}
