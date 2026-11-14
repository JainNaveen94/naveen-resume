import { Box, type SxProps, type Theme, useTheme } from '@mui/material';
import { useId } from 'react';

interface Props {
  size?: number;
  sx?: SxProps<Theme>;
  /** Set false when the parent control already has an accessible name */
  decorative?: boolean;
}

/** NJ monogram — navy tile with accent-driven J stroke (matches theme picker). */
export function BrandMark({ size = 40, sx, decorative = true }: Props) {
  const theme = useTheme();
  const uid = useId().replace(/:/g, '');
  const tileId = `nj-tile-${uid}`;
  const jId = `nj-j-${uid}`;
  const a1 = theme.palette.primary.light;
  const a3 = theme.palette.secondary.main;

  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : 'Naveen Jain'}
      sx={{ display: 'block', flexShrink: 0, ...sx }}
    >
      <defs>
        <linearGradient
          id={tileId}
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1A2250" />
          <stop offset="1" stopColor="#070A18" />
        </linearGradient>
        <linearGradient
          id={jId}
          gradientUnits="userSpaceOnUse"
          x1="44"
          y1="24"
          x2="70"
          y2="80"
        >
          <stop offset="0" stopColor={a1} />
          <stop offset="1" stopColor={a3} />
        </linearGradient>
      </defs>
      <rect width="100" height="100" rx="26" fill={`url(#${tileId})`} />
      <g
        transform="translate(6,-2)"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M24 60V24L64 60" stroke="#F8FAFC" />
        <path d="M64 24V68a12 12 0 0 1-12 12H40" stroke={`url(#${jId})`} />
      </g>
    </Box>
  );
}
