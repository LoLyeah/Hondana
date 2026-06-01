# 🎯 Hondana

**Hondana** is a state-of-the-art, gamified, and AI-powered interactive preparation platform designed to help candidates prepare for highly competitive job recruitments, civil service exams (**CPNS**), state-owned enterprise entry tests (**BUMN**), and academic selection procedures in Indonesia. 

By blending cognitive tests (**TPA - Tes Potensi Akademik**) and language proficiency tests (**TBI - Tes Bahasa Inggris / TOEFL**) with modern animated UI layouts, persistent learning logs, and multi-provider AI question generation, Hondana makes exam preparation engaging, professional, and highly effective.

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
| **TBI** *(Tes Bahasa Inggris)* | **Structure** | Sentence Completion and Error Identification | Syntactic correction analysis |
| | **Reading** | Reading Comprehension and Vocabulary-in-Context | Dedicated dual-pane passage interface (`PassageCard.tsx`) |

### 2. 🤖 Advanced Multi-Provider AI Generation (Groq, OpenAI, Gemini & Custom)
Hondana features an enterprise-grade AI question-generation pipeline supporting multiple model providers:
* **Multiple AI Providers**: Integrated support for:
  * **Groq AI (Built-in)**: Zero-config, out-of-the-box free question generator.
  * **Groq AI (Custom Key)**: Insert your own Groq API key for high-volume custom queries.
  * **OpenAI (Custom Key)**: Full compatibility with OpenAI endpoints.
  * **Gemini (Custom Key)**: Built-in compatibility with Google Gemini API endpoints.
* **Custom Base URLs (Ollama / DeepSeek Compatible)**: Supports custom Endpoint Base URLs, allowing seamless integration with local models (via Ollama) or alternative third-party providers (like DeepSeek, OpenRouter).
* **Live Connection Status Widget**: Displays a real-time status indicator (`Siap`, `Memeriksa...`, `Error`, `Belum Siap`) with descriptive connection feedback.
* **Groq Model Catalog Modal**: Fetches active models dynamically from the Groq API, letting users view the context windows, creators, and release dates of active models (such as `llama-3.3-70b-versatile`, `llama-3.1-8b-instant`, etc.) in an elegant scrollable UI.

### 3. 💾 Session History Logs & Deep Review Mode
* **Complete Session Archiving**: Completed sessions are fully logged as `SavedSession` entities and stored securely inside local storage (`hondana_session_history`).
* **Detailed Accuracy Audits**: Tracks duration, category, accuracy percentage, time-spent per question, flagged items, and exact answers.
* **Interactive Restorations**: Users can load, view, and deep-dive into past sessions to review questions and answers step-by-step, or delete saved logs.
* **Learning Accuracy Stats**: Tracks real-time overall progress metrics including **Completed Sessions**, **Total Questions Answered**, and overall **Learning Accuracy** ratio on the main dashboard.

### 4. ⏱️ Rich Exam Taking Utilities
* **Flag / Bookmark Questions**: Bookmark uncertain questions during the exam so you can easily review them later using the HUD index grid.
* **Direct Jump Navigation**: Instantly navigate between different questions using the grid layout.
* **Balanced Cognitive Matrix Builder**: Fetches questions using official cognitive proportions (TPA: 2 Mudah, 1 Sedang, 2 Sulit; TBI: 40% Mudah, 20% Sedang, 40% Sulit) for balanced and authentic exam simulations.
* **Latihan (Practice Mode)**: Custom training sessions focusing on a single subcategory with custom item counts.
* **Simulasi (Simulated Exam)**: Full-length mock exam (60 questions for TPA, 50 questions for TBI) adhering strictly to standard time constraints.

### 5. 🎨 Aesthetic Fluid Transitions & Dark/Light Themes
* **System-wide Theme Switching**: Native dark/light mode toggles which synchronously adjust document roots (`data-theme` and class lists) for responsive theme adjustments.
* **Staggered Page Animations**: Smooth, high-fidelity element staggering powered by `framer-motion` for a modern, fluid user experience.
* **Premium Glassmorphic Aesthetics**: Modern gradients, custom SVG rendering grids, and responsive sidebar layouts suited for mobile HUDs up to wide desktop screens.

---

## 🛠️ Tech Stack & Architecture

Hondana is built on a clean, modern frontend engineering stack:

* **Core Framework**: [Next.js 16.2](https://nextjs.org/) (App Router layout, utilising React Server and Client Components)
* **Rendering Engine**: [React 19](https://react.dev/) (Hooks, Context-based State Management, and LocalStorage synchronization)
* **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) with Vanilla CSS variables and configurations.
* **Animations**: [Framer Motion](https://www.framer.com/motion/) for premium staggering and micro-animations.
* **API Middleware**: Groq Node/Edge SDK wrapper (`groq-sdk`) & custom AI providers route wrappers
* **Type System**: Fully typed with strict TypeScript configurations

---

## 📂 Project Structure

The project code follows a modular, feature-oriented structure:

```text
hondana/
├── app/                        # Next.js App Router root
│   ├── api/                    # Server-side API endpoints
│   │   ├── generate/           # Multi-provider AI question generation route
│   │   ├── groq-models/        # Live Groq active models fetch route
│   │   └── test-ai/            # Connectivity health checking endpoint
│   ├── hasil/                  # Quiz summary & session results page
│   ├── kategori/               # Syllabus and category selection page
│   ├── pembahasan/             # Explanation review and transcript page
│   ├── pengaturan/             # Settings, sound, themes, and AI provider configurations
│   ├── quiz/                   # Interactive exam player and HUD
│   ├── globals.css             # Tailwind v4 utility styles & design system tokens
│   ├── layout.tsx              # Root HTML, light/dark controller & metadata wrapper
│   └── page.tsx                # Home / dashboard welcome page
├── components/                 # Reusable UI component layer
│   ├── FiguralDisplay.tsx      # SVG canvas for visual figural TPA patterns
│   ├── PassageCard.tsx         # Dedicated reading context component
│   ├── TimerRing.tsx           # SVG countdown timer with warning colors
│   └── ...                     # Global layout, cards, and navigation elements
├── context/                    # Context Provider
│   └── QuizContext.tsx         # Central application state (Session, History Logs, Settings)
├── data/                       # Curated offline question banks
│   ├── figural-patterns.ts     # Offline bank for figural pattern-matching
│   ├── tbi-questions.ts        # Offline bank for English (Structure, Reading)
│   └── tpa-questions.ts        # Offline bank for TPA (Verbal, Numeric, Logic)
├── hooks/                      # Custom utility React hooks
│   └── useLocalStorage.ts      # Automatic reactive storage sync
├── lib/                        # Core business logic and shared TS types
│   ├── groq.ts                 # AI providers config & prompts
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
> **Note:** If the key is not set, Hondana will run seamlessly in **Offline Mode**, loading questions from its built-in offline database. Custom keys can also be inserted directly via the in-app settings screen.

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
