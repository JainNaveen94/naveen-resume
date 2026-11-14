import type { PaletteMode } from '@mui/material/styles';
import type { AccentPalette } from './colorUtils';
import { buildGradients, withAlpha } from './colorUtils';

export function getCssVars(
  mode: PaletteMode,
  accent: AccentPalette,
): Record<string, string> {
  const gradients = buildGradients(accent);
  const mesh1Light = withAlpha(accent.a1, 0.32);
  const mesh1Dark = withAlpha(accent.a1, 0.2);
  const mesh2Light = withAlpha(accent.a3, 0.24);
  const mesh2Dark = withAlpha(accent.a3, 0.34);
  const mesh3Light = withAlpha(accent.a2, 0.22);
  const mesh3Dark = withAlpha(accent.a2, 0.16);

  if (mode === 'light') {
    return {
      '--bg-base': '#f8fafc',
      '--bg-elevated': 'rgba(255, 255, 255, 0.72)',
      '--bg-elevated-solid': '#ffffff',
      '--text-primary': '#0f172a',
      '--text-secondary': '#64748b',
      '--border-subtle': 'rgba(15, 23, 42, 0.08)',
      '--accent-1': accent.a1,
      '--accent-2': accent.a2,
      '--accent-3': accent.a3,
      '--glow-1': withAlpha(accent.a1, 0.38),
      '--glow-2': withAlpha(accent.a3, 0.3),
      '--mesh-1': mesh1Light,
      '--mesh-2': mesh2Light,
      '--mesh-3': mesh3Light,
      '--mesh-opacity': '0.58',
      '--header-bg': 'rgba(248, 250, 252, 0.75)',
      '--gradient-brand': gradients.brand,
      '--gradient-text': gradients.text,
      '--selection-bg': withAlpha(accent.a2, 0.28),
    };
  }

  return {
    '--bg-base': '#030712',
    '--bg-elevated': 'rgba(15, 23, 42, 0.65)',
    '--bg-elevated-solid': '#0f172a',
    '--text-primary': '#f1f5f9',
    '--text-secondary': '#94a3b8',
    '--border-subtle': 'rgba(255, 255, 255, 0.08)',
    '--accent-1': accent.a1,
    '--accent-2': accent.a2,
    '--accent-3': accent.a3,
    '--glow-1': withAlpha(accent.a1, 0.26),
    '--glow-2': withAlpha(accent.a3, 0.38),
    '--mesh-1': mesh1Dark,
    '--mesh-2': mesh2Dark,
    '--mesh-3': mesh3Dark,
    '--mesh-opacity': '0.88',
    '--header-bg': 'rgba(3, 7, 18, 0.72)',
    '--gradient-brand': gradients.brand,
    '--gradient-text': gradients.text,
    '--selection-bg': withAlpha(accent.a1, 0.32),
  };
}
