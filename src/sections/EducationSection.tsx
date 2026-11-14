import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { EducationEntry } from '@/types/resume';

interface Props {
  education: EducationEntry[];
}

function EducationCard({
  edu,
  featured,
}: {
  edu: EducationEntry;
  featured?: boolean;
}) {
  return (
    <GlassPanel
      glow={featured}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: { xs: 2.25, sm: 2.75 },
        transition:
          'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        borderColor: featured ? 'primary.light' : 'divider',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: (t) => t.palette.gradient.brand,
          opacity: featured ? 1 : 0.45,
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: 'primary.light',
          boxShadow: (t) =>
            `0 14px 36px ${alpha(
              t.palette.primary.main,
              t.palette.mode === 'light' ? 0.2 : 0.38,
            )}`,
          '@media (prefers-reduced-motion: reduce)': {
            transform: 'none',
          },
        },
      }}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: (t) => t.palette.gradient.brandSoft,
            border: '1px solid',
            borderColor: (t) => alpha(t.palette.primary.main, 0.25),
            color: 'primary.main',
          }}
        >
          <SchoolOutlinedIcon aria-hidden />
        </Box>
        <Stack spacing={1} sx={{ minWidth: 0 }}>
          <Typography fontWeight={700} sx={{ fontSize: '1.05rem', lineHeight: 1.35 }}>
            {edu.degree}
          </Typography>
          <Typography color="primary.main" fontWeight={600} sx={{ lineHeight: 1.5 }}>
            {edu.institution}
          </Typography>
          <Chip
            label={edu.period}
            size="small"
            variant="outlined"
            sx={{
              alignSelf: 'flex-start',
              fontWeight: 600,
              borderColor: 'divider',
            }}
          />
        </Stack>
      </Stack>
    </GlassPanel>
  );
}

export function EducationSection({ education }: Props) {
  return (
    <SectionContainer
      id="education"
      title="Education"
      subtitle="Formal training in computer applications"
    >
      <Box
        sx={{
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          '&::before': {
            content: '""',
            display: { xs: 'none', md: education.length > 1 ? 'block' : 'none' },
            position: 'absolute',
            top: 28,
            bottom: 28,
            left: '50%',
            width: 2,
            transform: 'translateX(-50%)',
            background: (t) => t.palette.gradient.brand,
            opacity: 0.2,
            borderRadius: 1,
          },
        }}
      >
        {education.map((edu, index) => (
          <EducationCard key={edu.degree} edu={edu} featured={index === 0} />
        ))}
      </Box>
    </SectionContainer>
  );
}
