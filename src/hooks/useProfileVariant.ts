import { useMemo } from 'react';
import { getResumeData } from '@/content';

/** Single full-stack profile — front-end variant removed from the live site. */
export function useProfileVariant() {
  const resume = useMemo(() => getResumeData(), []);
  return { resume };
}
