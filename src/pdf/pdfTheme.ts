import type { PaletteMode } from '@mui/material/styles';
import { hexToRgb, rgbToHex, type AccentPalette } from '@/theme/colorUtils';

/** What the PDF needs to mirror the live site theme. */
export interface PdfThemeInput {
  mode: PaletteMode;
  accent: AccentPalette;
}

export interface PdfPalette {
  mode: PaletteMode;
  a1: string;
  a2: string;
  a3: string;
  /** Page background. */
  page: string;
  /** Raised surfaces (metric tiles, chips). */
  surface: string;
  /** Headings and strong text. */
  heading: string;
  body: string;
  muted: string;
  border: string;
  /** Accent used for text: readable on the page background. */
  accentText: string;
  /** Soft accent wash for chips and tiles. */
  accentSoft: string;
  accentBorder: string;
}

/** Opaque blend of `fg` over `bg` — avoids relying on rgba support in the PDF renderer. */
function mix(fg: string, bg: string, amount: number): string {
  const f = hexToRgb(fg);
  const b = hexToRgb(bg);
  return rgbToHex(
    b.r + (f.r - b.r) * amount,
    b.g + (f.g - b.g) * amount,
    b.b + (f.b - b.b) * amount,
  );
}

/** Mirrors `createAppTheme`: same surfaces, text colours and accent mapping. */
export function buildPdfPalette({ mode, accent }: PdfThemeInput): PdfPalette {
  const light = mode === 'light';
  const page = light ? '#ffffff' : '#030712';
  const surface = light ? '#f8fafc' : '#0f172a';
  // The site uses a3 for accent text on light and a1 on dark.
  const accentText = light ? accent.a3 : accent.a1;

  return {
    mode,
    a1: accent.a1,
    a2: accent.a2,
    a3: accent.a3,
    page,
    surface,
    heading: light ? '#0f172a' : '#f1f5f9',
    body: light ? '#334155' : '#cbd5e1',
    muted: light ? '#64748b' : '#94a3b8',
    border: light ? '#e2e8f0' : '#1e293b',
    accentText,
    accentSoft: mix(accent.a2, page, light ? 0.1 : 0.2),
    accentBorder: mix(accent.a2, page, light ? 0.35 : 0.5),
  };
}
