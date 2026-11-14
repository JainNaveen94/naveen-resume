import { Font } from '@react-pdf/renderer';
import jakarta400 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff?url';
import jakarta500 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff?url';
import jakarta600 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff?url';
import jakarta700 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff?url';
import jakarta800 from '@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-800-normal.woff?url';
import sora600 from '@fontsource/sora/files/sora-latin-600-normal.woff?url';
import sora700 from '@fontsource/sora/files/sora-latin-700-normal.woff?url';

export const PDF_BODY_FONT = 'Plus Jakarta Sans';
export const PDF_DISPLAY_FONT = 'Sora';

let registered = false;

/** Same typefaces as the site, bundled so the PDF never depends on a CDN. */
export function registerPdfFonts() {
  if (registered) return;
  registered = true;

  Font.register({
    family: PDF_BODY_FONT,
    fonts: [
      { src: jakarta400, fontWeight: 400 },
      { src: jakarta500, fontWeight: 500 },
      { src: jakarta600, fontWeight: 600 },
      { src: jakarta700, fontWeight: 700 },
      { src: jakarta800, fontWeight: 800 },
    ],
  });
  Font.register({
    family: PDF_DISPLAY_FONT,
    fonts: [
      { src: sora600, fontWeight: 600 },
      { src: sora700, fontWeight: 700 },
    ],
  });
  // Default hyphenation splits words mid-line ("Micro-frontend"); keep words whole.
  Font.registerHyphenationCallback((word) => [word]);
}
