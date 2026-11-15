import type { PaletteMode } from '@mui/material/styles';
import { useCallback, useMemo, useState } from 'react';
import {
  CUSTOM_ACCENT_DEFAULT,
  getInitialAccentId,
  resolveAccentPalette,
  STORAGE_KEYS,
  type AccentPresetId,
} from '@/theme/accentPresets';
import type { AccentPalette } from '@/theme/colorUtils';

function readStorage<T extends string>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const v = localStorage.getItem(key);
  if (!v) return fallback;
  return v as T;
}

export function useAppearance() {
  const [colorMode, setColorModeState] = useState<PaletteMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEYS.colorMode);
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [accentId, setAccentIdState] = useState<AccentPresetId>(getInitialAccentId);

  const [customHex, setCustomHexState] = useState<string>(() =>
    readStorage(STORAGE_KEYS.customHex, CUSTOM_ACCENT_DEFAULT),
  );

  const accent: AccentPalette = useMemo(
    () => resolveAccentPalette(accentId, customHex),
    [accentId, customHex],
  );

  const setColorMode = useCallback((mode: PaletteMode) => {
    setColorModeState(mode);
    localStorage.setItem(STORAGE_KEYS.colorMode, mode);
  }, []);

  const setAccentId = useCallback((id: AccentPresetId) => {
    setAccentIdState(id);
    localStorage.setItem(STORAGE_KEYS.accentId, id);
  }, []);

  const setCustomHex = useCallback((hex: string) => {
    setCustomHexState(hex);
    localStorage.setItem(STORAGE_KEYS.customHex, hex);
    setAccentId('custom');
  }, [setAccentId]);

  const toggleColorMode = useCallback(() => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  }, [colorMode, setColorMode]);

  return {
    colorMode,
    setColorMode,
    toggleColorMode,
    accentId,
    setAccentId,
    customHex,
    setCustomHex,
    accent,
  };
}
