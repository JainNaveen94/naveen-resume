# Naveen Jain — Portfolio & Resume (React)

Interactive portfolio and resume site. Content lives in `src/content/` and powers both the UI and **client-generated PDF**.

## Documentation

See the [`document/`](./document/) folder for architecture, requirements, and the **AI agent handoff** file:

- [`document/AGENT_IMPLEMENTATION_CONTEXT.md`](./document/AGENT_IMPLEMENTATION_CONTEXT.md)

## Quick start

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Environment

Copy `.env.example` to `.env`:

| Variable | Description |
|----------|-------------|
| `VITE_SITE_URL` | Public site URL, used in canonical, Open Graph and JSON-LD |
| `VITE_FORMSPREE_ID` | Optional Formspree form ID |
| `VITE_FORCE_MAILTO` | `true` to always use mailto for contact |

## Project layout

- `src/content/` — resume data (source of truth)
- `src/sections/` — page sections
- `src/pdf/` — `@react-pdf/renderer` resume export
- `Resumes/` — legacy HTML/PDF reference only

## Deploy (GitHub + Vercel, free)

1. Push this repo to GitHub (`main`).
2. Sign in at [vercel.com](https://vercel.com) with GitHub → **Add New** → **Project** → import the repo.
3. Defaults are fine: **Build** `npm run build`, **Output** `dist`.
4. Deploy → use the generated `*.vercel.app` URL (optional: set `VITE_SITE_URL` in Vercel **Environment Variables** to that URL, then redeploy).

## Contact

Formspree when configured; otherwise **mailto** fallback to `naveen.jain94@hotmail.com`.
