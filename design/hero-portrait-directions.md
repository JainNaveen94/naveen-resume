# Hero portrait — style directions

Reference: founder / academy hero (e.g. [Stawx Academy](https://stawxacademy.com/) — large human photo beside headline, minimal chrome).

## Selected: **Editorial card** (best fit for this site + current asset)

## Implemented (default): **Editorial card**

- Tall **4:5** crop, `object-fit: cover`, face biased to top
- Soft **accent halo** behind (no thick gradient border)
- Light inner gradient + bottom vignette for depth
- Works with `fillHeight` beside intro + CTAs on desktop

## Alternates (pick in chat to swap)

| ID | Name | Vibe |
|----|------|------|
| **A** | Cutout float | True transparent PNG on mesh background; no rectangle; best after pro background removal |
| **B** | Arc mask | Portrait clipped to arch / circle (consulting keynote) |
| **C** | Duotone panel | B&W photo + accent overlay; very editorial |
| **D** | Layered offset | Two offset rounded rects (photo + accent block) — Stripe / Linear style |
| **E** | Video loop | Short muted loop instead of still (only if asset exists) |

## Asset note

Current file may still include studio grey in the bitmap even with alpha. For **A** (cutout float), export a clean PNG from [remove.bg](https://www.remove.bg/) or Photoshop.
