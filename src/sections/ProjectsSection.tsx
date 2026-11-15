import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { useMemo, useState } from 'react';
import { SectionContainer } from '@/components/SectionContainer';
import type { ProjectEntry } from '@/types/resume';

interface Props {
  projects: ProjectEntry[];
  domainFilter: string | null;
  techFilter: string | null;
  onClearFilters: () => void;
}

export function ProjectsSection({
  projects,
  domainFilter,
  techFilter,
  onClearFilters,
}: Props) {
  const [selected, setSelected] = useState<ProjectEntry | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const domainOk =
        !domainFilter || p.domainTags.includes(domainFilter);
      const techOk =
        !techFilter ||
        p.techTags.some(
          (t) => t.toLowerCase() === techFilter.toLowerCase(),
        );
      return domainOk && techOk;
    });
  }, [projects, domainFilter, techFilter]);

  return (
    <SectionContainer
      id="projects"
      title="Projects"
      subtitle="Selected programs — click a card for detail"
    >
      {(domainFilter || techFilter) && (
        <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
          <Typography variant="body2" color="text.secondary">
            Filtered by:
          </Typography>
          {domainFilter ? <Chip size="small" label={domainFilter} /> : null}
          {techFilter ? <Chip size="small" label={techFilter} /> : null}
          <Chip size="small" label="Clear" onClick={onClearFilters} onDelete={onClearFilters} />
        </Stack>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 2,
        }}
      >
        {filtered.map((proj) => (
          <Card
            key={proj.id}
            variant="outlined"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              bgcolor: 'background.paper',
              borderColor: proj.featured ? 'primary.main' : 'divider',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              '&::before': proj.featured
                ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: (t) => t.palette.gradient.brand,
                  }
                : undefined,
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: 'primary.light',
                boxShadow: (t) =>
                  `0 12px 32px ${alpha(
                    t.palette.primary.main,
                    t.palette.mode === 'light' ? 0.2 : 0.38,
                  )}`,
              },
            }}
          >
            <CardActionArea onClick={() => setSelected(proj)} sx={{ height: '100%' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="start">
                  <Typography fontWeight={700}>{proj.title}</Typography>
                  {proj.featured ? (
                    <Chip
                      label="Featured"
                      size="small"
                      sx={{
                        background: (t) => t.palette.gradient.brand,
                        color: '#fff',
                        fontWeight: 700,
                      }}
                    />
                  ) : null}
                </Stack>
                {proj.subtitle ? (
                  <Typography variant="body2" color="primary" sx={{ mt: 0.5 }}>
                    {proj.subtitle}
                  </Typography>
                ) : null}
                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1.5 }}>
                  {proj.domainTags.map((d) => (
                    <Chip key={d} label={d} size="small" variant="outlined" />
                  ))}
                </Stack>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      <Dialog
        open={Boolean(selected)}
        onClose={() => setSelected(null)}
        maxWidth="md"
        fullWidth
      >
        {selected ? (
          <>
            <DialogTitle sx={{ pr: 6 }}>
              {selected.title}
              <IconButton
                aria-label="Close"
                onClick={() => setSelected(null)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selected.subtitle ? (
                <Typography color="primary" fontWeight={600} gutterBottom>
                  {selected.subtitle}
                </Typography>
              ) : null}
              {selected.roleNote ? (
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {selected.roleNote}
                </Typography>
              ) : null}
              {selected.stackLine ? (
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Technologies:</strong> {selected.stackLine}
                </Typography>
              ) : null}
              <Stack component="ul" sx={{ pl: 2.5 }} spacing={1}>
                {selected.highlights.map((h, i) => (
                  <Typography component="li" key={i}>
                    {h}
                  </Typography>
                ))}
              </Stack>
            </DialogContent>
          </>
        ) : null}
      </Dialog>
    </SectionContainer>
  );
}
