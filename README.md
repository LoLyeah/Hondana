# 🎯 Hondana

**Hondana** is an AI-powered, interactive exam preparation platform for competitive job recruitments, civil service exams (**CPNS**), and state-owned enterprise selections (**BUMN**) in Indonesia.

It covers two official exam modules — **TPA (Tes Potensi Akademik)** and **TBI (Tes Bahasa Inggris)** — with both a curated offline question bank and an optional live AI question-generation engine powered by multiple LLM providers.

---

## ✨ Features

### 1. 📚 Exam Modules & Question Coverage

#### TPA — Tes Potensi Akademik (60 questions / 60 minutes in Simulasi)
| Section | Subcategory | Description |
| :--- | :--- | :--- |
| **Verbal** | Sinonim | Synonym identification |
| | Antonim | Antonym identification |
| | Analogi | Word relationship analogies |
| | Pemahaman Bacaan | Reading passage comprehension |
| **Numerik** | Deret Angka | Logical number series |
| | Aritmatika Dasar | Basic arithmetic |
| | Perbandingan Kuantitatif | Quantitative comparison |
| | Soal Cerita | Word problems and reasoning |
| **Logika** | Penalaran Logis | Logical reasoning |
| | Silogisme | Syllogistic deduction |
| | Penalaran Analitis | Analytical reasoning |
| | Diagram Logika | Figural / diagram logic (SVG-rendered) |

#### TBI — Tes Bahasa Inggris (50 questions / 40 minutes in Simulasi)
| Section | Subcategory | Description |
| :--- | :--- | :--- |
| **Structure** | Sentence Completion | TOEFL-style grammar completion |
| **Reading** | Passage Comprehension | Multi-paragraph reading comprehension |

---

### 2. ⏱️ Practice Modes

#### Simulasi Ujian (Full Mock Exam)
A standardised, full-length mock exam session:
- **TPA**: 60 questions drawn from all 12 subcategories with a balanced difficulty split (2 Mudah + 1 Sedang + 2 Sulit per category).
- **TBI**: 50 questions (40 Structure Completion + 10 Reading Comprehension) with a 40/20/40 difficulty split.
- No penalty scoring (correct = 1, blank/wrong = 0), per BAPPENAS convention.

#### Latihan Per Kategori (Targeted Practice)
Train a single subcategory with a configurable question count (10 / 20 / 30 questions). Each category card on the selection screen shows your historical accuracy for that subcategory.

Both modes support a per-session configuration panel:
- **AI Mode toggle** — switch between the offline question bank and live AI generation.
- **Timer toggle** — enable/disable the per-question countdown timer.
- **Sound toggle** — enable/disable answer submission sound effects.

---

### 3. 🎮 Quiz Player

The interactive quiz player (`/quiz`) provides:
- **Per-question countdown timer** with an SVG ring display (`TimerRing`). Auto-submits as skipped when time runs out.
- **Auto-advance** — moves to the next question 800 ms after an answer is selected.
- **Prev / Next navigation** — jump freely between questions at any time.
- **Flag (Ragu-Ragu)** — mark any question as uncertain with a 🚩 indicator.
- **Question Grid Drawer** — a slide-up bottom sheet showing all question numbers colour-coded by status: Active (purple), Answered (purple-tint), Flagged (amber), Unanswered (grey).
- **Finish Session** button available from both the footer and the grid drawer.
- Renders **passage cards** (`PassageCard`) for reading questions and **SVG figural diagrams** (`FiguralDisplay`) for diagram/logic questions.

---

### 4. 📊 Results & Session History (`/hasil`)

After completing a session, the results page shows:
- **Score card** — correct count, accuracy %, total time, and average time per question.
- **Sub-category breakdown** — a `ResultBar` for every category present in the session, showing individual accuracy.
- From there you can proceed to **Pembahasan** (answer review) or return to the **History Dashboard**.

The History Dashboard (shown when no active session is loaded) displays:
- Global stats: total sessions completed, total questions answered, overall accuracy.
- A scrollable **session history log** (newest first), each card showing: test type, mode, category, date/time, score, accuracy %, and duration.
- **Review** button — loads the saved session into Pembahasan for a full answer walkthrough.
- **Delete** button — permanently removes a saved session log.

All session data is persisted in `localStorage` under `hondana_session_history`.

---

### 5. 💡 Answer Review (`/pembahasan`)

A dedicated review mode that replays any completed session question-by-question:
- Answer options are **colour-coded**: correct answer highlighted green, user's wrong selection highlighted red.
- A status banner confirms whether the answer was correct, wrong, or skipped.
- A **Pembahasan (explanation) block** provides a detailed written explanation in Bahasa Indonesia for every question.
- The same **Question Grid Drawer** used during the quiz is available here, with correct/wrong/skipped colour coding instead of answered/unanswered.

---

### 6. 🤖 Multi-Provider AI Generation

The AI pipeline (`/api/generate`) supports four provider modes, all configurable from the Settings screen:

| Provider | Description |
| :--- | :--- |
| **Groq AI (Built-in)** | Uses the server-side `GROQ_API_KEY` env variable. Zero user configuration needed. |
| **Groq AI (Custom Key)** | User supplies their own Groq API key via the settings screen. |
| **OpenAI (Custom Key)** | Full OpenAI API compatibility, with optional custom Base URL for OpenRouter, DeepSeek, Ollama, etc. |
| **Gemini (Custom Key)** | Google Gemini API compatibility. |

Additional AI tooling in Settings:
- **Live connection status** — a real-time indicator (Siap / Memeriksa... / Error / Belum Siap) with debounced health-check calls to `/api/test-ai`.
- **Groq Model Catalog Modal** — fetches active models from the Groq API via `/api/groq-models`, displaying each model's ID, owner, context window size, and release date. Selecting a model immediately applies it.
- **Model selector** — a dropdown for Groq, text input + presets for OpenAI-compatible and Gemini providers.

If AI generation fails or no API key is configured, the app silently falls back to the offline question bank.

---

### 7. ⚙️ Settings (`/pengaturan`)

- AI provider, model, and API key configuration (described above).
- Timer on/off toggle.
- Sound effects on/off toggle.
- **Stats overview** — sessions completed, questions answered, overall accuracy.
- **Reset progress** — clears all local stats and session history permanently.
- Dark/Light **theme switching** — syncs to the document root (`data-theme` attribute and CSS class) via a `useEffect` in `QuizContext`.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4.0 + vanilla CSS custom properties |
| Animations | Framer Motion |
| AI | Groq SDK (`groq-sdk`), OpenAI-compatible fetch, Gemini REST |
| State | React Context + `useLocalStorage` hook |
| Language | TypeScript (strict) |

---

## 📂 Project Structure

```text
hondana/
├── app/
│   ├── api/
│   │   ├── generate/           # AI question generation (multi-provider)
│   │   ├── groq-models/        # Live Groq model catalog fetch
│   │   └── test-ai/            # AI connectivity health check
│   ├── hasil/                  # Results page + session history dashboard
│   ├── kategori/               # Module & category selection
│   ├── pembahasan/             # Answer review with explanations
│   ├── pengaturan/             # Settings (AI config, theme, stats reset)
│   ├── quiz/                   # Interactive quiz player
│   ├── globals.css             # Design system tokens and Tailwind config
│   ├── layout.tsx              # Root layout + dark/light theme controller
│   └── page.tsx                # Home dashboard
├── components/
│   ├── CategoryCard.tsx        # Per-subcategory card with historical accuracy
│   ├── FiguralDisplay.tsx      # SVG renderer for diagram/figural TPA questions
│   ├── PassageCard.tsx         # Reading passage container
│   ├── ProgressBar.tsx         # Session progress indicator
│   ├── QuizOption.tsx          # Answer option button (with correct/wrong states)
│   ├── ResultBar.tsx           # Per-category accuracy bar in results
│   ├── StatsCard.tsx           # Summary stat card
│   ├── TimerRing.tsx           # SVG countdown ring
│   ├── TranscriptCard.tsx      # Listening transcript display (unused in current bank)
│   └── ...                     # Header, BottomNav, etc.
├── context/
│   └── QuizContext.tsx         # Global state: session, history, settings, stats
├── data/
│   ├── tpa-questions.ts        # Offline TPA question bank (all 12 subcategories)
│   ├── tbi-questions.ts        # Offline TBI question bank (structure + reading)
│   └── figural-patterns.ts    # SVG pattern data for figural questions
├── hooks/
│   ├── useLocalStorage.ts      # Reactive localStorage sync hook
│   └── useTimer.ts             # Countdown timer hook
├── lib/
│   ├── groq.ts                 # AI provider client and prompt templates
│   └── types.ts                # Shared TypeScript types
└── public/
```

---

## 🚀 Getting Started

### Prerequisites
Node.js v18 or newer.

### Install
```bash
npm install
```

### Environment
```bash
cp .env.example .env
```
```env
# Required only for the built-in Groq AI provider.
# Leave blank to use Offline Mode, or configure a provider in the app settings.
GROQ_API_KEY=gsk_your_groq_api_key_here
```

### Run
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### Build
```bash
npm run build && npm start
```

---

*Made with 🎯 by the Hondana Team.*
