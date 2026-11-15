import type { ResumeData } from '@/types/resume';
import {
  achievements,
  education,
  experience,
  metrics,
  profileIdentity,
  projects,
  skills,
  workPrinciples,
} from './resume.base';
import { fullStackLead } from './profiles/fullStackLead';

export function getResumeData(): ResumeData {
  const overlay = fullStackLead;
  return {
    profile: profileIdentity,
    variant: {
      id: overlay.id,
      tagline: overlay.tagline,
      heroHeadline: overlay.heroHeadline,
      seo: overlay.seo,
    },
    summary: overlay.summary,
    experience,
    projects,
    skills,
    achievements,
    education,
    workPrinciples,
    metrics,
  };
}

