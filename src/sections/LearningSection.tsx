import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Box, Button, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { LearningEntry } from '@/types/resume';

interface Props {
  entries: LearningEntry[];
}

export function LearningSection({ entries }: Props) {
  return (
    <SectionContainer
      id="learning"
      title="Learning & writing"
      subtitle="Notes I keep as I study and share"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {entries.map((e) => (
          <GlassPanel key={e.id} sx={{ p: { xs: 2.25, sm: 2.75 }, borderColor: 'divider' }}>
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
                <MenuBookOutlinedIcon aria-hidden />
              </Box>
              <Stack spacing={1} sx={{ minWidth: 0 }}>
                <Typography component="h3" fontWeight={700} sx={{ fontSize: '1.05rem' }}>
                  {e.title}
                </Typography>
                <Typography color="text.secondary" sx={{ lineHeight: 1.65 }}>
                  {e.description}
                </Typography>
                <Button
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Open PDF
                </Button>
              </Stack>
            </Stack>
          </GlassPanel>
        ))}
      </Box>
    </SectionContainer>
  );
}
