# Technology stack

## 1. Summary

| Layer | Choice | License |
|-------|--------|---------|
| UI framework | **React 18+** | MIT |
| Language | **TypeScript** (strict) | — |
| Build tool | **Vite** | MIT |
| Routing | **React Router 7** | MIT |
| Component library | **MUI (Material UI) v6** | MIT |
| Animation | **Framer Motion** | MIT |
| Forms | **React Hook Form** + **Zod** | MIT |
| PDF | **@react-pdf/renderer** | MIT |
| SEO meta | **react-helmet-async** | Apache-2.0 |
| Icons | **Lucide React** or **@mui/icons-material** | ISC / MIT |
| Lint / format | **ESLint** + **Prettier** | MIT |

All listed UI libraries are **free and open source** for this use case.

## 2. Why these choices

### React + Vite + TypeScript

Matches Naveen’s experience; fast dev server; easy static deploy. Strict types align content, UI, and PDF.

### MUI v6

Enterprise-grade accessibility, theming (light/dark), Drawer/Dialog/Chips/AppBar for portfolio patterns without custom design system overhead.

**Alternates (documented, not selected):** Mantine, Chakra UI — viable if MUI feel is too “Material.”

### Framer Motion

Section entrance, modal transitions, timeline polish — with reduced-motion guards.

### @react-pdf/renderer

Generates PDF in the **browser** from the same `ResumeData` as the SPA — no backend, always in sync when content updates.

**Alternates:**

- Print-only route + `window.print()` + print CSS (supplementary, not primary download)
- Server-side Puppeteer (Phase 2)

### Formspree + mailto

Zero backend for contact. See [CONTACT_AND_INTEGRATIONS.md](./CONTACT_AND_INTEGRATIONS.md).

## 3. Environment variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `VITE_DEFAULT_PROFILE` | No | `fullStackLead` (default) or `frontEndLead` |
| `VITE_FORMSPREE_ID` | No | Form endpoint; if absent → mailto path |
| `VITE_SITE_URL` | No | Canonical URL for SEO / OG |

Example: `.env.example` at repo root (create during scaffold).

## 4. Deployment targets

Any static host:

- **Vercel** (recommended)
- Netlify
- GitHub Pages (may need `base` in Vite config)

Build: `npm run build` → `dist/`

## 5. Tooling conventions (implement time)

| Concern | Convention |
|---------|------------|
| Imports | Path alias `@/` → `src/` |
| Components | `PascalCase.tsx` in `components/` or `sections/` |
| Content edits | Only under `src/content/` (+ types) |
| Styling | MUI `sx` + theme tokens; avoid one-off hex in components |
| Tests | Add when requested; not required for initial scaffold |

## 6. Version policy

- Pin major versions in `package.json` at scaffold time.
- Prefer `npm audit` before deploy; no forced upgrades mid-feature without reason.

## 7. Diagram — build & runtime

```mermaid
flowchart LR
  subgraph dev [Development]
    Vite[Vite dev server]
    HMR[HMR]
    Vite --> HMR
  end

  subgraph build [CI / local]
    TSC[tsc -b optional]
    ViteBuild[vite build]
    Out[dist/ static]
    ViteBuild --> Out
  end

  subgraph runtime [Browser]
    React[React tree]
    MUI[MUI Theme]
    Motion[Framer Motion]
    Pdf[@react-pdf/renderer]
    React --> MUI
    React --> Motion
    React --> Pdf
  end

  Out --> React
```

## 8. Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [AGENT_IMPLEMENTATION_CONTEXT.md](./AGENT_IMPLEMENTATION_CONTEXT.md)
