import { Box, Typography, useTheme } from '@mui/material';
import { useId } from 'react';
import { GlassPanel } from '@/components/GlassPanel';

const STAGES = [
  { key: 'build', label: 'Build', x: 52 },
  { key: 'lead', label: 'Lead', x: 150 },
  { key: 'ship', label: 'Ship', x: 248 },
] as const;

/** Hero visual: delivery pipeline — architecture → leadership → release. */
export function DynamicHeroVisual() {
  const theme = useTheme();
  const uid = useId().replace(/:/g, '');
  const flowId = `hero-flow-${uid}`;
  const hubId = `hero-hub-${uid}`;
  const shipId = `hero-ship-${uid}`;

  const a1 = theme.palette.primary.light;
  const a2 = theme.palette.primary.main;
  const a3 = theme.palette.secondary.main;
  const line =
    theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.22)' : 'rgba(255, 255, 255, 0.28)';
  const lineSoft =
    theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.1)' : 'rgba(255, 255, 255, 0.1)';
  const fillSoft =
    theme.palette.mode === 'light' ? 'rgba(15, 23, 42, 0.04)' : 'rgba(255, 255, 255, 0.06)';

  return (
    <GlassPanel
      glow
      sx={{
        p: { xs: 2.5, md: 3 },
        width: '100%',
        maxWidth: { xs: '100%', sm: 400 },
        mx: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        component="svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 220"
        role="img"
        aria-labelledby={`${uid}-title`}
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      >
        <title id={`${uid}-title`}>Build, lead, and ship — delivery from architecture to release</title>
        <defs>
          <linearGradient id={flowId} x1="40" y1="120" x2="260" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={a1} stopOpacity="0.9" />
            <stop offset="0.5" stopColor={a2} />
            <stop offset="1" stopColor={a3} stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={hubId} x1="130" y1="95" x2="170" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={a1} />
            <stop offset="1" stopColor={a3} />
          </linearGradient>
          <linearGradient id={shipId} x1="220" y1="70" x2="275" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor={a2} />
            <stop offset="1" stopColor={a3} />
          </linearGradient>
        </defs>

        {/* subtle blueprint grid */}
        {Array.from({ length: 7 }).map((_, row) =>
          Array.from({ length: 10 }).map((__, col) => (
            <circle
              key={`${row}-${col}`}
              cx={20 + col * 28}
              cy={24 + row * 28}
              r="1"
              fill={lineSoft}
            />
          )),
        )}

        {/* shared delivery path */}
        <path
          d="M 52 168 C 95 168, 105 138, 150 128 C 195 118, 205 98, 248 88"
          fill="none"
          stroke={`url(#${flowId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="6 5"
          opacity={0.85}
        />
        <polygon points="248,88 240,92 242,82" fill={a3} opacity={0.9} />

        {/* —— Build: stacked system layers —— */}
        <g transform="translate(52, 118)">
          <rect x="-34" y="28" width="68" height="14" rx="4" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <rect x="-30" y="12" width="60" height="14" rx="4" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <rect
            x="-26"
            y="-4"
            width="52"
            height="14"
            rx="4"
            fill={theme.palette.mode === 'light' ? `${a1}18` : `${a1}22`}
            stroke={a1}
            strokeWidth="1.5"
            strokeOpacity={0.7}
          />
          <path
            d="M -8 34 v-46 M 0 34 v-46 M 8 34 v-46"
            stroke={lineSoft}
            strokeWidth="1"
            strokeDasharray="2 3"
          />
          <rect x="-6" y="42" width="12" height="3" rx="1.5" fill={a2} opacity={0.55} />
        </g>

        {/* —— Lead: hub orchestrating nodes —— */}
        <g>
          <line x1="150" y1="128" x2="118" y2="82" stroke={line} strokeWidth="1.25" />
          <line x1="150" y1="128" x2="182" y2="82" stroke={line} strokeWidth="1.25" />
          <line x1="150" y1="128" x2="118" y2="158" stroke={line} strokeWidth="1.25" />
          <line x1="150" y1="128" x2="182" y2="158" stroke={line} strokeWidth="1.25" />
          <circle cx="118" cy="82" r="10" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <circle cx="182" cy="82" r="10" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <circle cx="118" cy="158" r="10" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <circle cx="182" cy="158" r="10" fill={fillSoft} stroke={line} strokeWidth="1.25" />
          <circle cx="150" cy="128" r="16" fill={`url(#${hubId})`} opacity={0.35} />
          <circle
            cx="150"
            cy="128"
            r="16"
            fill="none"
            stroke={`url(#${hubId})`}
            strokeWidth="2"
          />
          <circle cx="150" cy="128" r="5" fill={a1} />
        </g>

        {/* —— Ship: release / production signal —— */}
        <g transform="translate(248, 72)">
          <path
            d="M -22 36 h 44 a 6 6 0 0 0 6 -6 V 8 a 6 6 0 0 0 -6 -6 H -22 a 6 6 0 0 0 -6 6 v 22 a 6 6 0 0 0 6 6 z"
            fill={fillSoft}
            stroke={line}
            strokeWidth="1.25"
          />
          <path
            d="M -14 14 h 28 M -14 22 h 20"
            stroke={lineSoft}
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <circle cx="14" cy="20" r="8" fill={`url(#${shipId})`} opacity={0.35} />
          <circle cx="14" cy="20" r="8" fill="none" stroke={`url(#${shipId})`} strokeWidth="1.75" />
          <path
            d="M 11 20 l 2.5 2.5 L 18 16"
            fill="none"
            stroke={theme.palette.mode === 'light' ? '#0f172a' : '#f8fafc'}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 8 -8 C 18 -18, 28 -12, 34 -2"
            fill="none"
            stroke={`url(#${shipId})`}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <polygon points="34,-2 28,0 32,6" fill={a3} />
        </g>

        {/* stage labels */}
        {STAGES.map(({ key, label, x }) => (
          <text
            key={key}
            x={x}
            y={204}
            textAnchor="middle"
            fill={line}
            fontSize="11"
            fontWeight="600"
            fontFamily={'"Plus Jakarta Sans", system-ui, sans-serif'}
            letterSpacing="0.12em"
          >
            {label.toUpperCase()}
          </text>
        ))}
      </Box>

      <Typography
        align="center"
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1.5, px: 1, lineHeight: 1.5, fontSize: '0.8125rem' }}
      >
        Architecture, team delivery, and production releases — end to end.
      </Typography>
    </GlassPanel>
  );
}
