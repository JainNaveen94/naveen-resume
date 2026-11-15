import type { Plugin } from 'vite';
import type { ResumeData } from '../src/types/resume';

const esc = (v: string) =>
  v
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const list = (items: string[]) =>
  `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;

/**
 * Plain, semantic HTML of the same resume data the React app renders.
 * Crawlers, ATS and AI readers that don't run JavaScript see real content
 * instead of an empty <div>. React replaces it on load, so visitors never see it.
 */
export function renderStaticSnapshot(d: ResumeData): string {
  const { profile: p, variant, summary } = d;
  return [
    '<main>',
    `<h1>${esc(p.fullName)}</h1>`,
    `<p>${esc(variant.tagline)}</p>`,
    `<p>${esc(p.location)} | <a href="tel:${esc(p.phone.replace(/[^+\d]/g, ''))}">${esc(p.phone)}</a> | <a href="mailto:${esc(p.email)}">${esc(p.email)}</a></p>`,
    `<p><a href="${esc(p.linkedIn.url)}">LinkedIn</a> | <a href="${esc(p.github.url)}">GitHub</a></p>`,
    variant.heroHeadline ? `<p>${esc(variant.heroHeadline)}</p>` : '',
    '<h2>Professional Summary</h2>',
    summary.paragraphs.map((t) => `<p>${esc(t)}</p>`).join(''),
    '<h2>Work Experience</h2>',
    d.experience
      .map(
        (e) =>
          `<h3>${esc(e.role)}, ${esc(e.organization)}</h3><p>${esc(e.start)} – ${esc(e.end)}${e.location ? ` | ${esc(e.location)}` : ''}</p>${e.note ? `<p>${esc(e.note)}</p>` : ''}${list(e.highlights)}`,
      )
      .join(''),
    '<h2>Projects</h2>',
    d.projects
      .map(
        (pr) =>
          `<h3>${esc(pr.title)}</h3>${pr.subtitle ? `<p>${esc(pr.subtitle)}</p>` : ''}${pr.roleNote ? `<p>${esc(pr.roleNote)}</p>` : ''}${list(pr.highlights)}<p>Technologies: ${esc(pr.stackLine ?? pr.techTags.join(', '))}</p>`,
      )
      .join(''),
    '<h2>Technical Skills</h2>',
    `<ul>${d.skills.map((g) => `<li>${esc(g.label)}: ${esc(g.skills.map((s) => s.name).join(', '))}</li>`).join('')}</ul>`,
    '<h2>Key Achievements</h2>',
    `<ul>${d.achievements.map((a) => `<li>${esc(a.title)}: ${esc(a.description)}</li>`).join('')}</ul>`,
    '<h2>How I Work</h2>',
    `<ul>${d.workPrinciples.map((w) => `<li>${esc(w.title)}: ${esc(w.description)}</li>`).join('')}</ul>`,
    '<h2>Education</h2>',
    `<ul>${d.education.map((e) => `<li>${esc(e.degree)}, ${esc(e.institution)} (${esc(e.period)})</li>`).join('')}</ul>`,
    '</main>',
  ].join('');
}

export function staticSnapshotPlugin(data: ResumeData): Plugin {
  return {
    name: 'static-resume-snapshot',
    transformIndexHtml(html) {
      return html.replace(
        '<div id="root"></div>',
        `<div id="root">${renderStaticSnapshot(data)}</div>`,
      );
    },
  };
}
