# 🎯 Hondana

**Hondana** is a state-of-the-art, gamified, and AI-powered interactive preparation platform designed to help candidates prepare for highly competitive job recruitments, civil service exams (**CPNS**), state-owned enterprise entry tests (**BUMN**), and academic selection procedures in Indonesia. 

By blending cognitive tests (**TPA - Tes Potensi Akademik**) and language proficiency tests (**TBI - Tes Bahasa Inggris / TOEFL**) with modern RPG-inspired gamification and live AI-powered question generation, Hondana makes exam preparation engaging, dynamic, and highly effective.

---

## ✨ Features

### 1. Comprehensive Cognitive & Language Syllabus
Hondana offers structured practice and simulations across the complete official BAPPENAS TPA curriculum and TOEFL-aligned TBI exam blueprint:

| Test Module | Section | Key Category Coverage | Special Interaction |
| :--- | :--- | :--- | :--- |
| **TPA** *(Tes Potensi Akademik)* | **Verbal** | Synonyms (Sinonim), Antonyms (Antonim), Analogies, and Reading Passages | Multi-choice contextual analysis |
| | **Numerik** | Number Series (Deret), Basic Arithmetic, Comparisons, and Word Problems | Scratchpad-ready numerical workflows |
| | **Logika** | Syllogisms, Analytical Reasoning, Logical deductions, and Venn Diagrams | Relational logic structures |
| | **Figural** | Pattern recognition, spatial rotation, and visual relationship series | Integrated SVG visual renderer (`FiguralDisplay.tsx`) |
| **TBI** *(Tes Bahasa Inggris)* | **Listening** | Short Conversations, Long Conversations, and Extended Talks | Media playback UI with interactive audio/script simulation (`TranscriptCard.tsx`) |
| | **Structure** | Sentence Completion and Error Identification | Syntactic correction analysis |
| | **Reading** | Reading Comprehension and Vocabulary-in-Context | Dedicated dual-pane passage interface (`PassageCard.tsx`) |

### 2. ⚡ Game-Inspired Progress Engine (RPG Progression)
To maximize user retention and daily training streaks, Hondana is designed as an interactive learning game:
* **Dynamic XP System**: Earn XP for every correct answer, scaled dynamically by difficulty level:
  * **Mudah (Easy)**: `+10 XP`
  * **Sedang (Medium)**: `+20 XP`
  * **Sulit (Hard)**: `+30 XP`
* **Streak Multiplier**: Answer consecutively correct to gain streak bonuses (`+5 XP` bonus for every 3 consecutive correct answers). Features physical floating XP animations when answered.
* **Competency Leveling**: Advance through character levels (every `500 XP` unlocks a new rank) celebrated with an immersive, full-screen Level Up Modal (`LevelUpModal.tsx`).
* **Interactive Statistics**: Track real-time metrics including **Total XP**, **Active Streak**, **Completed Sessions**, and section-by-section accuracy distributions.

### 3. 🤖 AI-Powered Live Generation (Groq & Llama 3.3)
Hondana features a fully integrated generative AI pipeline that guarantees infinite high-quality practice sets:
* **Server-Side Generation**: An edge-ready API route (`/api/generate`) utilizes the **Groq SDK** running **Llama 3.3 70B Versatile** (`llama-3.3-70b-versatile`) to generate contextually accurate questions.
* **Exact Schema Enforcement**: The engine outputs fully typed, validated, and structured JSON questions complete with answer keys, tailored difficulty parameters, and highly detailed step-by-step solutions (Pembahasan) written in Bahasa Indonesia.
* **High-Fidelity Offline Fallback**: If the API key is not set or the network is unavailable, the application seamlessly and silently falls back to a curated offline mock bank with dozens of pre-designed complex TPA and TBI scenarios.

### 4. ⏱️ Advanced Practice Modes
* **Latihan (Targeted Practice)**: Pick a single subcategory, choose your difficulty, adjust the question count, and practice specific weak areas.
* **Simulasi (Simulated Exam)**: A full-length mock exam (60 questions for TPA, 50 questions for TBI) adhering strictly to standard time constraints and scoring conventions (no penalty scoring).

---

## 🛠️ Tech Stack & Architecture

Hondana is built on a clean, modern frontend engineering stack:

* **Core Framework**: [Next.js 16.2](https://nextjs.org/) (App Router layout, utilising React Server and Client Components)
* **Rendering Engine**: [React 19](https://react.dev/) (Hooks, Context-based State Management, and LocalStorage synchronization)
* **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) with Vanilla CSS custom configurations (glassmorphic cards, custom keyframe animations, dark mode theme palette)
* **API Middleware**: Groq SDK Node/Edge wrapper (`groq-sdk`)
* **Type System**: Fully typed with strict TypeScript configurations

---

## 📂 Project Structure

The project code follows a modular, feature-oriented structure:

```text
hondana/
├── app/                        # Next.js App Router root
│   ├── api/                    # Server-side API endpoints
│   │   └── generate/           # Groq AI generation route
│   ├── hasil/                  # Quiz summary & session results page
│   ├── kategori/               # Syllabus and category selection page
│   ├── pembahasan/             # Explanation review and transcript page
│   ├── pengaturan/             # Settings, sound, and local stats reset page
│   ├── quiz/                   # Interactive exam player and HUD
│   ├── globals.css             # Tailwind v4 utility styles & design system tokens
│   ├── layout.tsx              # Root HTML & metadata wrapper
│   └── page.tsx                # Home / dashboard welcome page
├── components/                 # Reusable UI component layer
│   ├── FiguralDisplay.tsx      # SVG canvas for visual figural TPA patterns
│   ├── LevelUpModal.tsx        # High-impact RPG level promotion modal
│   ├── PassageCard.tsx         # Dedicated reading context component
│   ├── TranscriptCard.tsx      # Dual listening dialogue container
│   ├── TimerRing.tsx           # SVG countdown timer with warning colors
│   └── ...                     # Global layout, cards, and navigation elements
├── context/                    # Context Provider
│   └── QuizContext.tsx         # Central application state (Session, XP, Stats, Settings)
├── data/                       # Curated offline question banks
│   ├── figural-patterns.ts     # Offline bank for figural pattern-matching
│   ├── tbi-questions.ts        # Offline bank for English (Structure, Reading, Listening)
│   └── tpa-questions.ts        # Offline bank for TPA (Verbal, Numeric, Logic)
├── hooks/                      # Custom utility React hooks
│   └── useLocalStorage.ts      # Automatic reactive storage sync
├── lib/                        # Core business logic and shared TS types
│   ├── groq.ts                 # Groq SDK configuration & prompts
│   └── types.ts                # TypeScript interfaces and type definitions
├── public/                     # Static public assets and media
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies and script declarations
```

---

## 🚀 Getting Started

To run Hondana locally, follow these simple setup steps:

### 1. Prerequisites
Ensure you have **Node.js (v18.x or newer)** installed on your machine.

### 2. Clone and Install Dependencies
Navigate to the root directory and install packages:
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory (you can copy `.env.example` as a template):
```bash
cp .env.example .env
```
Open the `.env` file and insert your Groq API key:
```env
GROQ_API_KEY=gsk_your_groq_api_key_here
```
> **Note:** If the key is not set, Hondana will run seamlessly in **Offline Mode**, loading questions from its built-in offline database.

### 4. Running the Development Server
Launch the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to experience Hondana!

### 5. Build and Production Run
To compile the application for production:
```bash
npm run build
npm start
```

---

## 🔒 Quality & Verification
* **TypeScript Integrity**: The project is strictly typed. Run `npx tsc --noEmit` to verify type safety.
* **Linter Compliance**: Hondana is configured with modern ESLint parameters. Run `npm run lint` to enforce standard coding guidelines.

---

*Made with 🎯 by the Hondana Team.*
