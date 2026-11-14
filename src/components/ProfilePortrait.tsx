import { Box, Typography, type SxProps, type Theme, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';

export const HEADSHOT_SRC = '/images/naveen-headshot.png';

const SIZES = {
  sm: 80,
  md: 128,
  lg: 200,
  hero: 280,
} as const;

type Size = keyof typeof SIZES;

export type PortraitPresentation = 'editorial' | 'badge' | 'duke';

interface Props {
  name: string;
  size?: Size;
  presentation?: PortraitPresentation;
  role?: string;
  /** Stretch to parent column (desktop hero) */
  fillHeight?: boolean;
  priority?: boolean;
  sx?: SxProps<Theme>;
}

export function ProfilePortrait({
  name,
  size = 'md',
  presentation = 'editorial',
  role,
  fillHeight = false,
  priority = false,
  sx,
}: Props) {
  const theme = useTheme();
  const px = SIZES[size];
  const a1 = theme.palette.primary.light;
  const a3 = theme.palette.secondary.main;
  const isLight = theme.palette.mode === 'light';

  if (presentation === 'badge') {
    const pad = 2.5;
    return (
      <Box
        sx={[
          { display: 'inline-flex', flexDirection: 'column', alignItems: 'center' },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        <Box
          sx={{
            p: `${pad}px`,
            borderRadius: 3,
            background: theme.palette.gradient.brand,
            boxShadow: `0 8px 24px var(--glow-2)`,
          }}
        >
          <Box
            sx={{
              width: px,
              height: px,
              borderRadius: 2.5,
              overflow: 'hidden',
              bgcolor: isLight ? '#f8fafc' : '#0f172a',
            }}
          >
            <Box
              component="img"
              src={HEADSHOT_SRC}
              alt={name}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: '50% 18%',
                display: 'block',
              }}
            />
          </Box>
        </Box>
        {role ? (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, fontWeight: 600 }}>
            {role}
          </Typography>
        ) : null}
      </Box>
    );
  }

  if (presentation === 'duke') {
    return (
      <Box
        sx={[
          {
            width: '100%',
            maxWidth: fillHeight ? 460 : px + 80,
            ml: fillHeight ? { md: 'auto' } : undefined,
            ...(fillHeight
              ? { height: '100%', minHeight: { md: 400 }, display: 'flex' }
              : { aspectRatio: '3 / 4', maxHeight: 420 }),
          },
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        <Box
          component="img"
          src={HEADSHOT_SRC}
          alt={name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sx={{
            width: '100%',
            height: fillHeight ? '100%' : '100%',
            objectFit: 'cover',
            objectPosition: '50% 16%',
            display: 'block',
            borderRadius: 2,
            boxShadow: isLight
              ? '0 16px 40px rgba(15, 23, 42, 0.14)'
              : '0 20px 48px rgba(0, 0, 0, 0.4)',
          }}
        />
      </Box>
    );
  }

  const editorialShell = {
    position: 'relative' as const,
    width: '100%',
    maxWidth: fillHeight ? 380 : px,
    mx: fillHeight ? { md: 'auto', xs: 'auto' } : 'auto',
    ...(fillHeight
      ? {
          height: '100%',
          minHeight: { md: 440, xs: 0 },
          display: 'flex',
          flexDirection: 'column',
        }
      : { aspectRatio: '4 / 5', maxHeight: size === 'lg' ? 360 : 440 }),
  };

  return (
    <Box
      sx={[
        editorialShell,
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
    >
      {/* Accent halo (founder-style depth, no thick frame) */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: fillHeight ? '8% 12% 4% 8%' : '10% 6% 6% 10%',
          borderRadius: 4,
          background: `linear-gradient(145deg, ${alpha(a1, isLight ? 0.35 : 0.45)}, ${alpha(a3, isLight ? 0.28 : 0.38)})`,
          filter: 'blur(28px)',
          opacity: 0.9,
          zIndex: 0,
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: fillHeight ? 12 : 8,
          right: fillHeight ? 20 : 12,
          width: fillHeight ? '42%' : '38%',
          height: fillHeight ? '18%' : '16%',
          borderRadius: 999,
          border: '1px solid',
          borderColor: alpha(a1, 0.35),
          opacity: 0.65,
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          flex: fillHeight ? 1 : undefined,
          minHeight: fillHeight ? 0 : undefined,
          height: fillHeight ? '100%' : '100%',
          borderRadius: { xs: 3, md: 3.5 },
          overflow: 'hidden',
          border: '1px solid',
          borderColor: isLight ? alpha('#0f172a', 0.08) : alpha('#fff', 0.12),
          boxShadow: isLight
            ? '0 24px 48px rgba(15, 23, 42, 0.12), 0 8px 20px rgba(15, 23, 42, 0.06)'
            : '0 28px 56px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.06)',
          bgcolor: isLight
            ? `linear-gradient(180deg, ${alpha(a1, 0.08)} 0%, #f1f5f9 55%, #e2e8f0 100%)`
            : `linear-gradient(180deg, ${alpha(a3, 0.12)} 0%, #0f172a 50%, #030712 100%)`,
        }}
      >
        <Box
          component="img"
          src={HEADSHOT_SRC}
          alt={name}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '48% 6%',
            display: 'block',
            transform: 'scale(1.08)',
          }}
        />
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            background: isLight
              ? 'linear-gradient(to top, rgba(15,23,42,0.12) 0%, transparent 42%)'
              : 'linear-gradient(to top, rgba(3,7,18,0.35) 0%, transparent 48%)',
            pointerEvents: 'none',
          }}
        />
      </Box>
      {role ? (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 1.25, fontWeight: 600, textAlign: 'center', position: 'relative', zIndex: 2 }}
        >
          {role}
        </Typography>
      ) : null}
    </Box>
  );
}
