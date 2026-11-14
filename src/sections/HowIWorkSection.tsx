import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { WorkPrinciple } from '@/types/resume';

const ICONS = {
  architecture: AccountTreeOutlinedIcon,
  quality: VerifiedOutlinedIcon,
  ai: AutoAwesomeOutlinedIcon,
  people: HandshakeOutlinedIcon,
} as const;

interface Props {
  principles: WorkPrinciple[];
}

export function HowIWorkSection({ principles }: Props) {
  return (
    <SectionContainer
      id="how-i-work"
      title="How I work"
      subtitle="The principles I bring to every team I lead"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {principles.map((p) => {
          const Icon = ICONS[p.icon];
          return (
            <GlassPanel
              key={p.id}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                p: { xs: 2.25, sm: 2.75 },
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
                  opacity: 0.6,
                },
                '&:hover': {
                  transform: 'translateY(-3px)',
                  borderColor: 'primary.light',
                  '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
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
                  <Icon aria-hidden />
                </Box>
                <Stack spacing={0.75} sx={{ minWidth: 0 }}>
                  <Typography component="h3" fontWeight={700} sx={{ fontSize: '1.05rem', lineHeight: 1.35 }}>
                    {p.title}
                  </Typography>
                  <Typography color="text.secondary" sx={{ lineHeight: 1.7 }}>
                    {p.description}
                  </Typography>
                </Stack>
              </Stack>
            </GlassPanel>
          );
        })}
      </Box>
    </SectionContainer>
  );
}
