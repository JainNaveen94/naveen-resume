import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useState } from 'react';
import {
  ACCENT_PRESET_IDS,
  ACCENT_PRESETS,
  CUSTOM_ACCENT_DEFAULT,
  type AccentPresetId,
} from '@/theme/accentPresets';
import { buildGradients } from '@/theme/colorUtils';

interface Props {
  accentId: AccentPresetId;
  customHex: string;
  onSelectPreset: (id: AccentPresetId) => void;
  onCustomHex: (hex: string) => void;
  /** Minimal icon for toolbar (no filled tile) */
  variant?: 'default' | 'toolbar';
}

export function AccentThemePicker({
  accentId,
  customHex,
  onSelectPreset,
  onCustomHex,
  variant = 'default',
}: Props) {
  const [open, setOpen] = useState(false);
  const [draftHex, setDraftHex] = useState(customHex || CUSTOM_ACCENT_DEFAULT);

  const openDialog = () => {
    setDraftHex(customHex || CUSTOM_ACCENT_DEFAULT);
    setOpen(true);
  };

  return (
    <>
      <Tooltip title="Accent color">
        <IconButton
          aria-label="Choose accent color"
          onClick={openDialog}
          size="small"
          sx={
            variant === 'toolbar'
              ? {
                  width: 40,
                  height: 40,
                  color: 'var(--text-secondary)',
                  '&:hover': {
                    color: 'var(--text-primary)',
                    bgcolor: (t) =>
                      alpha(t.palette.primary.main, t.palette.mode === 'light' ? 0.08 : 0.14),
                  },
                }
              : {
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  width: 40,
                  height: 40,
                  background: (t) => t.palette.gradient.brand,
                  color: '#fff',
                  '&:hover': { filter: 'brightness(1.08)' },
                }
          }
        >
          <PaletteOutlinedIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Accent color</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Applies to gradients, glow, and highlights in both light and dark mode.
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mb: 3 }}>
            {ACCENT_PRESET_IDS.map((id) => {
              const preset = ACCENT_PRESETS[id];
              const grad = buildGradients(preset).brand;
              const selected = accentId === id;
              return (
                <Tooltip key={id} title={preset.label}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => onSelectPreset(id)}
                    aria-label={preset.label}
                    aria-pressed={selected}
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2.5,
                      border: '2px solid',
                      borderColor: selected ? 'text.primary' : 'transparent',
                      background: grad,
                      cursor: 'pointer',
                      boxShadow: selected ? '0 0 0 2px var(--accent-2)' : 'none',
                      transition: 'transform 0.15s ease',
                      '&:hover': { transform: 'scale(1.06)' },
                    }}
                  />
                </Tooltip>
              );
            })}
          </Stack>

          <Typography variant="subtitle2" gutterBottom>
            Custom color
          </Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              component="input"
              type="color"
              value={draftHex}
              onChange={(e) => {
                setDraftHex(e.target.value);
                onCustomHex(e.target.value);
              }}
              aria-label="Pick custom accent color"
              sx={{
                width: 56,
                height: 44,
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                bgcolor: 'transparent',
              }}
            />
            <Typography variant="body2" color="text.secondary" fontFamily="monospace">
              {draftHex.toUpperCase()}
            </Typography>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
