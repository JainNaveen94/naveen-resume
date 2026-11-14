import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { BrandMark } from '@/components/BrandMark';
import type { ProfileIdentity } from '@/types/resume';
import { NAV_SECTIONS, scrollToSection } from '@/utils/scroll';

interface Props {
  profile: ProfileIdentity;
  tagline: string;
}

const linkSx = {
  color: 'text.secondary',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.95rem',
  cursor: 'pointer',
  background: 'none',
  border: 0,
  p: 0,
  textAlign: 'left',
  font: 'inherit',
  '&:hover': { color: 'primary.main' },
  '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 3, borderRadius: 0.5 },
} as const;

function ColumnTitle({ children }: { children: string }) {
  return (
    <Typography
      variant="overline"
      component="h2"
      sx={{ fontWeight: 800, letterSpacing: '0.12em', color: 'primary.main', display: 'block', mb: 1.5 }}
    >
      {children}
    </Typography>
  );
}

export function SiteFooter({ profile, tagline }: Props) {
  const role = tagline.split('·')[0]?.trim();
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <Box component="footer" sx={{ pt: { xs: 5, md: 8 }, pb: 3 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: (t) =>
              t.palette.mode === 'light' ? 'rgba(255,255,255,0.92)' : 'rgba(15,23,42,0.88)',
            boxShadow: (t) =>
              `0 4px 20px ${t.palette.mode === 'light' ? 'rgba(15,23,42,0.06)' : 'rgba(0,0,0,0.28)'}`,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: (t) => t.palette.gradient.brand,
            },
          }}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1.6fr 1fr 1.2fr' },
              gap: { xs: 4, md: 6 },
              p: { xs: 3, md: 5 },
            }}
          >
            <Box>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <BrandMark size={40} />
                <Box>
                  <Typography fontWeight={700} fontFamily='"Sora", sans-serif' sx={{ fontSize: '1.15rem' }}>
                    {profile.fullName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role}
                  </Typography>
                </Box>
              </Stack>
              <Typography color="text.secondary" sx={{ lineHeight: 1.7, maxWidth: 420, mb: 2.5 }}>
                I lead teams that ship fintech and enterprise products, with architecture,
                quality and AI-assisted delivery in mind. Open to Technical Lead and Architect
                roles.
              </Typography>
              <Button
                variant="contained"
                startIcon={<MailOutlineIcon />}
                onClick={() => scrollToSection('contact')}
              >
                Let’s talk
              </Button>
            </Box>

            <Box component="nav" aria-label="Footer">
              <ColumnTitle>Explore</ColumnTitle>
              <Stack spacing={1.1} alignItems="flex-start" component="ul" sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {NAV_SECTIONS.map((s) => (
                  <li key={s.id}>
                    <Box component="button" type="button" onClick={() => scrollToSection(s.id)} sx={linkSx}>
                      {s.label}
                    </Box>
                  </li>
                ))}
              </Stack>
            </Box>

            <Box>
              <ColumnTitle>Connect</ColumnTitle>
              <Stack spacing={1.4}>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <MailOutlineIcon fontSize="small" color="primary" aria-hidden />
                  <Link href={`mailto:${profile.email}`} sx={{ ...linkSx, wordBreak: 'break-all' }}>
                    {profile.email}
                  </Link>
                </Stack>
                <Stack direction="row" spacing={1.25} alignItems="center">
                  <LocationOnOutlinedIcon fontSize="small" color="primary" aria-hidden />
                  <Typography color="text.secondary" sx={{ fontSize: '0.95rem' }}>
                    {profile.location}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ pt: 0.5 }}>
                  {[
                    { href: profile.linkedIn.url, label: 'LinkedIn', Icon: LinkedInIcon },
                    { href: profile.github.url, label: 'GitHub', Icon: GitHubIcon },
                  ].map(({ href, label, Icon }) => (
                    <IconButton
                      key={label}
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        width: 44,
                        height: 44,
                        border: '1px solid',
                        borderColor: 'divider',
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          borderColor: 'primary.light',
                          bgcolor: (t) => alpha(t.palette.primary.main, 0.08),
                        },
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Box>

          <Divider />

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            justifyContent="space-between"
            spacing={1.5}
            sx={{ px: { xs: 3, md: 5 }, py: 2 }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} {profile.fullName}. Built with React, TypeScript and
              Material UI.
            </Typography>
            <Button
              size="small"
              color="inherit"
              endIcon={<ArrowUpwardIcon fontSize="small" />}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
              }
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              Back to top
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
