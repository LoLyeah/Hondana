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
- **Active Session Persistence** — active quiz progress is automatically persisted to local storage (`hondana_active_session`), ensuring that page refreshes, browser crashes, or accidental closes do not lose your test state.
- **Keyboard Shortcut Legend Button** — a button in the header bar opens a quick keyboard help screen (accessible by pressing `?` key).
- Renders **passage cards** (`PassageCard`) for reading questions and **SVG figural diagrams** (`FiguralDisplay`) for diagram/logic questions.

---

### 4. 📊 Results & Bento Grid Analytics Dashboard (`/hasil`)

The completed session history is transformed into a rich analytics cockpit:
- **Score Card** — displays correct answers, accuracy percentage, total duration, and average speed per question.
- **Interactive Bento Grid Dashboard** (when no active session is loaded):
  - **Accuracy Donut Chart** (`AccuracyDonut`) — renders an animated distribution of correct vs incorrect answers.
  - **Category Mastery Chart** (`CategoryBars`) — showcases horizontal progress bars of accuracy percentage per sub-category.
  - **Accuracy Trend Line Chart** (`AccuracyTrend`) — displays a smooth sparkline area chart showing performance progression over the last 10 test sessions (scales dynamically to fit the card layout).
  - **Study Insights** (`StudyInsights`) — a card containing rotating, actionable AI recommendation tips based on your lowest-performing sub-categories.
- **Scrollable Session History Log** — list of previous attempts with quick review and deletion triggers.

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

### 7. 🏆 Achievement Badges & Delight

Hondana features a gamified learning journey to encourage consistent preparation:
- **10+ Unlockable Badges** (`lib/badges.ts`) — awarded for milestones like perfect scores, completing sessions in each module, speed records, or building a study history.
- **Collapsible Pencapaian Modal** (`BadgesModal`) — displays locked and unlocked achievements in a scrollable bento layout. Accessible from the main dashboard.
- **Toast Notifications** (`BadgeUnlockToast`) — alerts users immediately upon unlocking a badge with a lightweight, browser-safe CSS particle celebration burst (`Confetti`).
- **Tactile Feedback & Haptics** — utilizes distinct vibration frequencies (`navigator.vibrate`) for correct answers (20ms), errors ([50, 30, 50]ms), and session completion ([30, 30, 30, 30, 80]ms) to enhance engagement on mobile.

---

### 8. ⚙️ Settings (`/pengaturan`)

- **Highlighted PWA Installation** — A prominent installation card has been moved to the very top of the Settings screen with a `REKOMENDASI` badge, guiding users step-by-step to install the app on mobile (Safari iOS Share menu) or desktop/Android (direct install prompt button).
- AI provider, model, and API key configuration.
- Timer on/off toggle and sound effects on/off toggle.
- **AI Question Pre-generation Cache** (described below).
- **Stats overview** — sessions completed, questions answered, overall accuracy.
- **Reset Progress** — clears local accuracy stats and session history.
- **Troubleshooting App Reset** — a dedicated emergency action under Settings that clears all local localStorage keys and forces a clean app reload.
- Dark/Light **theme switching** — syncs to the document root with smooth clip-path transitions (`document.startViewTransition`).

---

### 9. ⌨️ Keyboard Shortcuts

Speed up navigation and answers during tests with built-in hotkey support on the `/quiz` and `/pembahasan` pages:
- **Select Answer**: `A`, `B`, `C`, `D`, `E` or `1`, `2`, `3`, `4`, `5`.
- **Flag Ragu-Ragu (Uncertain)**: `Spacebar` (toggles the flag).
- **Navigation**:
  - `Right Arrow` or `]` to advance to the next question.
  - `Left Arrow` or `[` to return to the previous question.
- **Toggle Question Grid**: `G` or `g`.
- **Toggle Shortcuts Legend Overlay**: `?`.
- **Close Popups/Drawers**: `Escape` (`Esc`).

---

### 10. 📱 Progressive Web App (PWA)

Hondana can be installed as a standalone PWA application on mobile, tablet, and desktop:
- **Home Screen Installation** — installs with native desktop/mobile application behavior, including a custom app icon and standalone window styling.
- **High-Performance Service Worker (`sw.js`)** — registers service worker version `hondana-v2` with network-first navigation, stale-while-revalidate for assets, and cache-first for Next.js static chunks.
- **Live SW Update Reload Trigger** — monitors Service Worker updates and triggers updates seamlessly without interrupting an active quiz session.

---

### 11. ⚡ Smart Cache & Question Exhaustion Protection

To support study sessions in low-connectivity or high-latency environments:
- **Cache Soal AI**: Pre-generate AI questions in bulk for selected categories under *Settings → Cache Soal AI* when online. These are saved to browser local storage (`hondana_pregen_cache`) and consumed automatically as a fallback.
- **Collapsible Cache Inventory**: A beautiful collapsible panel built with Framer Motion height transitions dynamically displays currently cached question totals by category.
- **Exhaustion Guard (`QuestionExhaustionModal`)**: If you request more questions for a category than remain in the local offline bank, the app displays a modal prompting you to:
  1. *Gunakan Soal AI Sekarang* (Enables AI mode or pulls from pre-generated cache).
  2. *Lanjutkan Saja* (Proceed with only the remaining offline questions).
  3. *Batal* (Return to settings/category selection).

---

### 12. ♿ Accessibility Focus & Trap Controls (WCAG 2.2)

- **Focus Trap Management (`useFocusTrap`)** — a custom hook that locks keyboard focus within open overlays (e.g. `ConfirmModal`, `BadgesModal`, `QuestionExhaustionModal`) and marks main body siblings as `inert`/`aria-hidden` to comply with screen reader accessibility standards.
- **Live Timer Updates** — live screen reader notifications (`aria-live="assertive"`) announce remaining time milestones during quiz sessions.
- **Overlay Portals** — all critical dialog boxes and overlay menus are rendered directly under the HTML body utilizing React Portals (`createPortal`) to prevent stacking context or layout clipping issues caused by parent CSS transforms.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 16.2 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4.0 + vanilla CSS custom properties |
| Chart Visualization | Recharts (`recharts`) |
| Animations | Framer Motion |
| AI | Groq SDK (`groq-sdk`), OpenAI-compatible fetch, Gemini REST |
| State & Cache | React Context + `useLocalStorage` persistence (with schema merge defenses and active session corruption guards) |
| PWA | Web App Manifest (`manifest.json`), Service Worker (`sw.js` v2) |
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
│   ├── pengaturan/             # Settings (AI config, PWA installer, data troubleshooting)
│   ├── quiz/                   # Interactive quiz player with active session persistence and corruption auto-reset
│   ├── globals.css             # Design system tokens, premium animations, tailwind directives
│   ├── layout.tsx              # Root layout, theme config, suppressHydrationWarning
│   └── page.tsx                # Home dashboard with PWA promotion
├── components/
│   ├── charts/                 # Recharts components (AccuracyDonut, CategoryBars, AccuracyTrend)
│   ├── settings/               # Settings sections (AiConfig, Cache, QuizSettings, AccountSection)
│   ├── BadgeCard.tsx           # Achievement card component
│   ├── BadgesModal.tsx         # Portalled scrollable achievement overlay modal
│   ├── BadgeUnlockToast.tsx    # Slide-in toast notification for badge unlocks
│   ├── Confetti.tsx            # CSS particle burst celebration effect
│   ├── ConfirmModal.tsx        # Portalled confirmation overlay dialog
│   ├── EmptyState.tsx          # Clean SVG empty illustration box
│   ├── FiguralDisplay.tsx      # SVG renderer for diagram/figural TPA questions
│   ├── Header.tsx              # Application header with logo icon integration
│   ├── LoadingSkeleton.tsx     # Shimmering glass loading skeletons
│   ├── LoadingSpinner.tsx      # Gradient rotating SVG spinners
│   ├── PassageCard.tsx         # Reading passage container
│   ├── ProgressBar.tsx         # Session progress indicator
│   ├── QuestionExhaustionModal.tsx # Warns when offline questions run low
│   ├── QuizOption.tsx          # Answer option button
│   ├── ResultBar.tsx           # Per-category accuracy bar in results
│   ├── StatsCard.tsx           # Summary stat card
│   ├── StudyInsights.tsx       # AI study recommendations panel
│   ├── TimerRing.tsx           # SVG countdown ring
│   ├── ToggleSwitch.tsx        # Symmetrical spring physics toggle switch
│   └── BottomNav.tsx           # Navigation bar
├── context/
│   └── QuizContext.tsx         # Global state: active session validation, history, pregen cache, settings
├── data/
│   ├── tpa-questions.ts        # Offline TPA question bank (12 subcategories)
│   ├── tbi-questions.ts        # Offline TBI question bank (structure + reading)
│   └── figural-patterns.ts     # SVG pattern data for figural questions
├── hooks/
│   ├── useFocusTrap.ts         # Accessibility trap hook for screen readers and keyboard focus
│   ├── useKeyboardShortcuts.ts # Reusable keyboard shortcut hook
│   ├── useLocalStorage.ts      # Reactive localStorage sync hook with schema merging
│   ├── usePWAInstall.ts        # Native PWA installation and Service Worker update tracking
│   └── useTimer.ts             # Countdown timer hook
├── lib/
│   ├── audio.ts                # Audio settings and haptic device feedback
│   ├── badges.ts               # Badge rules, check logic, unlocked criteria
│   ├── groq.ts                 # AI provider client and prompt templates
│   └── types.ts                # Shared TypeScript types
├── public/
│   ├── manifest.json           # Web App Manifest for PWA properties
│   ├── sw.js                   # Service Worker v2 script with advanced caching strategy
│   ├── icon-192.png            # 192px app launcher icon
│   └── icon-512.png            # 512px app launcher icon
└── ...
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
