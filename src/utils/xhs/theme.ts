export const CANVAS = { width: 1080, height: 1440 } as const;

export const MARGINS = { top: 64, right: 64, bottom: 96, left: 64 } as const;

export const CONTENT = {
  width: CANVAS.width - MARGINS.left - MARGINS.right,
  height: CANVAS.height - MARGINS.top - MARGINS.bottom,
} as const;

export const COLORS = {
  paper: '#faf8f3',
  text: '#1f2937',
  subtext: '#4b5563',
  primary: '#0ea5e9',
  quoteBar: '#f59e0b',
  codeBg: '#f4f4f5',
  hr: '#e5e7eb',
} as const;

export const TYPO = {
  title: { fontSize: 72, lineHeight: 84 },
  h1: { fontSize: 56, lineHeight: 68 },
  h2: { fontSize: 44, lineHeight: 56 },
  h3: { fontSize: 36, lineHeight: 48 },
  p: { fontSize: 36, lineHeight: 48 },
  code: { fontSize: 30, lineHeight: 44 },
  small: { fontSize: 24, lineHeight: 32 },
} as const;

export const SPACING = {
  block: 24,
  listIndent: 28,
  quoteBar: 8,
  codePad: 16,
} as const;

export type Theme = {
  canvas: typeof CANVAS;
  margins: typeof MARGINS;
  content: typeof CONTENT;
  colors: typeof COLORS;
  typo: typeof TYPO;
  spacing: typeof SPACING;
};

export const THEME: Theme = {
  canvas: CANVAS,
  margins: MARGINS,
  content: CONTENT,
  colors: COLORS,
  typo: TYPO,
  spacing: SPACING,
};

export function paperBackgroundStyle(): any {
  // Use subtle gradients to simulate a paper texture without an image asset
  return {
    width: CANVAS.width,
    height: CANVAS.height,
    background: `linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.02) 100%), ${COLORS.paper}`,
    display: 'flex',
    flexDirection: 'column',
  } as const;
}


