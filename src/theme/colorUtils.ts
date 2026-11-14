export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '').trim();
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized.slice(0, 6);
  const n = Number.parseInt(full, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return `#${[clamp(r), clamp(g), clamp(b)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')}`;
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

export function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Build a 3-stop accent from one brand hex — works for light & dark UI shells. */
export function paletteFromHex(hex: string, id = 'custom'): AccentPalette {
  const { h, s, l } = hexToHsl(hex);
  const sat = Math.min(100, Math.max(45, s));
  return {
    id,
    label: 'Custom',
    a1: hslToHex((h + 360) % 360, Math.min(100, sat + 8), Math.min(72, l + 18)),
    a2: hslToHex(h, sat, Math.min(58, Math.max(42, l))),
    a3: hslToHex((h + 28) % 360, Math.min(100, sat + 4), Math.max(32, l - 12)),
  };
}

export interface AccentPalette {
  id: string;
  label: string;
  a1: string;
  a2: string;
  a3: string;
}

export function buildGradients(accent: AccentPalette) {
  return {
    brand: `linear-gradient(135deg, ${accent.a1} 0%, ${accent.a2} 45%, ${accent.a3} 100%)`,
    brandSoft: `linear-gradient(135deg, ${withAlpha(accent.a1, 0.18)} 0%, ${withAlpha(accent.a3, 0.14)} 100%)`,
    text: `linear-gradient(135deg, ${accent.a1} 0%, ${accent.a3} 100%)`,
  };
}
