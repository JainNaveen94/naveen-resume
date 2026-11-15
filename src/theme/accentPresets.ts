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

/** First-time visitors (no saved choice): Sunset = orange accent. */
export const DEFAULT_ACCENT_ID: AccentPresetId = 'sunset';

/** Toggle to `'random'` for a random preset on first visit instead of Sunset. */
export const FIRST_VISIT_ACCENT: 'sunset' | 'random' = 'sunset';

export const CUSTOM_ACCENT_DEFAULT = '#f97316';

export const STORAGE_KEYS = {
  accentId: 'naveen-accent-id',
  customHex: 'naveen-accent-custom-hex',
  colorMode: 'naveen-color-mode',
} as const;

/** Preset accent: localStorage when the user has chosen (or auto-seeded once). */
export function getInitialAccentId(): AccentPresetId {
  if (typeof window === 'undefined') return DEFAULT_ACCENT_ID;

  const stored = localStorage.getItem(STORAGE_KEYS.accentId);
  if (stored && (stored in ACCENT_PRESETS || stored === 'custom')) {
    return stored as AccentPresetId;
  }

  let initial: AccentPresetId = DEFAULT_ACCENT_ID;
  if (FIRST_VISIT_ACCENT === 'random' && ACCENT_PRESET_IDS.length > 0) {
    const idx = Math.floor(Math.random() * ACCENT_PRESET_IDS.length);
    initial = ACCENT_PRESET_IDS[idx];
  }

  localStorage.setItem(STORAGE_KEYS.accentId, initial);
  return initial;
}

export function resolveAccentPalette(
  accentId: AccentPresetId,
  customHex: string,
): AccentPalette {
  if (accentId === 'custom') {
    return paletteFromHex(customHex, 'custom');
  }
  return ACCENT_PRESETS[accentId];
}
