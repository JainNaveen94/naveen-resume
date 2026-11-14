import { Stack, Typography, type SxProps, type Theme } from '@mui/material';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { SummaryBlock } from '@/types/resume';

interface Props {
  summary: SummaryBlock;
}

const aboutCardSx: SxProps<Theme> = {
  position: 'relative',
  overflow: 'hidden',
  p: { xs: 3, md: 3.5 },
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
};

export function AboutSection({ summary }: Props) {
  return (
    <SectionContainer
      id="about"
      title="About"
      subtitle="Professional summary"
    >
      <GlassPanel sx={aboutCardSx}>
        <Stack spacing={2.5}>
          {summary.paragraphs.map((p, i) => (
            <Typography
              key={i}
              color="text.secondary"
              sx={{
                lineHeight: 1.75,
                fontSize: '1.015rem',
                ...(i === 0
                  ? {
                      color: 'text.primary',
                      fontWeight: 500,
                    }
                  : {}),
              }}
            >
              {p}
            </Typography>
          ))}
        </Stack>
      </GlassPanel>
    </SectionContainer>
  );
}
