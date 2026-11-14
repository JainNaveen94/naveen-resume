const HEADER_SCROLL_GAP = 10;

/** Live header height (safe-area + toolbar) for anchor scroll. */
export function getHeaderScrollOffset(): number {
  const header = document.querySelector<HTMLElement>('[data-site-header]');
  const height = header?.getBoundingClientRect().height;
  return (height && height > 0 ? height : 72) + HEADER_SCROLL_GAP;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - getHeaderScrollOffset();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
}

export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'how-i-work', label: 'Approach' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Tech stack' },
  { id: 'achievements', label: 'Impact' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
] as const;
