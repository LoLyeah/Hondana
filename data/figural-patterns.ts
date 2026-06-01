/**
 * SVG Pattern Library for TPA Diagram/Figural Questions
 * Contains clean, responsive, self-contained SVG strings for diagrams and options.
 */

export const figuralPatterns = {
  // Pattern Series 1: Rotating Line and Growing Dots
  series1: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="50" y2="10" stroke-width="3"/><circle cx="50" cy="10" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="90" y2="50" stroke-width="3"/><circle cx="90" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="70" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="50" y2="90" stroke-width="3"/><circle cx="50" cy="90" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="70" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="80" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Correct: line pointing Left, 4 dots)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="10" y2="50" stroke-width="3"/><circle cx="10" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="20" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="30" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="40" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt B (Line pointing up, 4 dots)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="50" y2="10" stroke-width="3"/><circle cx="50" cy="10" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="20" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="30" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="40" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt C (Line pointing left, 3 dots)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="10" y2="50" stroke-width="3"/><circle cx="10" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="20" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="30" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt D (Line pointing right, 4 dots)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="90" y2="50" stroke-width="3"/><circle cx="90" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="80" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="70" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="60" cy="50" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt E (Line pointing down, 2 dots)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="40" stroke-dasharray="4 4" class="stroke-gray-600"/><line x1="50" y1="50" x2="50" y2="90" stroke-width="3"/><circle cx="50" cy="90" r="4" class="fill-amber-500 stroke-amber-500"/><circle cx="50" cy="80" r="4" class="fill-amber-500 stroke-amber-500"/></svg>`,
    ]
  },

  // Pattern Series 2: Inner Shape Sides Progressing (Triangle -> Square -> Pentagon -> Hexagon)
  series2: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="50,25 75,70 25,70" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><rect x="30" y="30" width="40" height="40" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="50,25 74,42 65,70 35,70 26,42" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Pentagon - duplicate)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="50,25 74,42 65,70 35,70 26,42" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt B (Correct: Hexagon)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="50,25 72,37 72,63 50,75 28,63 28,37" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt C (Circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><circle cx="50" cy="50" r="22" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt D (Triangle rotated)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="50,75 75,30 25,30" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt E (Octagon)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" rx="8"/><polygon points="40,25 60,25 75,40 75,60 60,75 40,75 25,60 25,40" class="fill-amber-500/10 stroke-amber-500"/></svg>`
    ]
  },

  // Analogy 1: Circle inside Square is to Square inside Circle, as Triangle inside Circle is to... (Circle inside Triangle)
  analogy1: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60"/><circle cx="50" cy="50" r="20" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><rect x="35" y="35" width="30" height="30" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><polygon points="50,25 72,65 28,65" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Square inside Triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,75 20,75"/><rect x="40" y="45" width="20" height="20" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt B (Correct: Circle inside Triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,75 20,75"/><circle cx="50" cy="55" r="15" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt C (Triangle inside Square)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="25" y="25" width="50" height="50"/><polygon points="50,30 68,65 32,65" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt D (Circle inside Square)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="25" y="25" width="50" height="50"/><circle cx="50" cy="50" r="18" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt E (Triangle inside Circle - duplicate)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><polygon points="50,25 72,65 28,65" class="fill-amber-500/10 stroke-amber-500"/></svg>`
    ]
  },

  // Odd One Out 1: Rotations of an L-shape with a dot. One is mirrored. (Opt C is mirrored)
  odd1: {
    opts: [
      // Opt A (0 deg)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><path d="M30,20 L30,70 L70,70" stroke-width="4"/><circle cx="50" cy="50" r="5" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt B (90 deg CW)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><g transform="rotate(90 50 50)"><path d="M30,20 L30,70 L70,70" stroke-width="4"/><circle cx="50" cy="50" r="5" class="fill-amber-500 stroke-amber-500"/></g></svg>`,
      // Opt C (Correct: Mirrored / Odd one out)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><g transform="scale(-1 1) translate(-100 0)"><path d="M30,20 L30,70 L70,70" stroke-width="4"/><circle cx="50" cy="50" r="5" class="fill-amber-500 stroke-amber-500"/></g></svg>`,
      // Opt D (180 deg CW)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><g transform="rotate(180 50 50)"><path d="M30,20 L30,70 L70,70" stroke-width="4"/><circle cx="50" cy="50" r="5" class="fill-amber-500 stroke-amber-500"/></g></svg>`,
      // Opt E (270 deg CW)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><g transform="rotate(270 50 50)"><path d="M30,20 L30,70 L70,70" stroke-width="4"/><circle cx="50" cy="50" r="5" class="fill-amber-500 stroke-amber-500"/></g></svg>`
    ]
  }
};
