# Logo & favicon — design brief (pre-implementation)

## Goals

- Read clearly at **favicon sizes** (16×16, 32×32) and **header** (36–48px).
- Match the site’s **aurora accent** (cyan → blue → violet); works on light and dark UI (gradient mark, not flat blue).
- Signal **technical lead / architecture** without clipart.
- Pair: **mark only** (icon) + optional **horizontal lockup** for OG/email later.

## Evaluation criteria

| Criterion | Weight |
|-----------|--------|
| Legibility at 16px | Critical |
| Professional (not startup-generic) | High |
| Distinct from default “gradient square” | High |
| Scales to PDF / LinkedIn banner | Medium |

## Concepts (pick one before site integration)

| ID | Name | Idea |
|----|------|------|
| **A** | **Stack** | `NJ` monogram + left **stack lines** (layers / architecture) |
| **B** | **Orbit** | `NJ` inside a **single orbital ring** (systems, delivery) |
| **C** | **Bracket** | `{ NJ }` **developer bracket** frame, minimal |

## Files

```
design/logo/
  LOGO_BRIEF.md          ← this file
  preview.html           ← open in browser to compare sizes
  concept-a/
    mark.svg             120×120 master
    favicon.svg          32×32 optimized
    lockup.svg           mark + name (optional)
  concept-b/
    mark.svg
    favicon.svg
    lockup.svg
  concept-c/
    mark.svg
    favicon.svg
    lockup.svg
```

## Default gradient (Aurora — matches site default accent)

- Stop 1: `#22d3ee`
- Stop 2: `#3b82f6`
- Stop 3: `#8b5cf6`

## After you choose

1. Copy winning assets to `public/logo-mark.svg` & `public/favicon.svg`.
2. Wire `BrandLogo` / header / meta tags (only after your approval).
3. Optionally export PNG @512 for Apple touch / social.

## Preview

Open `design/logo/preview.html` in a browser (double-click or `npm run dev` + static path).
