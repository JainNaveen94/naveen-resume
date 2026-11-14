import { alpha, createTheme, type PaletteMode } from '@mui/material/styles';
import './mui-augmentation';
import type { AccentPalette } from './colorUtils';
import { buildGradients } from './colorUtils';

export function createAppTheme(mode: PaletteMode, accent: AccentPalette) {
  const isLight = mode === 'light';
  const gradients = buildGradients(accent);

  const toggleSelectedColor = isLight ? accent.a3 : accent.a1;

  return createTheme({
    palette: {
      mode,
      primary: {
        main: accent.a2,
        light: accent.a1,
        dark: accent.a3,
      },
      secondary: {
        main: accent.a3,
        light: accent.a1,
        dark: accent.a3,
      },
      background: {
        default: isLight ? '#f8fafc' : '#030712',
        paper: isLight ? '#ffffff' : '#0f172a',
      },
      text: {
        primary: isLight ? '#0f172a' : '#f1f5f9',
        secondary: isLight ? '#64748b' : '#94a3b8',
      },
      divider: isLight ? 'rgba(15, 23, 42, 0.08)' : 'rgba(255, 255, 255, 0.08)',
      gradient: {
        brand: gradients.brand,
        brandSoft: gradients.brandSoft,
        text: gradients.text,
      },
      surface: {
        glass: isLight
          ? 'rgba(255, 255, 255, 0.65)'
          : 'rgba(15, 23, 42, 0.55)',
        glassBorder: isLight
          ? 'rgba(15, 23, 42, 0.06)'
          : 'rgba(255, 255, 255, 0.1)',
      },
    },
    typography: {
      fontFamily: '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif',
      display: {
        fontFamily: '"Sora", "Plus Jakarta Sans", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
      },
      h1: {
        fontFamily: '"Sora", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.03em',
      },
      h2: {
        fontFamily: '"Sora", sans-serif',
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      h5: {
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      button: {
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
    },
    shape: { borderRadius: 16 },
    transitions: {
      duration: { standard: 280 },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: isLight
              ? '#cbd5e1 #f8fafc'
              : '#334155 #030712',
            transition:
              'background-color 0.35s ease, color 0.35s ease',
          },
          '::selection': {
            background: 'var(--selection-bg)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 12,
            padding: '10px 20px',
          },
          contained: {
            background: gradients.brand,
            color: '#fff',
            boxShadow: `0 4px 24px ${alpha(accent.a2, 0.4)}`,
            '&:hover': {
              background: gradients.brand,
              filter: 'brightness(1.08)',
              boxShadow: `0 8px 32px ${alpha(accent.a3, 0.45)}`,
            },
          },
          outlined: {
            borderColor: isLight
              ? alpha(accent.a2, 0.4)
              : alpha(accent.a1, 0.45),
            '&:hover': {
              borderColor: accent.a1,
              bgcolor: alpha(accent.a1, isLight ? 0.08 : 0.14),
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '10px !important',
            border: 0,
            '&.Mui-selected': {
              background: gradients.brandSoft,
              color: toggleSelectedColor,
              fontWeight: 700,
              '&:hover': {
                background: gradients.brandSoft,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 10,
          },
          colorPrimary: {
            background: alpha(accent.a2, isLight ? 0.1 : 0.22),
            borderColor: alpha(accent.a1, 0.35),
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
          },
          outlined: {
            borderColor: isLight
              ? 'rgba(15, 23, 42, 0.08)'
              : 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 18,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: '16px !important',
            overflow: 'hidden',
            '&:before': { display: 'none' },
          },
        },
      },
    },
  });
}
