import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import CodeIcon from '@mui/icons-material/Code';
import DnsOutlinedIcon from '@mui/icons-material/DnsOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import WebOutlinedIcon from '@mui/icons-material/WebOutlined';
import { Box, Button, Chip, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useMemo } from 'react';
import { GlassPanel } from '@/components/GlassPanel';
import { SectionContainer } from '@/components/SectionContainer';
import type { ProjectEntry, SkillGroup, SkillGroupIcon } from '@/types/resume';

const ICONS: Record<SkillGroupIcon, typeof CodeIcon> = {
  code: CodeIcon,
  frontend: WebOutlinedIcon,
  ai: AutoAwesomeOutlinedIcon,
  state: SwapVertIcon,
  backend: DnsOutlinedIcon,
  database: StorageOutlinedIcon,
  identity: LockOutlinedIcon,
  cloud: CloudOutlinedIcon,
  quality: VerifiedOutlinedIcon,
  domain: BusinessOutlinedIcon,
};

interface Props {
  skills: SkillGroup[];
  projects: ProjectEntry[];
  activeTech: string | null;
  onTechSelect: (tech: string | null) => void;
}

function SkillChips({
  group,
  activeTech,
  onTechSelect,
  projectTags,
}: {
  group: SkillGroup;
  activeTech: string | null;
  onTechSelect: (tech: string | null) => void;
  projectTags: Set<string>;
}) {
  return (
    <Stack direction="row" flexWrap="wrap" gap={0.75} useFlexGap>
      {group.skills.map((skill) => {
        const filterTag = skill.tag ?? skill.name;
        const selected = activeTech?.toLowerCase() === filterTag.toLowerCase();
        const clickable = Boolean(skill.highlight) && projectTags.has(filterTag.toLowerCase());

        return (
          <Chip
            key={skill.name}
            label={skill.name}
            size="small"
            variant={selected || skill.highlight ? 'filled' : 'outlined'}
            onClick={clickable ? () => onTechSelect(selected ? null : filterTag) : undefined}
            aria-pressed={clickable ? selected : undefined}
            sx={{
              fontWeight: skill.highlight ? 700 : 500,
              cursor: clickable ? 'pointer' : 'default',
              borderColor: 'divider',
              color: 'text.secondary',
              ...(skill.highlight && {
                color: 'primary.main',
                bgcolor: (t) =>
                  alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.1 : 0.18),
                '&:hover': {
                  bgcolor: (t) =>
                    alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.18 : 0.28),
                },
              }),
              ...(selected && {
                background: (t) => t.palette.gradient.brand,
                color: '#fff',
                '&:hover': { filter: 'brightness(1.05)' },
              }),
            }}
          />
        );
      })}
    </Stack>
  );
}

function GroupCard({
  group,
  activeTech,
  onTechSelect,
  projectTags,
}: {
  group: SkillGroup;
  activeTech: string | null;
  onTechSelect: (tech: string | null) => void;
  projectTags: Set<string>;
}) {
  const Icon = ICONS[group.icon];
  const featured = Boolean(group.featured);

  return (
    <GlassPanel
      glow={featured}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        p: featured ? { xs: 2.25, sm: 3 } : { xs: 2, sm: 2.25 },
        borderColor: featured ? 'primary.light' : 'divider',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: (t) => t.palette.gradient.brand,
          opacity: featured ? 1 : 0.4,
        },
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: 'primary.light',
          '@media (prefers-reduced-motion: reduce)': { transform: 'none' },
        },
      }}
    >
      <Stack spacing={featured ? 1.75 : 1.5} sx={{ height: '100%' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box
            sx={{
              width: featured ? 44 : 36,
              height: featured ? 44 : 36,
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
            <Icon fontSize={featured ? 'medium' : 'small'} aria-hidden />
          </Box>
          <Typography
            component="h3"
            fontWeight={700}
            sx={{ fontSize: featured ? '1.1rem' : '0.98rem', lineHeight: 1.3 }}
          >
            {group.label}
          </Typography>
        </Stack>
        {featured && group.blurb ? (
          <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.65 }}>
            {group.blurb}
          </Typography>
        ) : null}
        <SkillChips
          group={group}
          activeTech={activeTech}
          onTechSelect={onTechSelect}
          projectTags={projectTags}
        />
      </Stack>
    </GlassPanel>
  );
}

export function SkillsSection({ skills, projects, activeTech, onTechSelect }: Props) {
  const projectTags = useMemo(
    () => new Set(projects.flatMap((p) => p.techTags.map((t) => t.toLowerCase()))),
    [projects],
  );
  const featured = useMemo(() => skills.filter((g) => g.featured), [skills]);
  const rest = useMemo(() => skills.filter((g) => !g.featured), [skills]);

  return (
    <SectionContainer
      id="skills"
      title="Tech stack"
      subtitle="The tools I lead teams with day to day. Highlighted skills are core, and click one to filter the projects above."
    >
      {activeTech ? (
        <Box
          sx={{
            mb: 2.5,
            p: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'primary.light',
            bgcolor: (t) =>
              alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.06 : 0.12),
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Typography variant="body2" fontWeight={600}>
            Projects filtered by{' '}
            <Typography component="span" variant="body2" color="primary.main" fontWeight={700}>
              {activeTech}
            </Typography>
          </Typography>
          <Button
            size="small"
            variant="outlined"
            startIcon={<FilterAltOffOutlinedIcon />}
            onClick={() => onTechSelect(null)}
          >
            Clear filter
          </Button>
        </Box>
      ) : null}

      <Typography
        variant="overline"
        sx={{ fontWeight: 800, letterSpacing: '0.12em', color: 'primary.main', display: 'block', mb: 1.5 }}
      >
        Core strengths
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2.5,
          mb: 4,
        }}
      >
        {featured.map((g) => (
          <GroupCard
            key={g.id}
            group={g}
            activeTech={activeTech}
            onTechSelect={onTechSelect}
            projectTags={projectTags}
          />
        ))}
      </Box>

      <Typography
        variant="overline"
        sx={{ fontWeight: 800, letterSpacing: '0.12em', color: 'primary.main', display: 'block', mb: 1.5 }}
      >
        Also in my toolkit
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {rest.map((g) => (
          <GroupCard
            key={g.id}
            group={g}
            activeTech={activeTech}
            onTechSelect={onTechSelect}
            projectTags={projectTags}
          />
        ))}
      </Box>
    </SectionContainer>
  );
}
