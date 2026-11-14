import { pdf } from '@react-pdf/renderer';
import type { ResumeData } from '@/types/resume';
import { ResumePdfDocument } from './ResumePdfDocument';
import type { PdfThemeInput } from './pdfTheme';

export const RESUME_PDF_FILENAME = 'Naveen_Jain_Resume.pdf';

/** Builds the PDF from the live site content and the visitor's active theme. */
export async function downloadResumePdf(
  data: ResumeData,
  theme: PdfThemeInput,
): Promise<void> {
  const blob = await pdf(<ResumePdfDocument data={data} theme={theme} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = RESUME_PDF_FILENAME;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoking synchronously can cancel the download in some browsers.
  window.setTimeout(() => URL.revokeObjectURL(url), 10_000);
}
