import { Box, Container, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { GlassPanel } from '@/components/GlassPanel';

interface Props {
  id: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
  tone?: 'default' | 'muted';
}

export function SectionContainer({
  id,
  title,
  subtitle,
  children,
  tone = 'default',
}: Props) {
  const inner = (
    <>
      <Box sx={{ mb: subtitle ? 1.5 : 3 }}>
        <Box
          sx={{
            width: 48,
            height: 4,
            borderRadius: 2,
            background: (t) => t.palette.gradient.brand,
            mb: 1.5,
          }}
          aria-hidden
        />
        <Typography
          variant="h2"
          component="h2"
          sx={{ fontSize: { xs: '1.75rem', md: '2.125rem' } }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle ? (
        <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 640, lineHeight: 1.65 }}>
          {subtitle}
        </Typography>
      ) : null}
      {children}
    </>
  );

  return (
    <Box
      id={id}
      component="section"
      sx={{
        py: { xs: 5, sm: 6, md: 9 },
        scrollMarginTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
        contentVisibility: 'auto',
        containIntrinsicSize: '0 500px',
      }}
    >
      <Container maxWidth="lg">
        {tone === 'muted' ? (
          <GlassPanel sx={{ p: { xs: 3, md: 4 } }}>{inner}</GlassPanel>
        ) : (
          inner
        )}
      </Container>
    </Box>
  );
}
