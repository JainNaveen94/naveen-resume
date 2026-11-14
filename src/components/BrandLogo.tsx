import { Box, Typography, useTheme } from '@mui/material';
import { BrandMark } from '@/components/BrandMark';

const SIZES = {
  sm: 32,
  md: 40,
  lg: 72,
  xl: 120,
} as const;

type Size = keyof typeof SIZES;

interface Props {
  size?: Size;
  showWordmark?: boolean;
  tagline?: string;
  onClick?: () => void;
}

export function BrandLogo({
  size = 'md',
  showWordmark = false,
  tagline,
  onClick,
}: Props) {
  const theme = useTheme();
  const px = SIZES[size];

  return (
    <Box
      component={onClick ? 'button' : 'div'}
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1.25,
        border: 'none',
        background: 'none',
        p: 0,
        cursor: onClick ? 'pointer' : 'default',
        textAlign: 'left',
      }}
      aria-label={onClick ? 'Go to top' : undefined}
    >
      <BrandMark
        size={px}
        decorative={!showWordmark}
        sx={{
          filter:
            theme.palette.mode === 'dark'
              ? 'drop-shadow(0 4px 12px var(--glow-1, rgba(34,211,238,0.35)))'
              : 'drop-shadow(0 4px 10px rgba(26,34,80,0.2))',
        }}
      />
      {showWordmark ? (
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: size === 'sm' ? '1.1rem' : '1.35rem',
              lineHeight: 1.1,
              color: 'text.primary',
            }}
          >
            Naveen Jain
          </Typography>
          {tagline ? (
            <Typography
              variant="caption"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                display: 'block',
                mt: 0.25,
              }}
            >
              {tagline.length > 42
                ? 'Technical Lead'
                : tagline.split('·')[0]?.trim() ?? 'Technical Lead'}
            </Typography>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}
