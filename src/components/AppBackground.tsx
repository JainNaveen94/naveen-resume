import { Box, useMediaQuery, useTheme } from '@mui/material';

/**
 * Lightweight ambient background — no filter:blur() (GPU-heavy on scroll).
 * Mesh blobs use soft gradients only; animation only on md+ and when motion allowed.
 */
export function AppBackground() {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const animate = !reduceMotion && !isMobile;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        overflow: 'hidden',
        bgcolor: 'background.default',
        pointerEvents: 'none',
        contain: 'strict',
      }}
    >
      <Box
        className={animate ? 'mesh-blob mesh-blob-1' : undefined}
        sx={{
          position: 'absolute',
          width: 'min(85vw, 720px)',
          height: 'min(85vw, 720px)',
          top: '-20%',
          left: '-12%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, var(--mesh-1) 0%, transparent 62%)',
          opacity: 'var(--mesh-opacity, 0.7)',
          willChange: animate ? 'transform' : 'auto',
        }}
      />
      <Box
        className={animate ? 'mesh-blob mesh-blob-2' : undefined}
        sx={{
          position: 'absolute',
          width: 'min(70vw, 560px)',
          height: 'min(70vw, 560px)',
          top: '8%',
          right: '-8%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, var(--mesh-2) 0%, transparent 62%)',
          opacity: 'var(--mesh-opacity, 0.7)',
          willChange: animate ? 'transform' : 'auto',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 'min(55vw, 480px)',
          height: 'min(55vw, 480px)',
          bottom: '-5%',
          left: '20%',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at center, var(--mesh-3) 0%, transparent 65%)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isLight
            ? 'linear-gradient(180deg, transparent 0%, rgba(248,250,252,0.94) 88%)'
            : 'linear-gradient(180deg, transparent 0%, rgba(3,7,18,0.9) 90%)',
        }}
      />
    </Box>
  );
}
