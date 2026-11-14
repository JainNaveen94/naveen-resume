import type {
  AchievementEntry,
  LearningEntry,
  WorkPrinciple,
  EducationEntry,
  ExperienceEntry,
  MetricHighlight,
  ProfileIdentity,
  ProjectEntry,
  SkillGroup,
} from '@/types/resume';

export const profileIdentity: ProfileIdentity = {
  fullName: 'Naveen Jain',
  location: 'Delhi, India',
  email: 'naveen.jain94@hotmail.com',
  phone: '+91-9999003538',
  linkedIn: {
    url: 'https://linkedin.com/in/naveen-jain-045500113',
    label: 'linkedin.com/in/naveen-jain-045500113',
  },
  github: {
    url: 'https://github.com/JainNaveen94',
    label: 'github.com/JainNaveen94',
  },
};

export const metrics: MetricHighlight[] = [
  { value: '8+', label: 'Years experience' },
  { value: '~20', label: 'Engineers, QA & BAs led' },
  { value: '900+', label: 'Screens in largest SPA' },
  { value: '2026', label: 'AI Innovation Award' },
];

export const experience: ExperienceEntry[] = [
  {
    id: 'algoworks-tl',
    role: 'Technical Lead',
    organization: 'Algoworks Technologies Pvt. Ltd.',
    location: 'Noida, India',
    start: 'Sep 2021',
    end: 'Present',
    note: 'Front-end architecture and technical delivery for fintech portal programs.',
    highlights: [
      'Own front-end leadership on fintech and enterprise accounts for a ~20-person delivery organization (engineers, QA, BAs): plan and assign work, set team goals, track progress, and align output with client and organizational objectives.',
      'Define and enforce front-end architecture, engineering standards, and Vue.js / TypeScript patterns for portal UI, web components, and Node.js services; run code reviews and best-practice sessions (target 100% review coverage on shared and critical paths).',
      'Mentor engineers on SPA design, API integration, testing, and production support; contribute to recruitment, onboarding, and role-fit interviews for front-end and full-stack candidates.',
      'Translate business requirements (with BAs and client stakeholders) into technical scope, UI/API decisions, and release plans; coordinate front-end, back-end, UX, and QA on defects, change requests, and go-live readiness.',
      'Drive documentation (API/UI conventions, release notes, runbooks) and quality practices (TDD, Storybook/Chromatic, linting) to reduce regressions and improve estimation accuracy.',
      'Run post-release monitoring and alerting (Sentry, CloudWatch): triage production errors, prioritize fixes with QA, and feed recurring issues back into standards and test coverage.',
      'Standardize AI-assisted delivery (MCP, Cursor, Copilot, agent rules and skills) for drafting, refactoring, and reviewing code against established architecture.',
    ],
  },
  {
    id: 'nagarro-sfsd',
    role: 'Senior Full Stack Developer',
    organization: 'Nagarro Software Pvt. Ltd.',
    location: 'Gurugram, India',
    start: 'Jan 2019',
    end: 'Aug 2021',
    highlights: [
      'Built large Vue.js SPAs (500–900+ screens) and Spring Boot microservices for cloud operations, telecom assurance, and endpoint security.',
      'Delivered REST APIs, Swagger contracts, Jenkins deployments, and client-facing resolution on UI, API, and production defects.',
    ],
  },
];

export const projects: ProjectEntry[] = [
  {
    id: 'conversational-payments',
    title: 'Conversational Payments Platform',
    subtitle: 'Merchant & Customer Portals · Fintech',
    roleNote: 'Technical lead · Front-end architecture · ~20-member program',
    domainTags: ['Fintech', 'Payments'],
    techTags: [
      'TypeScript',
      'Vue.js',
      'React',
      'Node.js',
      'OAuth',
      'AWS',
      'Jest',
      'Storybook',
      'MCP',
      'Cursor',
      'GitLab',
      'TDD',
    ],
    stackLine:
      'TypeScript, Vue.js, React, Pinia, Node.js, Auth0, Frontegg, OAuth 2.0, REST, AWS, Salesforce API, Jest, Storybook, Chromatic, Sentry, CloudWatch, GitLab',
    featured: true,
    highlights: [
      'Sole technical lead from inception for the merchant and customer portals: owned the front-end roadmap, module ownership and sprint priorities across ~20 engineers, QA and BAs, and was the client’s main contact for UI architecture, API contracts and production issues.',
      'Designed the front-end architecture: TypeScript/Vue.js SPAs with Pinia, React web components for shared UI, and a clean split between portal apps and embeddable components so one UI layer serves several surfaces.',
      'Directed blueprint-based merchant workflows (payment, donation, signature, concern) with 15+ action types, aligning BA requirements with feasible UI flows, acceptance criteria and QA strategy.',
      'Built secure sessions on OAuth 2.0 with Auth0 and Frontegg, and coached engineers on component reuse and state management.',
      'Owned ~20–30% of back-end delivery: scoped and built Node.js microservices and led restructuring of legacy services with the back-end leads.',
      'Raised release quality: TDD with Jest and Storybook/Chromatic, Sentry and CloudWatch triage of production errors fed back into standards and tests, and AWS releases with QA sign-off.',
      'Introduced AI-assisted delivery for the team (MCP, Cursor, Copilot, agent rules and skills) to draft, refactor and review code against the established architecture, the work behind the 2026 AI Innovation in Delivery Award.',
    ],
  },
  {
    id: 'directpay-ach',
    title: 'Bank-to-Bank ACH Transfer (DirectPay)',
    subtitle: 'Web platform · Fintech',
    domainTags: ['Fintech', 'Banking'],
    techTags: ['Vue.js', 'Pinia', 'Node.js', 'AWS'],
    stackLine: 'Vue.js, Pinia, Node.js, REST, FinServ APIs, AWS, Git, Agile',
    highlights: [
      'Built account-registration and ACH transfer flows with FinServ API integration for bank verification, onboarding, and transaction processing.',
      'Partnered with back-end teams on validation, access control, and session handling for financial compliance.',
    ],
  },
  {
    id: 'cloud-cost-management',
    title: 'Cloud Resource and Cost Management',
    subtitle: 'Micro-frontend · 900+ screens',
    domainTags: ['Enterprise SaaS'],
    techTags: ['Vue.js', 'Spring Boot', 'Vuetify', 'Java'],
    stackLine: 'Java 8, Spring Boot, Hibernate/JPA, Vue.js, Vuetify, Axios, Stylus, Ace.js',
    highlights: [
      'Global enterprise cloud operations: user and admin management, usage logs, billing, and module UI with a custom component library and Ace.js editor integration.',
      'Built Spring Boot REST microservices with Swagger, paired with end-to-end Vue integration and client defect closure.',
    ],
  },
  {
    id: 'endpoint-security',
    title: 'Endpoint Security Portals',
    subtitle: 'Admin, User, Agent · 500+ screens',
    domainTags: ['Enterprise SaaS'],
    techTags: ['Vue.js', 'Spring Boot', 'Vuetify'],
    stackLine: 'Java 8, Spring Boot, Hibernate/JPA, Vue.js, Vuetify, Axios, Stylus',
    highlights: [
      'Secure-mobility products for a global IT group: large Vue.js SPA portals for usage logs, module CRUD, and custom UI with Vuetify and Stylus.',
      'Delivered Spring Boot REST APIs and client POCs proposing changes to the existing system.',
    ],
  },
  {
    id: 'telecom-fault-monitoring',
    title: 'Telecom Fault Monitoring & AI Security Analytics',
    subtitle: 'Microservices · dashboards',
    domainTags: ['Telecom'],
    techTags: ['Spring Boot', 'JavaScript', 'Chart.js'],
    stackLine:
      'Java 8, Spring Boot, Hibernate/JPA, web components, JavaScript, Chart.js, Bootstrap, Jenkins',
    highlights: [
      'Global telecom assurance platform: fault-monitoring dashboard and Spring Boot services with service-to-service communication, Swagger, and Jenkins releases.',
      'Finnish telecom major: video-analytics monitoring UI for historical data, live feeds, and analytic charts, from PoC to production.',
    ],
  },
];

export const skills: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: 'code',
    skills: [
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript (ES6+)', highlight: true, tag: 'JavaScript' },
      { name: 'Java' },
      { name: 'HTML5' },
      { name: 'CSS' },
      { name: 'SQL' },
    ],
  },
  {
    id: 'frontend',
    label: 'Front-End',
    icon: 'frontend',
    featured: true,
    blurb:
      'Large Vue.js SPAs (500–900+ screens) and React web components for shared UI.',
    skills: [
      { name: 'Vue.js (SPA, Pinia)', highlight: true, tag: 'Vue.js' },
      { name: 'React', highlight: true },
      { name: 'React Web Components' },
      { name: 'Vuetify' },
      { name: 'Material UI' },
      { name: 'Bootstrap' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    icon: 'ai',
    featured: true,
    blurb:
      'Standardized across the team to draft, refactor and review code against the agreed architecture.',
    skills: [
      { name: 'MCP', highlight: true },
      { name: 'Cursor', highlight: true },
      { name: 'GitHub Copilot' },
      { name: 'Agent skills & rules' },
    ],
  },
  {
    id: 'state',
    label: 'State & Data',
    icon: 'state',
    skills: [
      { name: 'Pinia' },
      { name: 'Redux / Redux Toolkit' },
      { name: 'React Query' },
      { name: 'Axios' },
    ],
  },
  {
    id: 'backend',
    label: 'Back-End & APIs',
    icon: 'backend',
    featured: true,
    blurb:
      'Node.js and Spring Boot microservices behind complex REST APIs, documented with Swagger/OpenAPI.',
    skills: [
      { name: 'Node.js' },
      { name: 'Spring Boot' },
      { name: 'REST' },
      { name: 'Swagger/OpenAPI' },
      { name: 'Microservices' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    icon: 'database',
    skills: [
      { name: 'MySQL', highlight: true },
      { name: 'SQLite' },
    ],
  },
  {
    id: 'identity',
    label: 'Identity',
    icon: 'identity',
    skills: [
      { name: 'OAuth 2.0' },
      { name: 'Auth0' },
      { name: 'Frontegg' },
      { name: 'MSAL' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & CI/CD',
    icon: 'cloud',
    featured: true,
    blurb:
      'AWS releases through GitLab and Jenkins pipelines, monitored with Sentry and CloudWatch.',
    skills: [
      { name: 'AWS', highlight: true },
      { name: 'GitLab CI/CD', highlight: true, tag: 'GitLab' },
      { name: 'Jenkins' },
      { name: 'Git' },
      { name: 'Sentry' },
      { name: 'AWS CloudWatch' },
    ],
  },
  {
    id: 'quality',
    label: 'Quality',
    icon: 'quality',
    skills: [
      { name: 'TDD', highlight: true },
      { name: 'Jest' },
      { name: 'Storybook' },
      { name: 'Chromatic' },
      { name: 'ESLint' },
    ],
  },
  {
    id: 'domains',
    label: 'Domains',
    icon: 'domain',
    skills: [
      { name: 'Fintech' },
      { name: 'Payments' },
      { name: 'Telecom' },
      { name: 'Enterprise SaaS' },
    ],
  },
];

export const achievements: AchievementEntry[] = [
  {
    id: 'ai-award',
    title: 'AI Innovation in Delivery Award (2026)',
    description: 'Algoworks; presented by the CEO at the Algomo ’26 ceremony.',
    icon: 'award',
  },
  {
    id: 'cheer-board',
    title: 'Cheer Board, three times',
    description:
      'Named for performance by Nagarro and its clients; customer appreciation on multiple engagements.',
    icon: 'star',
  },
  {
    id: 'code-review',
    title: '100% code review coverage target',
    description:
      'Reviews and best-practice sessions on shared and critical paths; production issues fed back into standards and tests.',
    icon: 'quality',
  },
  {
    id: 'team-lead',
    title: '~20-person cross-functional delivery',
    description:
      'Leads engineers, QA, and business analysts on fintech portal programs from inception to production.',
    icon: 'team',
  },
];

export const education: EducationEntry[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution:
      "Bharati Vidyapeeth's Institute of Computer Applications and Management, Indraprastha University, Delhi",
    period: '2016 – 2019',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution:
      'Sri Guru Tegh Bahadur Institute of Management and Information Technology, Indraprastha University, Delhi',
    period: '2013 – 2016',
  },
];

export const workPrinciples: WorkPrinciple[] = [
  {
    id: 'architecture',
    title: 'Architecture before features',
    description:
      'Agree the patterns first: component boundaries, state management, API contracts. Then enforce them through shared libraries and reviews so a 500+ screen SPA stays maintainable.',
    icon: 'architecture',
  },
  {
    id: 'quality-loop',
    title: 'Close the quality loop',
    description:
      'Target 100% review coverage on shared and critical paths. Production errors from Sentry and CloudWatch go back into standards and tests, so the same defect doesn’t ship twice.',
    icon: 'quality',
  },
  {
    id: 'ai',
    title: 'AI as a team practice',
    description:
      'Standardize MCP, Cursor, Copilot and agent rules and skills so everyone drafts, refactors and reviews against the same architecture, with engineers still accountable for what ships.',
    icon: 'ai',
  },
  {
    id: 'people',
    title: 'Bridge business and engineering',
    description:
      'Turn BA and client requirements into scoped work and acceptance criteria. Coordinate front-end, back-end, UX and QA, mentor engineers, and help hire and onboard the next ones.',
    icon: 'people',
  },
];

export const learning: LearningEntry[] = [
  {
    id: 'react-mastery',
    title: 'React Mastery Notes',
    description: 'My personal study notes on React, kept as a quick reference.',
    href: '/notes/React_Mastery_Notes.pdf',
  },
  {
    id: 'react-optimization',
    title: 'React Optimization & Advanced Hooks',
    description: 'Notes on React performance optimization and advanced hooks.',
    href: '/notes/React_Optimization_and_Advanced_Hooks.pdf',
  },
];
