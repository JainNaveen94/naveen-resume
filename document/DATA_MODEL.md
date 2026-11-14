# Data model

Content is TypeScript-first so the SPA and PDF share types. Phase 2 APIs should return JSON matching these shapes.

## 1. Top-level aggregate

```ts
/** Merged view used by UI and PDF */
interface ResumeData {
  profile: ProfileIdentity;
  variant: ProfileVariantMeta;
  summary: SummaryBlock;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  achievements: AchievementEntry[];
  education: EducationEntry[];
  metrics?: MetricHighlight[]; // optional hero strip
}
```

## 2. Identity (not variant-specific)

```ts
interface ProfileIdentity {
  fullName: string; // "Naveen Jain"
  location: string; // "Delhi, India"
  email: string; // naveen.jain94@hotmail.com
  phone: string; // +91-9999003538
  linkedIn: { url: string; label: string };
  github: { url: string; label: string };
}
```

**Locked values** — see [ARCHITECTURE.md §12](./ARCHITECTURE.md).

## 3. Profile variant overlay

```ts
type ProfileVariantId = 'fullStackLead' | 'frontEndLead';

interface ProfileVariantMeta {
  id: ProfileVariantId;
  tagline: string;
  heroHeadline?: string;
  seo: {
    title: string;
    description: string;
  };
}
```

Variant files supply **only** fields that differ; base holds shared narrative where possible.

## 4. Summary

```ts
interface SummaryBlock {
  paragraphs: string[]; // plain text or minimal markdown (implement: plain first)
}
```

## 5. Experience

```ts
interface ExperienceEntry {
  id: string; // slug for keys
  role: string;
  organization: string;
  location?: string;
  start: string; // display: "Sep 2021"
  end: string; // "Present" or year
  note?: string;
  highlights: string[]; // bullet text; bold emphasis as plain or markup policy TBD
}
```

**Known entries (from resumes):**

- Technical Lead @ Algoworks (Sep 2021 – Present, Noida)
- Senior Full Stack Developer @ Nagarro (Jan 2019 – Aug 2021, Gurugram)

## 6. Projects

```ts
interface ProjectEntry {
  id: string; // slug e.g. conversational-payments
  title: string;
  subtitle?: string; // org · domain
  roleNote?: string;
  domainTags: string[]; // Fintech, Telecom, Enterprise, ...
  techTags: string[]; // for filters
  stackLine?: string; // optional "Technologies: ..."
  highlights: string[];
  featured?: boolean; // hero / top of grid
}
```

**Known projects (ids suggested):**

| id | title |
|----|--------|
| `conversational-payments` | Conversational Payments Platform |
| `directpay-ach` | Bank-to-Bank ACH Transfer (DirectPay) |
| `cloud-cost-management` | Cloud Resource and Cost Management |
| `endpoint-security` | Endpoint Security Portals |
| `telecom-fault-monitoring` | Telecom Fault Monitoring & AI Security Analytics |

## 7. Skills

```ts
interface SkillGroup {
  id: string;
  label: string; // "Front-End", "Languages", ...
  skills: SkillTag[];
}

interface SkillTag {
  name: string;
  highlight?: boolean; // maps to resume .tag.hi
}
```

Groups from 2026 resume: Languages, Front-End, State & Data, Back-End & APIs, Databases, Identity, Cloud & CI/CD, Monitoring, Quality, Architecture, AI/LLM, Domains, Collaboration.

## 8. Achievements

```ts
interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  icon?: 'award' | 'team' | 'quality' | 'star'; // maps to UI icon set
}
```

## 9. Education

```ts
interface EducationEntry {
  degree: string;
  institution: string;
  period: string; // "2016 – 2019"
}
```

## 10. Optional metrics (hero)

```ts
interface MetricHighlight {
  value: string; // "8+"
  label: string; // "Years experience"
}
```

Examples: 8+ years, 900+ screens, ~20 team, AI Award 2026.

## 11. File layout (implementation)

```
src/content/
  resume.base.ts          # identity, experience, projects, skills, achievements, education
  profiles/
    fullStackLead.ts      # variant meta + summary override if needed
    frontEndLead.ts
  index.ts                # getResumeData(variantId), merge logic
src/types/
  resume.ts               # interfaces above
```

## 12. Merge rules

1. `ProfileIdentity` always from base (single email/phone).
2. `variant` from `profiles/{id}.ts`.
3. `summary`: variant may override entire `SummaryBlock` or provide `summaryOverrides.paragraphs`.
4. Experience/projects/skills: shared in base unless variant file defines `omitProjectIds` / `extraHighlights` (advanced; **not required v1**).

## 13. PDF mapping

`ResumePdfDocument` receives `ResumeData` only — no separate PDF-specific JSON. Layout may **truncate** long sections for one-page PDF v1 if needed; document truncation rules in AGENT_IMPLEMENTATION_CONTEXT when implemented.

## 14. Related docs

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [AGENT_IMPLEMENTATION_CONTEXT.md](./AGENT_IMPLEMENTATION_CONTEXT.md)
