export type ProfileVariantId = 'fullStackLead';

export interface ProfileIdentity {
  fullName: string;
  location: string;
  email: string;
  phone: string;
  linkedIn: { url: string; label: string };
  github: { url: string; label: string };
}

export interface ProfileVariantMeta {
  id: ProfileVariantId;
  tagline: string;
  heroHeadline?: string;
  seo: {
    title: string;
    description: string;
  };
}

export interface SummaryBlock {
  paragraphs: string[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start: string;
  end: string;
  note?: string;
  highlights: string[];
}

export interface ProjectEntry {
  id: string;
  title: string;
  subtitle?: string;
  roleNote?: string;
  domainTags: string[];
  techTags: string[];
  stackLine?: string;
  highlights: string[];
  featured?: boolean;
}

export interface SkillTag {
  name: string;
  highlight?: boolean;
  /** Project tech tag this skill filters by, when it differs from `name`. */
  tag?: string;
}

export type SkillGroupIcon =
  | 'code'
  | 'frontend'
  | 'ai'
  | 'state'
  | 'backend'
  | 'database'
  | 'identity'
  | 'cloud'
  | 'quality'
  | 'domain';

export interface SkillGroup {
  id: string;
  label: string;
  icon: SkillGroupIcon;
  /** Featured groups render as larger cards with a blurb. */
  featured?: boolean;
  blurb?: string;
  skills: SkillTag[];
}

export interface AchievementEntry {
  id: string;
  title: string;
  description: string;
  icon?: 'award' | 'team' | 'quality' | 'star';
}

export interface WorkPrinciple {
  id: string;
  title: string;
  description: string;
  icon: 'architecture' | 'quality' | 'ai' | 'people';
}

export interface LearningEntry {
  id: string;
  title: string;
  description: string;
  href: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
}

export interface MetricHighlight {
  value: string;
  label: string;
}

export interface ResumeData {
  profile: ProfileIdentity;
  variant: ProfileVariantMeta;
  summary: SummaryBlock;
  experience: ExperienceEntry[];
  projects: ProjectEntry[];
  skills: SkillGroup[];
  achievements: AchievementEntry[];
  education: EducationEntry[];
  workPrinciples: WorkPrinciple[];
  learning: LearningEntry[];
  metrics: MetricHighlight[];
}

export interface ProfileOverlay {
  id: ProfileVariantId;
  tagline: string;
  heroHeadline: string;
  seo: ProfileVariantMeta['seo'];
  summary: SummaryBlock;
}
