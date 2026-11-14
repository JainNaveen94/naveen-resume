import { useEffect, useState } from 'react';

const HEADER_OFFSET = 100;

function computeActiveSection(sectionIds: readonly string[]): string {
  let current = sectionIds[0] ?? 'hero';
  for (const id of sectionIds) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top - HEADER_OFFSET;
    if (top <= 0) current = id;
  }
  return current;
}

/** Scroll-spy with rAF throttle — avoids re-rendering parent on every scroll event. */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState(() =>
    typeof document !== 'undefined'
      ? computeActiveSection(sectionIds)
      : (sectionIds[0] ?? 'hero'),
  );

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const next = computeActiveSection(sectionIds);
        setActive((prev) => (prev === next ? prev : next));
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionIds]);

  return active;
}
