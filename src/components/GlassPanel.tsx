import { Box, type SxProps, type Theme } from '@mui/material';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  sx?: SxProps<Theme>;
  glow?: boolean;
  /** Backdrop blur is costly; use only when needed (e.g. none by default). */
  frosted?: boolean;
}

export function GlassPanel({ children, sx, glow, frosted = false }: Props) {
  return (
    <Box
      sx={[
        (t) => ({
          borderRadius: 3,
          border: '1px solid',
          borderColor: t.palette.surface.glassBorder,
          bgcolor: frosted
            ? t.palette.surface.glass
            : t.palette.mode === 'light'
              ? 'rgba(255, 255, 255, 0.92)'
              : 'rgba(15, 23, 42, 0.88)',
          ...(frosted && {
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }),
          boxShadow: glow
            ? `0 0 0 1px ${t.palette.surface.glassBorder}, 0 16px 40px var(--glow-2)`
            : `0 4px 20px ${t.palette.mode === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(0,0,0,0.28)'}`,
        }),
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {children}
    </Box>
  );
}
