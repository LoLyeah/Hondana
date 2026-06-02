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

  // Pattern Series 3: Rotating Triangle Arrow (Up -> Right -> Down -> Left)
  series3: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,15 80,75 20,75" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="85,50 25,20 25,80" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,85 20,25 80,25" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Triangle pointing Up)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,15 80,75 20,75" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt B (Correct: Triangle pointing Left)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="15,50 75,20 75,80" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt C (Triangle pointing Up-Right)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="75,25 75,75 25,75" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt D (Circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt E (Double line triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 78,73 22,73"/><polygon points="50,30 70,70 30,70" class="fill-amber-500/10 stroke-amber-500"/></svg>`
    ]
  },

  // Pattern Series 4: Grid of filled squares (1 -> 2 -> 3 -> 4)
  series4: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Correct: All 4 filled)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="20" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt B (Only top-left and bottom-left filled)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="20" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt C (Only bottom-right filled)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="55" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt D (None filled)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/></svg>`,
      // Opt E (Diagonal filled)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="15" y="15" width="70" height="70" class="stroke-gray-600"/><line x1="50" y1="15" x2="50" y2="85" stroke-dasharray="3 3" class="stroke-gray-600"/><line x1="15" y1="50" x2="85" y2="50" stroke-dasharray="3 3" class="stroke-gray-600"/><rect x="20" y="20" width="25" height="25" class="fill-amber-500 stroke-amber-500"/><rect x="55" y="55" width="25" height="25" class="fill-amber-500 stroke-amber-500"/></svg>`
    ]
  },

  // Pattern Series 5: Growing Concentric Circles (1 -> 2 -> 3 -> 4)
  series5: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="50" r="20" class="stroke-white"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="50" r="20" class="stroke-white"/><circle cx="50" cy="50" r="30" class="stroke-white"/></svg>`,
    opts: [
      // Opt A (Correct: 4 concentric circles)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="50" r="20" class="stroke-white"/><circle cx="50" cy="50" r="30" class="stroke-white"/><circle cx="50" cy="50" r="40" class="stroke-white"/></svg>`,
      // Opt B (3 concentric circles - same as q3)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="50" r="20" class="stroke-white"/><circle cx="50" cy="50" r="30" class="stroke-white"/></svg>`,
      // Opt C (Circle with a cross)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="20" class="fill-amber-500/10 stroke-amber-500"/><line x1="50" y1="20" x2="50" y2="80"/><line x1="20" y1="50" x2="80" y2="50"/></svg>`,
      // Opt D (2 Concentric Circles)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="10" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="50" r="20" class="stroke-white"/></svg>`,
      // Opt E (Circle with radiating spokes)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="20" class="fill-amber-500/10 stroke-amber-500"/><line x1="50" y1="20" x2="50" y2="80"/><line x1="20" y1="50" x2="80" y2="50"/><line x1="29" y1="29" x2="71" y2="71"/><line x1="71" y1="29" x2="29" y2="71"/></svg>`
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

  // Analogy 2: Solid Shape is to Empty Shape, as Solid Square is to... (Empty Square)
  analogy2: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30" class="fill-amber-500 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30" class="stroke-white"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60" class="fill-amber-500 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Empty Circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30" class="stroke-white"/></svg>`,
      // Opt B (Correct: Empty Square)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60" class="stroke-white"/></svg>`,
      // Opt C (Solid Triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,80 20,80" class="fill-amber-500 stroke-amber-500"/></svg>`,
      // Opt D (Empty Triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,80 20,80" class="stroke-white"/></svg>`,
      // Opt E (Solid Circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30" class="fill-amber-500 stroke-amber-500"/></svg>`
    ]
  },

  // Analogy 3: Shape Vertical Flip (Triangle Up to Triangle Down, as Arc Convex Up to Arc Convex Down)
  analogy3: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,70 20,70" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="40" r="4" class="fill-white stroke-none"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,80 80,30 20,30" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="60" r="4" class="fill-white stroke-none"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><path d="M20,70 Q50,20 80,70" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="45" r="4" class="fill-white stroke-none"/></svg>`,
    opts: [
      // Opt A (Arc Convex Up - same as q3)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><path d="M20,70 Q50,20 80,70" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="45" r="4" class="fill-white stroke-none"/></svg>`,
      // Opt B (Correct: Arc Convex Down)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><path d="M20,30 Q50,80 80,30" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="55" r="4" class="fill-white stroke-none"/></svg>`,
      // Opt C (Flat line with circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><line x1="20" y1="50" x2="80" y2="50" class="stroke-white"/><circle cx="50" cy="50" r="4" class="fill-white stroke-none"/></svg>`,
      // Opt D (Triangle pointing up)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 80,70 20,70" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="40" r="4" class="fill-white stroke-none"/></svg>`,
      // Opt E (Triangle pointing down)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,80 80,30 20,30" class="fill-amber-500/10 stroke-amber-500"/><circle cx="50" cy="60" r="4" class="fill-white stroke-none"/></svg>`
    ]
  },

  // Analogy 4: Shape Sides Increase (Triangle [3] to Square [4], as Pentagon [5] to Hexagon [6])
  analogy4: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,25 75,70 25,70" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="25" y="25" width="50" height="50" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 78,40 68,75 32,75 22,40" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Pentagon - same as q3)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 78,40 68,75 32,75 22,40" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt B (Correct: Hexagon)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,20 75,35 75,65 50,80 25,65 25,35" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt C (Octagon)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="40,20 60,20 75,35 75,65 60,80 40,80 25,65 25,35" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt D (Triangle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><polygon points="50,25 75,70 25,70" class="fill-amber-500/10 stroke-amber-500"/></svg>`,
      // Opt E (Circle)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="25" class="fill-amber-500/10 stroke-amber-500"/></svg>`
    ]
  },

  // Analogy 5: Divided Shape (Square divided in 2 to 4, as Circle divided in 2 to 4)
  analogy5: {
    q1: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60"/><line x1="20" y1="20" x2="80" y2="80" class="stroke-amber-500"/></svg>`,
    q2: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60"/><line x1="20" y1="20" x2="80" y2="80" class="stroke-amber-500"/><line x1="80" y1="20" x2="20" y2="80" class="stroke-amber-500"/></svg>`,
    q3: `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><line x1="20" y1="50" x2="80" y2="50" class="stroke-amber-500"/></svg>`,
    opts: [
      // Opt A (Circle divided in 2 - same as q3)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><line x1="20" y1="50" x2="80" y2="50" class="stroke-amber-500"/></svg>`,
      // Opt B (Correct: Circle divided in 4)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><line x1="20" y1="50" x2="80" y2="50" class="stroke-amber-500"/><line x1="50" y1="20" x2="50" y2="80" class="stroke-amber-500"/></svg>`,
      // Opt C (Square divided in 4)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><rect x="20" y="20" width="60" height="60"/><line x1="20" y1="20" x2="80" y2="80" class="stroke-amber-500"/><line x1="80" y1="20" x2="20" y2="80" class="stroke-amber-500"/></svg>`,
      // Opt D (Circle divided in 3)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/><line x1="50" y1="20" x2="50" y2="80"/><line x1="50" y1="50" x2="76" y2="65"/><line x1="50" y1="50" x2="24" y2="65"/></svg>`,
      // Opt E (Circle undivided)
      `<svg viewBox="0 0 100 100" class="w-full h-full stroke-white fill-none stroke-2"><circle cx="50" cy="50" r="30"/></svg>`
    ]
  }
};
