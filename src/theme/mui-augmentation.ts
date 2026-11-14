import type { CSSProperties } from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    gradient: {
      brand: string;
      brandSoft: string;
      text: string;
    };
    surface: {
      glass: string;
      glassBorder: string;
    };
  }
  interface PaletteOptions {
    gradient?: Palette['gradient'];
    surface?: Palette['surface'];
  }
  interface TypographyVariants {
    display: CSSProperties;
  }
  interface TypographyVariantsOptions {
    display?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    display: true;
  }
}

export {};
