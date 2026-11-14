import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { memo, useEffect, useState } from 'react';
import { AccentThemePicker } from '@/components/AccentThemePicker';
import { BrandMark } from '@/components/BrandMark';
import { NAV_SECTIONS, scrollToSection } from '@/utils/scroll';
import { useActiveSection } from '@/hooks/useActiveSection';
import type { AccentPresetId } from '@/theme/accentPresets';

const TRACKED_SECTIONS = ['hero', ...NAV_SECTIONS.map((s) => s.id)];

const touchTarget = {
  minWidth: 44,
  minHeight: 44,
};

interface Props {
  colorMode: 'light' | 'dark';
  onToggleColorMode: () => void;
  onDownloadPdf: () => void;
  pdfLoading: boolean;
  accentId: AccentPresetId;
  customHex: string;
  onSelectAccent: (id: AccentPresetId) => void;
  onCustomAccent: (hex: string) => void;
}

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const theme = useTheme();

  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        minWidth: 0,
        whiteSpace: 'nowrap',
        px: { md: 1, lg: 1.35 },
        py: 1,
        fontSize: '0.875rem',
        fontWeight: active ? 600 : 500,
        letterSpacing: '-0.01em',
        color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
        borderRadius: 0,
        position: 'relative',
        '&::after': {
          content: '""',
          position: 'absolute',
          left: '18%',
          right: '18%',
          bottom: 4,
          height: 2,
          borderRadius: 1,
          background: theme.palette.gradient.brand,
          transform: active ? 'scaleX(1)' : 'scaleX(0)',
          opacity: active ? 1 : 0,
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        },
        '&:hover': {
          color: 'var(--text-primary)',
          bgcolor: 'transparent',
          '&::after': {
            transform: 'scaleX(1)',
            opacity: active ? 1 : 0.45,
          },
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&::after': { transition: 'none' },
        },
      }}
    >
      {label}
    </Button>
  );
}

function SiteHeaderInner({
  colorMode,
  onToggleColorMode,
  onDownloadPdf,
  pdfLoading,
  accentId,
  customHex,
  onSelectAccent,
  onCustomAccent,
}: Props) {
  const theme = useTheme();
  const compactNav = useMediaQuery(theme.breakpoints.down('lg'));
  const narrow = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(TRACKED_SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!compactNav || !open) {
      document.body.classList.remove('drawer-open');
      return;
    }
    document.body.classList.add('drawer-open');
    return () => document.body.classList.remove('drawer-open');
  }, [open, compactNav]);

  useEffect(() => {
    if (!compactNav) setOpen(false);
  }, [compactNav]);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        data-site-header
        sx={{
          pt: 'env(safe-area-inset-top, 0px)',
          bgcolor: scrolled
            ? 'var(--header-bg)'
            : (t) =>
                t.palette.mode === 'light'
                  ? 'rgba(248, 250, 252, 0.55)'
                  : 'rgba(3, 7, 18, 0.45)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'var(--border-subtle)' : 'transparent',
          color: 'var(--text-primary)',
          transition: 'background-color 0.2s ease, border-color 0.2s ease',
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: { xs: 56, md: 64 },
              position: 'relative',
              justifyContent: 'space-between',
              gap: 1.5,
            }}
          >
            <Box
              component="button"
              type="button"
              onClick={() => scrollToSection('hero')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: narrow ? 1 : 1.25,
                border: 0,
                background: 'none',
                cursor: 'pointer',
                p: 0,
                minHeight: 44,
                textAlign: 'left',
                color: 'var(--text-primary)',
                WebkitTextFillColor: 'var(--text-primary)',
                zIndex: 1,
                flexShrink: 1,
                minWidth: 0,
              }}
              aria-label="Go to top"
            >
              <BrandMark size={narrow ? 32 : 34} />
              <Box sx={{ display: { xs: 'none', sm: 'block' }, minWidth: 0 }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  sx={{
                    fontFamily: '"Sora", sans-serif',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'inherit',
                    fontSize: narrow ? '0.9rem' : '0.95rem',
                    maxWidth: { xs: 140, sm: 200, lg: 'none' },
                  }}
                >
                  Naveen Jain
                </Typography>
              </Box>
            </Box>

            {!compactNav && (
              <Box
                component="nav"
                aria-label="Primary"
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  maxWidth: 'min(62vw, 720px)',
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {NAV_SECTIONS.map((s) => (
                  <NavLink
                    key={s.id}
                    label={s.label}
                    active={activeSection === s.id}
                    onClick={() => go(s.id)}
                  />
                ))}
              </Box>
            )}

            <Stack
              direction="row"
              alignItems="center"
              spacing={0}
              sx={{ zIndex: 1, flexShrink: 0 }}
            >
              {!compactNav && (
                <>
                  <AccentThemePicker
                    variant="toolbar"
                    accentId={accentId}
                    customHex={customHex}
                    onSelectPreset={onSelectAccent}
                    onCustomHex={onCustomAccent}
                  />
                  <IconButton
                    aria-label="Toggle color mode"
                    onClick={onToggleColorMode}
                    size="small"
                    sx={{
                      ...touchTarget,
                      color: 'var(--text-secondary)',
                      '&:hover': {
                        color: 'var(--text-primary)',
                        bgcolor: (t) =>
                          alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.08 : 0.14),
                      },
                    }}
                  >
                    {colorMode === 'light' ? (
                      <DarkModeOutlinedIcon fontSize="small" />
                    ) : (
                      <LightModeOutlinedIcon fontSize="small" />
                    )}
                  </IconButton>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={onDownloadPdf}
                    disabled={pdfLoading}
                    startIcon={<DownloadOutlinedIcon />}
                    sx={{
                      display: { xs: 'none', sm: 'inline-flex' },
                      ml: 0.5,
                      px: 2,
                      minHeight: 40,
                      boxShadow: 'none',
                      '&:hover': { boxShadow: '0 8px 24px var(--glow-1)' },
                    }}
                  >
                    {pdfLoading ? '…' : 'Resume'}
                  </Button>
                </>
              )}

              {compactNav && (
                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="Open menu"
                  aria-expanded={open}
                  sx={{
                    ...touchTarget,
                    color: 'var(--text-primary)',
                    ml: 0.5,
                  }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 320 },
            maxWidth: '100vw',
            bgcolor: 'background.paper',
            pt: 'env(safe-area-inset-top, 0px)',
            pb: 'env(safe-area-inset-bottom, 0px)',
          },
        }}
      >
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 2, minHeight: 44 }}
          >
            <Stack direction="row" spacing={1.25} alignItems="center" sx={{ minWidth: 0 }}>
              <BrandMark size={36} />
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="subtitle1" fontWeight={700} noWrap>
                  Naveen Jain
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Navigate
                </Typography>
              </Box>
            </Stack>
            <IconButton
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              edge="end"
              sx={touchTarget}
            >
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1.25} sx={{ mb: 2 }}>
            <Button
              variant="contained"
              fullWidth
              size="large"
              startIcon={<DownloadOutlinedIcon />}
              onClick={() => {
                onDownloadPdf();
                setOpen(false);
              }}
              disabled={pdfLoading}
              sx={{ minHeight: 48, py: 1.25 }}
            >
              {pdfLoading ? 'Generating…' : 'Download resume'}
            </Button>
          </Stack>

          <List disablePadding sx={{ flex: 1, overflowY: 'auto', mx: -0.5 }}>
            {NAV_SECTIONS.map((s) => {
              const selected = activeSection === s.id;
              return (
                <ListItemButton
                  key={s.id}
                  onClick={() => go(s.id)}
                  sx={{
                    py: 1.5,
                    minHeight: 48,
                    borderRadius: 2,
                    mb: 0.25,
                    borderLeft: '3px solid',
                    borderColor: selected ? 'primary.main' : 'transparent',
                    pl: 2,
                    ...(selected && {
                      bgcolor: (t) =>
                        alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.06 : 0.12),
                    }),
                  }}
                >
                  <ListItemText
                    primary={s.label}
                    primaryTypographyProps={{
                      fontWeight: selected ? 700 : 500,
                      fontSize: '1rem',
                    }}
                  />
                </ListItemButton>
              );
            })}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.25}>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<MailOutlineIcon />}
              onClick={() => go('contact')}
              sx={{ minHeight: 48 }}
            >
              Contact
            </Button>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 0.5,
                py: 0.5,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Appearance
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.25}>
                <AccentThemePicker
                  variant="toolbar"
                  accentId={accentId}
                  customHex={customHex}
                  onSelectPreset={onSelectAccent}
                  onCustomHex={onCustomAccent}
                />
                <IconButton
                  aria-label="Toggle color mode"
                  onClick={onToggleColorMode}
                  sx={touchTarget}
                >
                  {colorMode === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
                </IconButton>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}

export const SiteHeader = memo(SiteHeaderInner);
