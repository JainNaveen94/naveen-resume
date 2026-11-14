import { paletteFromHex, type AccentPalette } from './colorUtils';

export type AccentPresetId =
  | 'aurora'
  | 'ocean'
  | 'sunset'
  | 'forest'
  | 'coral'
  | 'royal'
  | 'custom';

export const ACCENT_PRESETS: Record<Exclude<AccentPresetId, 'custom'>, AccentPalette> = {
  aurora: {
    id: 'aurora',
    label: 'Aurora',
    a1: '#22d3ee',
    a2: '#3b82f6',
    a3: '#8b5cf6',
  },
  ocean: {
    id: 'ocean',
    label: 'Ocean',
    a1: '#2dd4bf',
    a2: '#0ea5e9',
    a3: '#0369a1',
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset',
    a1: '#fbbf24',
    a2: '#f97316',
    a3: '#db2777',
  },
  forest: {
    id: 'forest',
    label: 'Forest',
    a1: '#86efac',
    a2: '#22c55e',
    a3: '#047857',
  },
  coral: {
    id: 'coral',
    label: 'Coral',
    a1: '#fda4af',
    a2: '#f43f5e',
    a3: '#be123c',
  },
  royal: {
    id: 'royal',
    label: 'Royal',
    a1: '#a5b4fc',
    a2: '#6366f1',
    a3: '#4338ca',
  },
};

export const ACCENT_PRESET_IDS = Object.keys(
  ACCENT_PRESETS,
) as Array<keyof typeof ACCENT_PRESETS>;

export const DEFAULT_ACCENT_ID: AccentPresetId = 'aurora';
export const CUSTOM_ACCENT_DEFAULT = '#3b82f6';

export const STORAGE_KEYS = {
  accentId: 'naveen-accent-id',
  customHex: 'naveen-accent-custom-hex',
  colorMode: 'naveen-color-mode',
} as const;

export function resolveAccentPalette(
  accentId: AccentPresetId,
  customHex: string,
): AccentPalette {
  if (accentId === 'custom') {
    return paletteFromHex(customHex, 'custom');
  }
  return ACCENT_PRESETS[accentId];
}
