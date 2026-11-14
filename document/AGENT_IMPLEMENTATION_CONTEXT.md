# AI agent implementation context (living document)

> **Purpose:** Any AI agent (or human) continuing this project should **read this file first**, then `document/ARCHITECTURE.md` and `document/DATA_MODEL.md`. **Update this file at the end of each work session** with what changed, where, and what is next.

---

## 1. Project snapshot

| Field | Value |
|-------|--------|
| Repository | `NaveenResume` |
| Product | Interactive resume / portfolio website for **Naveen Jain** |
| Phase | **Scaffold v1** — runnable SPA; polish & deploy pending |
| Default profile variant | `fullStackLead` |
| Contact email | `naveen.jain94@hotmail.com` |
| Contact phone | `+91-9999003538` |
| PDF strategy | Dynamic via `@react-pdf/renderer` from same content as UI |
| Contact strategy | Formspree (free) when configured; **mailto fallback** always |

---

## 2. How to work on this repo

### Read order

1. This file (`AGENT_IMPLEMENTATION_CONTEXT.md`)
2. `document/README.md` (index)
3. `document/ARCHITECTURE.md`
4. `document/DATA_MODEL.md`
5. `document/REQUIREMENTS.md` (acceptance checklist)
6. `document/TECHNOLOGY_STACK.md`
7. `document/CONTACT_AND_INTEGRATIONS.md`

### Content rules

- **Never** treat `Resumes/*.pdf` as the live PDF source — only migrate text into `src/content/`.
- **Do** use HTML in `Resumes/` and `Naveen_Jain-Resume-nvnjn.html` as copy reference.
- **Single source of truth** after scaffold: `src/content/` + `src/types/resume.ts`.
- **Do not** commit `.env` with secrets; maintain `.env.example`.

### User preferences (from conversation)

- React + **free/open** UI library → **MUI v6** selected
- Rich portfolio (timeline, project modals, skill filters)
- Professional, market-grade UI (light default + dark toggle)
- Profile variants via **config**, default `fullStackLead`
- Formspree free tier OK; **fallback to mailto** on limit/failure/missing env
- User asked for `document/` folder with architecture, diagrams, stack
- **No git commits** unless user explicitly requests

---

## 3. Understanding built from resume analysis

### Professional positioning

- Technical lead, 8+ years, enterprise/fintech, Vue at scale, React/web components, Node/Spring, OAuth, AWS, observability, AI-assisted delivery (MCP, Cursor, Copilot).
- Leads ~20 cross-functional delivery; strong code review / quality culture.

### Content inventory (sections)

All variants share largely the same **Experience**, **Projects**, **Skills**, **Achievements**, **Education**.

| Section | Notes |
|---------|--------|
| Summary | Slight emphasis FE vs full-stack between variants |
| Experience | Algoworks (TL), Nagarro (Sr Full Stack) |
| Projects | 5 major entries; Conversational Payments is flagship `featured` |
| Skills | 12+ groups; many tags with `highlight: true` for core skills |
| Achievements | AI Innovation Award 2026, Cheer Board ×3, code review target, ~20 team |
| Education | MCA + BCA, IP University Delhi |

### Visual references (legacy HTML only)

| File | Style hint |
|------|------------|
| `Naveen_Jain-Resume-2026.html` | Blue accent `#1f6fb2` — good primary brand token |
| `Naveen_Jain-FE-Modern.html` | Teal sidebar panel layout |
| `Naveen_Jain-FE-DoubleColumn.html` | Warm amber `#c56a28` |
| Web app | Prefer **2026 blue** + professional typography; not a literal A4 clone on desktop |

### External links (consistent)

- LinkedIn: `https://linkedin.com/in/naveen-jain-045500113`
- GitHub: `https://github.com/JainNaveen94`

---

## 4. Implementation status

Update this table as work progresses.

| Work item | Status | Notes |
|-----------|--------|-------|
| `document/` architecture pack | **Done** | 2026-11-13 |
| Vite + React + TS scaffold | **Done** | Manual scaffold (non-empty root) |
| MUI theme light/dark | **Done** | `src/theme/theme.ts`, toggle in header |
| `src/content` + types | **Done** | v1 copy from 2026 / nvnjn summaries |
| Section components | **Done** | Hero → Contact in `src/sections/` |
| Project filters + modal | **Done (v1)** | Tech skill → project filter; domain filter UI not wired |
| Experience timeline | **Done (v1)** | MUI Accordion timeline |
| Profile variant query param | **Done** | `?profile=` + Hero toggle; `useProfileVariant` |
| `@react-pdf/renderer` PDF | **Done (v1)** | Single-page A4; expand layout/skills later |
| Contact Formspree + mailto | **Done** | `src/utils/contact.ts`, RHF + Zod |
| SEO / JSON-LD | **Partial** | react-helmet title/description; JSON-LD todo |
| Deploy + README | **Partial** | README done; deploy not configured |
| Code-split PDF bundle | **Done** | Lazy `import()` in `App.tsx` |
| Brand logo assets | **Done** | NJ stroke monogram: `BrandMark.tsx`, `design/logo/final/`, `public/logo-mark.svg` + `favicon.svg` |

---

## 5. Planned file map (after scaffold)

```
src/
  content/
    resume.base.ts
    profiles/fullStackLead.ts
    profiles/frontEndLead.ts
    index.ts
  types/resume.ts
  pdf/ResumePdfDocument.tsx
  pdf/downloadResumePdf.tsx
  sections/          # Hero, About, Experience, ...
  components/        # shared UI
  hooks/             # useProfileVariant, useProjectFilters, ...
  theme/
  App.tsx
  main.tsx
```

---

## 6. Implementation sequence (recommended)

1. `npm create vite@latest` → React TS in repo root or `web/` (prefer **repo root** unless user says otherwise)
2. Add MUI, Router, Framer Motion, RHF, Zod, react-helmet-async, @react-pdf/renderer
3. Define `src/types/resume.ts` per DATA_MODEL.md
4. Populate `resume.base.ts` from `Resumes/Naveen_Jain-Resume-2026.html`
5. Add profile files; implement `getResumeData(variant)`
6. App shell: nav, footer, theme toggle
7. Sections in order: Hero → About → Experience → Projects → Skills → Achievements → Education → Contact
8. PDF button wired to merged data
9. Contact with Formspree + mailto fallback
10. `.env.example`, README, smoke Lighthouse notes here

---

## 7. Session log

Agents: **append** new entries at the top of this section.

### 2026-11-14 — NJ monogram logo (final direction)

**User choice:** Stroke NJ on navy tile (user-provided SVG shape); J gradient tied to theme accent.

**Agent actions:**

- `src/components/BrandMark.tsx` — inline SVG; J uses `primary.light` → `secondary.main` (a1→a3)
- Header/footer swapped from placeholder gradient square to `BrandMark`
- `BrandLogo` uses `BrandMark` for wordmark lockups
- Clean assets in `design/logo/final/` and `public/` (no C2PA metadata); default Aurora on static SVGs for favicon/apple-touch

---

### 2026-11-13 — Modern dynamic theme (v2)

**Agent actions:**

- New design tokens (`src/theme/tokens.ts`): cyan → blue → violet gradient system
- Animated mesh background (`AppBackground`), CSS vars via `useThemeCssVars`
- Glass panels, gradient buttons, Sora + Plus Jakarta Sans typography
- Hero uses `DynamicHeroVisual` (orb rings) instead of old logo card; header uses minimal gradient mark
- Logo work deferred per user feedback

---

### 2026-11-13 — Polish + brand logo

**Agent actions:**

- Added `public/logo-mark.svg`, `public/logo.svg`, refined `favicon.svg`
- `BrandLogo` in header, hero card, footer
- UI polish: section accents, muted bands, metric cards, nav scroll spy, hover states, hero two-column layout
- Lazy-loaded PDF chunk (~457KB gzip separate from main bundle)

**Next step:**

- Optional: OG image using logo; photo avatar from `Resumes/subject-no-bg.png` if desired

---

### 2026-11-13 — Scaffold v1 (React app)

**Agent actions:**

- Manual Vite + React 18 + TS (create-vite cancelled on non-empty repo)
- Installed MUI 6, Framer Motion, RHF, Zod, react-helmet-async, @react-pdf/renderer, react-router-dom
- Added `src/content/`, types, all sections, Formspree/mailto contact, PDF download
- `npm run build` passes (note: large bundle due to PDF lib)

**Next step:**

- Run `npm run dev` for visual QA; optional: lazy-load PDF, JSON-LD, domain project filter, richer PDF layout
- Deploy to Vercel/Netlify + set env vars

**Open questions:**

- None blocking

---

### 2026-11-13 — Documentation phase (no app code)

**Agent actions:**

- Analyzed resume HTML variants in `Resumes/` and root `Naveen_Jain-Resume-nvnjn.html`
- Captured architecture: Phase 1 static SPA, variant profiles, dynamic PDF, Formspree + mailto
- Locked contact and default profile per user
- Created `document/` with ARCHITECTURE, STACK, REQUIREMENTS, DATA_MODEL, CONTACT, README, this file

**Decisions recorded:**

- mailto fallback when Formspree missing, fails, or hits free-tier limit
- User wants this MD maintained for future AI continuity

**Next step:**

- User to say **“start scaffolding”** to generate Vite app and begin content migration

**Open questions:**

- None blocking scaffold

---

## 8. Pitfalls & gotchas

- **@react-pdf/renderer** uses its own layout primitives — do not reuse MUI components inside PDF tree.
- **Variant switching** must re-run PDF merge and SEO tags when profile changes.
- **Formspree 50/mo** — portfolio traffic usually fine; implement graceful mailto on HTTP 429 if observed.
- **Phone/email** — only use locked 2026 values in `ProfileIdentity` unless user updates docs.
- **Two emails in old files** — `nvnjn94@hotmail.com` exists in nvnjn variant; **public site uses `naveen.jain94@hotmail.com` only**.

---

## 9. Commands (fill in after scaffold)

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

---

## 10. Definition of done (pointer)

See checkboxes in `document/REQUIREMENTS.md` §6. Mark them complete in this file’s §4 table when finished.
