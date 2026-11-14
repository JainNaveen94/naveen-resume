import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  Container,
  Grid2 as Grid,
  Stack,
  Typography,
} from '@mui/material';
import { DynamicHeroVisual } from '@/components/DynamicHeroVisual';
import { MetricCard } from '@/components/MetricCard';
import type { ResumeData } from '@/types/resume';
import { scrollToSection } from '@/utils/scroll';

interface Props {
  data: ResumeData;
  onDownloadPdf: () => void;
  pdfLoading: boolean;
}

export function HeroSection({
  data,
  onDownloadPdf,
  pdfLoading,
}: Props) {
  const roleLine = data.variant.tagline.includes('·')
    ? data.variant.tagline.split('·')[0].trim()
    : data.variant.tagline;
  const taglineDetail = data.variant.tagline.includes('·')
    ? data.variant.tagline
        .split('·')
        .slice(1)
        .map((s) => s.trim())
        .filter(Boolean)
        .join(' · ')
    : '';

  const introBlock = (
    <>
      <Stack direction="row" alignItems="center" spacing={1.25} sx={{ mb: 1.5 }}>
        <Box
          component="span"
          aria-hidden
          sx={{
            fontSize: { xs: '1.6rem', md: '2rem' },
            lineHeight: 1,
            display: 'inline-block',
            transformOrigin: '70% 70%',
            animation: 'hero-wave 2.4s ease-in-out 0.6s 2',
            '@keyframes hero-wave': {
              '0%, 60%, 100%': { transform: 'rotate(0deg)' },
              '10%, 30%': { transform: 'rotate(14deg)' },
              '20%, 40%': { transform: 'rotate(-8deg)' },
              '50%': { transform: 'rotate(10deg)' },
            },
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
          }}
        >
          👋
        </Box>
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2.1rem' },
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'text.primary',
          }}
        >
          Hello, I’m
        </Typography>
      </Stack>
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4.75rem' },
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: '-0.03em',
          mb: 2,
          background: (t) => t.palette.gradient.brand,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          color: 'transparent',
          width: 'fit-content',
          maxWidth: '100%',
          pb: 0.5,
        }}
      >
        {data.profile.fullName}
      </Typography>
      <Typography
        variant="h4"
        component="p"
        sx={{
          fontWeight: 700,
          mb: taglineDetail ? 0.75 : 2,
          maxWidth: 640,
          fontSize: { xs: '1.4rem', sm: '1.65rem', md: '1.9rem' },
          lineHeight: 1.25,
          color: 'text.primary',
        }}
      >
        {roleLine}
      </Typography>
      {taglineDetail ? (
        <Typography
          component="p"
          sx={{
            mb: 2.5,
            maxWidth: 640,
            fontWeight: 600,
            fontSize: { xs: '1rem', md: '1.1rem' },
            color: 'primary.main',
          }}
        >
          {taglineDetail}
        </Typography>
      ) : null}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontSize: { xs: '1.0625rem', md: '1.15rem' }, maxWidth: 640, lineHeight: 1.75 }}
      >
        {data.variant.heroHeadline}
      </Typography>
    </>
  );

  const metricsAndCtas = (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 1.5,
          width: '100%',
        }}
      >
        {data.metrics.map((m) => (
          <MetricCard key={m.label} value={m.value} label={m.label} />
        ))}
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
      >
        <Button
          variant="contained"
          size="large"
          startIcon={<MailOutlineIcon />}
          onClick={() => scrollToSection('contact')}
        >
          Get in touch
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<DownloadOutlinedIcon />}
          onClick={onDownloadPdf}
          disabled={pdfLoading}
        >
          {pdfLoading ? 'Generating…' : 'Download resume'}
        </Button>
      </Stack>
    </>
  );

  return (
    <Box
      id="hero"
      sx={{
        pt: {
          xs: 'calc(4.5rem + env(safe-area-inset-top, 0px) + 1.5rem)',
          md: 'calc(4rem + env(safe-area-inset-top, 0px) + 2rem)',
        },
        pb: { xs: 6, sm: 8, md: 10 },
        scrollMarginTop: 'calc(4.5rem + env(safe-area-inset-top, 0px))',
        position: 'relative',
        contentVisibility: 'auto',
        containIntrinsicSize: '0 640px',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              {introBlock}
              {metricsAndCtas}
            </Stack>
          </Grid>

          <Grid
            size={{ xs: 12, md: 5 }}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-end' },
              alignItems: 'center',
            }}
          >
            <DynamicHeroVisual />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
