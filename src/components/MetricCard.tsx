import { Typography } from '@mui/material';
import { GlassPanel } from '@/components/GlassPanel';

interface Props {
  value: string;
  label: string;
}

export function MetricCard({ value, label }: Props) {
  return (
    <GlassPanel
      sx={{
        position: 'relative',
        overflow: 'hidden',
        px: 2.25,
        py: 1.75,
        minWidth: 0,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        borderColor: 'divider',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: (t) => t.palette.gradient.brand,
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 16px 40px var(--glow-2)',
          borderColor: 'primary.light',
        },
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        lineHeight={1.2}
        sx={{ color: 'primary.main' }}
      >
        {value}
      </Typography>
      <Typography variant="caption" color="text.secondary" fontWeight={600}>
        {label}
      </Typography>
    </GlassPanel>
  );
}
