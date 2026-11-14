import type { PaletteMode } from '@mui/material/styles';
import { useEffect } from 'react';
import type { AccentPalette } from '@/theme/colorUtils';
import { getCssVars } from '@/theme/tokens';

export function useThemeCssVars(mode: PaletteMode, accent: AccentPalette) {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = mode;
    root.dataset.accent = accent.id;
    const vars = getCssVars(mode, accent);
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [mode, accent]);
}
