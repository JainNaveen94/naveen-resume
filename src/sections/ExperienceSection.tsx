import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {
  Box,
  Chip,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useId, useState } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { ExperienceEntry } from '@/types/resume';

interface Props {
  experience: ExperienceEntry[];
}

function isCurrentRole(end: string) {
  return /present/i.test(end);
}

function RoleCard({
  job,
  isExpanded,
  onToggle,
}: {
  job: ExperienceEntry;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  const panelId = useId();
  const current = isCurrentRole(job.end);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '112px 1fr' },
        gap: { xs: 1, md: 2.5 },
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'flex-end',
          pt: 2.75,
          pr: 0.5,
          textAlign: 'right',
        }}
      >
        <Typography
          variant="subtitle2"
          className="gradient-text"
          sx={{ fontWeight: 800, lineHeight: 1.2 }}
        >
          {current ? 'Present' : job.end}
        </Typography>
        <Typography variant="caption" color="text.secondary" fontWeight={600}>
          {job.start}
        </Typography>
      </Box>

      <GlassPanel
        glow={isExpanded}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          transition:
            'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
          borderColor: isExpanded ? 'primary.light' : 'divider',
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
            opacity: isExpanded ? 1 : current ? 0.7 : 0.35,
            transition: 'opacity 0.25s ease',
          },
          ...(!isExpanded && {
            '&:hover': {
              transform: 'translateY(-2px)',
              borderColor: 'primary.light',
              boxShadow: (t) =>
                `0 12px 32px ${alpha(
                  t.palette.primary.main,
                  t.palette.mode === 'light' ? 0.18 : 0.35,
                )}`,
              '@media (prefers-reduced-motion: reduce)': {
                transform: 'none',
              },
            },
          }),
        }}
      >
        <Box
          component="button"
          type="button"
          id={`${panelId}-trigger`}
          aria-expanded={isExpanded}
          aria-controls={`${panelId}-content`}
          onClick={onToggle}
          sx={{
            display: 'block',
            width: '100%',
            border: 0,
            background: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            p: { xs: 2, sm: 2.5 },
            color: 'inherit',
            borderRadius: 3,
            '&:focus-visible': {
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: 2,
            },
          }}
        >
          <Stack direction="row" alignItems="flex-start" spacing={1.5}>
            <WorkOutlineIcon
              color="primary"
              sx={{ mt: 0.35, flexShrink: 0 }}
            />
            <Stack spacing={1} sx={{ minWidth: 0, flex: 1 }}>
              <Stack
                direction="row"
                flexWrap="wrap"
                gap={1}
                alignItems="center"
              >
                <Typography fontWeight={700} sx={{ fontSize: '1.0625rem' }}>
                  {job.role}
                </Typography>
                {current ? (
                  <Chip
                    label="Current"
                    size="small"
                    color="primary"
                    sx={{ height: 22, fontSize: '0.7rem', fontWeight: 700 }}
                  />
                ) : null}
              </Stack>
              <Typography color="primary.main" fontWeight={600}>
                {job.organization}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap={0.75} alignItems="center">
                <Chip
                  label={`${job.start} – ${job.end}`}
                  size="small"
                  variant="outlined"
                  sx={{
                    borderColor: 'divider',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    display: { md: 'none' },
                  }}
                />
                {job.location ? (
                  <Chip
                    label={job.location}
                    size="small"
                    variant="outlined"
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                  />
                ) : null}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 600 }}
                >
                  {job.highlights.length} impact area
                  {job.highlights.length === 1 ? '' : 's'}
                  {!isExpanded ? ' · Expand' : ''}
                </Typography>
              </Stack>
              {!isExpanded ? (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {job.highlights[0]}
                </Typography>
              ) : null}
            </Stack>
            <KeyboardArrowDownIcon
              aria-hidden
              color="primary"
              sx={{
                flexShrink: 0,
                mt: 0.25,
                transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.25s ease',
                '@media (prefers-reduced-motion: reduce)': {
                  transition: 'none',
                },
              }}
            />
          </Stack>
        </Box>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box
            id={`${panelId}-content`}
            role="region"
            aria-labelledby={`${panelId}-trigger`}
            sx={{
              px: { xs: 2, sm: 2.5 },
              pb: { xs: 2.5, sm: 3 },
              pt: 0,
            }}
          >
            {job.note ? (
              <Box
                sx={{
                  mb: 2,
                  ml: { xs: 0, sm: 4.5 },
                  p: 1.5,
                  borderRadius: 2,
                  borderLeft: '3px solid',
                  borderColor: 'primary.main',
                  bgcolor: (t) =>
                    alpha(
                      t.palette.primary.main,
                      t.palette.mode === 'light' ? 0.06 : 0.12,
                    ),
                }}
              >
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {job.note}
                </Typography>
              </Box>
            ) : null}
            <Stack
              component="ul"
              spacing={1.25}
              sx={{
                m: 0,
                pl: { xs: 2.25, sm: 4.5 },
                listStyle: 'none',
              }}
            >
              {job.highlights.map((h, i) => (
                <Typography
                  component="li"
                  key={i}
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    lineHeight: 1.7,
                    position: 'relative',
                    pl: 2,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '0.55em',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    },
                  }}
                >
                  {h}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Collapse>
      </GlassPanel>
    </Box>
  );
}

export function ExperienceSection({ experience }: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(
    experience[0]?.id ?? null,
  );

  return (
    <SectionContainer
      id="experience"
      title="Experience"
      subtitle="Roles, delivery leadership, and technical ownership"
    >
      <Stack spacing={2.5}>
        {experience.map((job) => (
          <RoleCard
            key={job.id}
            job={job}
            isExpanded={expandedId === job.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === job.id ? null : job.id))
            }
          />
        ))}
      </Stack>
    </SectionContainer>
  );
}
