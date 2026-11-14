# Requirements

## 1. Scope

### Phase 1 (in scope)

- React SPA portfolio with rich interactivity
- Content-driven **profile variants**
- **Dynamic PDF** download
- Contact via **Formspree** with **mailto fallback**
- No custom backend

### Phase 2 (out of scope for initial build)

- API / CMS
- Authenticated admin
- Server-generated PDF
- Blog with authoring UI

## 2. Stakeholders & users

| User | Goal |
|------|------|
| Recruiter | Quick scan: role fit, experience, download PDF |
| Hiring manager | Depth on projects, leadership, tech stack |
| Naveen | Update content in one place; site + PDF stay aligned |

## 3. Functional requirements

### Content & profile

| ID | Requirement |
|----|-------------|
| FR-C01 | Display name **Naveen Jain** and contact per locked defaults |
| FR-C02 | Default active profile: **`fullStackLead`** |
| FR-C03 | Support **`frontEndLead`** via config and/or `?profile=` |
| FR-C04 | All resume entities from [DATA_MODEL.md](./DATA_MODEL.md) |

### Navigation & layout

| ID | Requirement |
|----|-------------|
| FR-N01 | Sticky nav with anchor scroll to all major sections |
| FR-N02 | Responsive layout (mobile-first) |
| FR-N03 | Light theme default; dark mode toggle |

### Experience & projects

| ID | Requirement |
|----|-------------|
| FR-E01 | Experience timeline with expandable detail |
| FR-P01 | Project grid with modal/drawer for full content |
| FR-P02 | Filter projects by domain and/or tech tags |
| FR-S01 | Skills grouped as in resume; highlight “core” tags |
| FR-S02 | Skill selection filters visible projects (optional link) |

### Achievements & education

| ID | Requirement |
|----|-------------|
| FR-A01 | Key achievements with icons/cards |
| FR-ED01 | Education entries with dates and institutions |

### PDF

| ID | Requirement |
|----|-------------|
| FR-PDF01 | “Download resume” generates PDF from **current merged content** |
| FR-PDF02 | Filename convention: e.g. `Naveen_Jain_Resume.pdf` |
| FR-PDF03 | PDF reflects **active profile variant** (tagline/summary/SEO fields) |

### Contact

| ID | Requirement |
|----|-------------|
| FR-CT01 | Contact form: name, email, message (minimum) |
| FR-CT02 | Client-side validation (Zod) |
| FR-CT03 | If Formspree configured and succeeds → in-app confirmation |
| FR-CT04 | If Formspree missing, fails, or limit hit → **mailto fallback** with prefilled body |
| FR-CT05 | Prominent LinkedIn and GitHub links |

### SEO & sharing

| ID | Requirement |
|----|-------------|
| FR-SEO01 | Page title and meta description per active profile |
| FR-SEO02 | JSON-LD `Person` schema (implement when scaffold exists) |

## 4. Non-functional requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | No API keys or Formspree secrets committed |
| NFR-02 | Accessible focus states and semantic landmarks |
| NFR-03 | Animations disabled or reduced when `prefers-reduced-motion` |
| NFR-04 | Content changes require edit only in `src/content/` (+ types) |
| NFR-05 | README for local dev and deploy |

## 5. Content source of truth (migration)

Primary migration source for `resume.base.ts`:

- `Resumes/Naveen_Jain-Resume-2026.html` — structure and majority of copy
- `Naveen_Jain-Resume-nvnjn.html` — full-stack tagline / summary nuance
- `Resumes/Naveen_Jain-FE*.html` — `frontEndLead` variant text

Legacy PDFs in `Resumes/` are **not** the runtime PDF source.

## 6. Acceptance criteria (Phase 1 done)

- [ ] `npm run dev` runs; all sections render from content
- [ ] Default profile is `fullStackLead`
- [ ] `?profile=frontEndLead` changes tagline/summary/SEO fields
- [ ] Project filters and detail modal work
- [ ] PDF downloads and matches active variant content
- [ ] Contact: Formspree works with env set; mailto works without env
- [ ] Lighthouse spot-check documented in AGENT_IMPLEMENTATION_CONTEXT

## 7. Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [CONTACT_AND_INTEGRATIONS.md](./CONTACT_AND_INTEGRATIONS.md)
