import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  Alert,
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { ProfileIdentity } from '@/types/resume';
import { submitContact } from '@/utils/contact';

const schema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  message: z.string().min(20, 'Message should be at least 20 characters'),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  profile: ProfileIdentity;
}

function phoneTel(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function ContactMethod({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <Stack direction="row" spacing={1.5} alignItems="flex-start">
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
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
        {icon}
      </Box>
      <Stack spacing={0.25} sx={{ minWidth: 0, pt: 0.35 }}>
        <Typography variant="overline" sx={{ fontWeight: 800, letterSpacing: '0.1em', lineHeight: 1.2 }}>
          {label}
        </Typography>
        <Typography fontWeight={600} sx={{ lineHeight: 1.45, wordBreak: 'break-word' }}>
          {value}
        </Typography>
      </Stack>
    </Stack>
  );

  if (href) {
    return (
      <Box
        component="a"
        href={href}
        sx={{
          display: 'block',
          textDecoration: 'none',
          color: 'inherit',
          borderRadius: 2.5,
          p: 1.25,
          mx: -1.25,
          transition: 'background-color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            bgcolor: (t) =>
              alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.06 : 0.12),
            transform: 'translateX(4px)',
            '@media (prefers-reduced-motion: reduce)': {
              transform: 'none',
            },
          },
          '&:focus-visible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: 2,
          },
        }}
      >
        {inner}
      </Box>
    );
  }

  return <Box sx={{ p: 1.25, mx: -1.25 }}>{inner}</Box>;
}

const panelSx = {
  position: 'relative',
  overflow: 'hidden',
  p: { xs: 2.5, md: 3 },
  height: '100%',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: (t: { palette: { gradient: { brand: string } } }) => t.palette.gradient.brand,
  },
} as const;

export function ContactSection({ profile }: Props) {
  const [status, setStatus] = useState<{
    type: 'success' | 'info';
    message: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    setStatus(null);
    const result = await submitContact(values, profile.email);
    if (result.ok && result.channel === 'formspree') {
      setStatus({
        type: 'success',
        message: 'Thanks — your message was sent successfully.',
      });
      reset();
    } else if (result.ok && result.channel === 'mailto') {
      setStatus({
        type: 'info',
        message:
          'Opening your email app so you can send the message directly.',
      });
    } else {
      setStatus({
        type: 'info',
        message: 'Something went wrong. Try email directly.',
      });
    }
  });

  return (
    <SectionContainer
      id="contact"
      title="Contact"
      subtitle="Open to Technical Lead and Architect roles. Send a message and I’ll reply by email."
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' },
          gap: 2.5,
          alignItems: 'stretch',
        }}
      >
        <GlassPanel
          sx={{
            ...panelSx,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              borderColor: 'primary.light',
              boxShadow: (t) =>
                `0 12px 32px ${alpha(
                  t.palette.primary.main,
                  t.palette.mode === 'light' ? 0.14 : 0.3,
                )}`,
            },
          }}
        >
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              <MailOutlineIcon color="primary" />
              <Typography fontWeight={700}>Direct contact</Typography>
            </Stack>

            <Stack spacing={1}>
              <ContactMethod
                icon={<LocationOnOutlinedIcon fontSize="small" aria-hidden />}
                label="Location"
                value={profile.location}
              />
              <ContactMethod
                icon={<PhoneOutlinedIcon fontSize="small" aria-hidden />}
                label="Phone"
                value={profile.phone}
                href={phoneTel(profile.phone)}
              />
              <ContactMethod
                icon={<AlternateEmailOutlinedIcon fontSize="small" aria-hidden />}
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
            </Stack>

            <Typography variant="overline" sx={{ fontWeight: 800, color: 'primary.main', pt: 0.5 }}>
              Profiles
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25}>
              <Button
                component="a"
                href={profile.linkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                startIcon={<LinkedInIcon />}
                sx={{ justifyContent: 'flex-start', py: 1.1 }}
              >
                LinkedIn
              </Button>
              <Button
                component="a"
                href={profile.github.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                fullWidth
                startIcon={<GitHubIcon />}
                sx={{ justifyContent: 'flex-start', py: 1.1 }}
              >
                GitHub
              </Button>
            </Stack>
          </Stack>
        </GlassPanel>

        <GlassPanel
          glow
          sx={{
            ...panelSx,
          }}
        >
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2.5 }}>
            <SendOutlinedIcon color="primary" />
            <Typography fontWeight={700}>Send a message</Typography>
          </Stack>

          <Box component="form" onSubmit={onSubmit} noValidate>
            <Stack spacing={2}>
              <TextField
                label="Name"
                fullWidth
                {...register('name')}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                {...register('email')}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AlternateEmailOutlinedIcon fontSize="small" color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Message"
                fullWidth
                multiline
                minRows={4}
                {...register('message')}
                error={Boolean(errors.message)}
                helperText={errors.message?.message}
                placeholder="What would you like to discuss?"
              />
              {status ? (
                <Alert severity={status.type === 'success' ? 'success' : 'info'}>
                  {status.message}
                </Alert>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                startIcon={<SendOutlinedIcon />}
              >
                {isSubmitting ? 'Sending…' : 'Send message'}
              </Button>
            </Stack>
          </Box>
        </GlassPanel>
      </Box>
    </SectionContainer>
  );
}
