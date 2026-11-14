import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { AchievementEntry } from '@/types/resume';

const ICONS = {
  award: EmojiEventsOutlinedIcon,
  team: GroupsOutlinedIcon,
  quality: VerifiedOutlinedIcon,
  star: StarOutlineIcon,
} as const;

const ICON_LABELS: Record<keyof typeof ICONS, string> = {
  award: 'Recognition',
  team: 'Leadership',
  quality: 'Quality',
  star: 'Client impact',
};

interface Props {
  achievements: AchievementEntry[];
}

function AchievementCard({
  entry,
  featured,
}: {
  entry: AchievementEntry;
  featured?: boolean;
}) {
  const iconKey = entry.icon ?? 'star';
  const Icon = ICONS[iconKey];
  const category = ICON_LABELS[iconKey];

  return (
    <GlassPanel
      glow={featured}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: { xs: 2.25, sm: 2.75 },
        display: 'flex',
        flexDirection: 'column',
        transition:
          'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        borderColor: featured ? 'primary.light' : 'divider',
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        },
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
          '& .achievement-icon': {
            transform: 'scale(1.05)',
            boxShadow: (t) =>
              `0 8px 24px ${alpha(t.palette.primary.main, 0.35)}`,
          },
        },
      }}
    >
      <Stack spacing={2} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
          <Box
            className="achievement-icon"
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
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '@media (prefers-reduced-motion: reduce)': {
                transition: 'none',
              },
            }}
          >
            <Icon fontSize="medium" aria-hidden />
          </Box>
          <Stack spacing={0.5} sx={{ minWidth: 0, pt: 0.25 }}>
            <Typography
              variant="overline"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'primary.main',
                lineHeight: 1.2,
              }}
            >
              {category}
            </Typography>
            <Typography fontWeight={700} sx={{ fontSize: '1.05rem', lineHeight: 1.35 }}>
              {entry.title}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.65, flexGrow: 1 }}
        >
          {entry.description}
        </Typography>
      </Stack>
    </GlassPanel>
  );
}

export function AchievementsSection({ achievements }: Props) {
  return (
    <SectionContainer
      id="achievements"
      title="Key achievements"
      subtitle="Recognition, delivery impact, and engineering standards"
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
        }}
      >
        {achievements.map((a, index) => (
          <Box
            key={a.id}
            sx={{
              gridColumn: {
                md: index === 0 && achievements.length > 1 ? '1 / -1' : 'auto',
              },
              maxWidth: index === 0 ? { md: '100%' } : undefined,
            }}
          >
            <AchievementCard entry={a} featured={index === 0} />
          </Box>
        ))}
      </Box>
    </SectionContainer>
  );
}
