import type {
  AchievementEntry,
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
    note: 'Front-end architecture and technical delivery for fintech and professional-services portal programs.',
    highlights: [
      'Currently lead a 9-member cross-functional team (BA, 2 UI/UX designers, 2 frontend, 2 backend and 2 QA engineers) on a secure client and internal engagement portal built with React, TypeScript and Azure: priorities, architecture decisions, QA standards and release readiness against a fixed delivery date.',
      'Own front-end leadership on fintech and enterprise accounts for a ~20-person delivery organization (engineers, QA, BAs): plan and assign work, set team goals, track progress, and align output with client and organizational objectives.',
      'Define and enforce front-end architecture, engineering standards, and Vue.js / TypeScript patterns for portal UI, web components, and Node.js services; run code reviews and best-practice sessions (target 100% review coverage on shared and critical paths).',
      'Mentor engineers on SPA design, API integration, testing, and production support; contribute to recruitment, onboarding, and role-fit interviews for front-end and full-stack candidates.',
      'Translate business requirements (with BAs and client stakeholders) into technical scope, UI/API decisions, and release plans; coordinate front-end, back-end, UX, and QA on defects, change requests, and go-live readiness.',
      'Drive documentation (API/UI conventions, release notes, runbooks) and quality practices (TDD, Storybook/Chromatic, linting) to reduce regressions and improve estimation accuracy.',
      'Run post-release monitoring and alerting (Sentry, CloudWatch): triage production errors, prioritize fixes with QA, and feed recurring issues back into standards and test coverage.',
      'Standardize AI-assisted delivery (MCP, Cursor, Copilot, Claude Code, agent rules and skills) for drafting, refactoring, and reviewing code against established architecture, and use MCP integrations (Azure DevOps, Microsoft 365, Jira) for contract analysis and delivery tracking.',
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
    id: 'secure-engagement-portal',
    title: 'Secure Engagement and Evidence Portal',
    subtitle: 'Client-facing & internal web portal · Professional services',
    roleNote: 'Technical lead · 9-member cross-functional team · Current project',
    domainTags: ['Professional Services', 'Security'],
    techTags: [
      'React',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zod',
      'Tailwind CSS',
      'Vitest',
      'Playwright',
      'Node.js',
      'Azure',
      'MCP',
      'Claude Code',
      'REST',
    ],
    stackLine:
      'React, TypeScript, Vite, TanStack Query, Zod, Tailwind CSS, Vitest, Playwright, Node.js, REST/OpenAPI, Azure (App Service, Entra ID, SQL, Blob Storage, DevOps pipelines), MCP, Claude Code, Agile',
    featured: true,
    highlights: [
      'Led a 9-member cross-functional team (business analyst, 2 UI/UX designers, 2 frontend, 2 backend and 2 QA engineers) from requirements to release: set priorities, split work, reviewed pull requests and unblocked decisions to meet the delivery date.',
      'Led QA: set the test-case standard with the 2 QA engineers (structure, naming, and the screens and scenarios each case must cover). Cases for login, engagement dashboard, create-engagement, uploads and deliverables live in the repository next to the code.',
      'Led backend development and helped define the architecture: REST contracts, role-based access rules for internal and external users, and how data is split across Azure SQL and Blob Storage.',
      'Closed backend gaps when the date got tight: found 48 gaps by reviewing the live OpenAPI and requirements tracker, including a security gap where engagement lists weren’t limited to the user, and drove each fix through to frontend integration (scoped lists, safe close/archive, seven-digit engagement IDs, team rosters, audit sorting and a Blob-based file and request layer).',
      'Built two products on one codebase, an internal portal and a client portal, with the server deciding each user’s role. Internal: dashboard, engagement workspace, requests, files, deliverables, users and audit log. Client: uploads, request tracking and deliverables.',
      'Cut delivery risk with a mock-or-real-API data layer, switched per feature at build time: the frontend never waited on the backend and screens went live one at a time. Per-screen show/hide switches and version-controlled environment config turned staged releases into a config change, alongside DevOps staged-slot pipelines on Azure.',
      'Turned designs and business rules into working screens with the UI/UX designers and the BA, settled open questions such as how request completion and engagement status behave, and demoed to the client in the weekly status call, turning feedback into prioritized backlog items.',
      'Raised code quality: merged two parallel upload implementations into one, removed duplicated components and an unused dependency, and enforced strict typing with about 180 automated tests plus end-to-end checks against real environments.',
      'Proposed product improvements that shipped (a context-aware support-email shortcut, live request-based progress on cards, upload validation and folder-name rules) and caught where the build contradicted agreed business rules before it reached users.',
      'AI-assisted engineering: used MCP integrations (Azure DevOps, Microsoft 365, Jira) and Claude Code for contract analysis, code review and delivery tracking.',
    ],
  },
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
      'React Web Components',
      'Pinia',
      'REST',
      'Microservices',
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
    techTags: ['Vue.js', 'Pinia', 'Node.js', 'AWS', 'REST'],
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
    techTags: ['Vue.js', 'Spring Boot', 'Vuetify', 'Java', 'Micro-frontends', 'Microservices', 'REST'],
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
    techTags: ['Vue.js', 'Spring Boot', 'Vuetify', 'Java', 'REST'],
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
    techTags: ['Spring Boot', 'JavaScript', 'Chart.js', 'Java', 'Microservices'],
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
    label: 'Languages & Runtimes',
    icon: 'code',
    skills: [
      { name: 'TypeScript', highlight: true },
      { name: 'JavaScript (ES6+)', highlight: true, tag: 'JavaScript' },
      { name: 'Node.js', highlight: true },
      { name: 'Java', highlight: true },
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
      { name: 'React Web Components', highlight: true },
      { name: 'Micro-frontends', highlight: true },
      { name: 'Vuetify' },
      { name: 'Material UI' },
      { name: 'Tailwind CSS' },
      { name: 'Stylus' },
      { name: 'Bootstrap' },
      { name: 'Vite' },
    ],
  },
  {
    id: 'ai',
    label: 'AI / LLM',
    icon: 'ai',
    featured: true,
    blurb:
      'Standardized across the team to draft, refactor and review code against the agreed architecture, with MCP integrations for contract analysis and delivery tracking.',
    skills: [
      { name: 'MCP', highlight: true },
      { name: 'Cursor', highlight: true },
      { name: 'Claude Code', highlight: true },
      { name: 'GitHub Copilot' },
      { name: 'Agent skills & rules' },
    ],
  },
  {
    id: 'state',
    label: 'State & Data',
    icon: 'state',
    skills: [
      { name: 'Pinia', highlight: true },
      { name: 'Redux / Redux Toolkit', highlight: true },
      { name: 'TanStack Query' },
      { name: 'Zod' },
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
      { name: 'Node.js', highlight: true },
      { name: 'Java', highlight: true },
      { name: 'Spring Boot' },
      { name: 'Hibernate / JPA' },
      { name: 'REST', highlight: true },
      { name: 'Swagger/OpenAPI' },
      { name: 'Microservices', highlight: true },
      { name: 'JSON / XML' },
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
      { name: 'OAuth 2.0', highlight: true, tag: 'OAuth' },
      { name: 'Auth0' },
      { name: 'Frontegg' },
      { name: 'Microsoft Entra ID' },
      { name: 'MSAL' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud & CI/CD',
    icon: 'cloud',
    featured: true,
    blurb:
      'AWS and Azure releases through GitLab, Jenkins and Azure DevOps pipelines, monitored with Sentry and CloudWatch.',
    skills: [
      { name: 'AWS', highlight: true },
      { name: 'Azure', highlight: true },
      { name: 'Azure DevOps' },
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
      { name: 'Vitest' },
      { name: 'Playwright' },
      { name: 'JUnit' },
      { name: 'ts-mocha / nyc' },
      { name: 'Storybook', highlight: true },
      { name: 'Chromatic' },
      { name: 'ESLint' },
    ],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    icon: 'architecture',
    skills: [
      { name: 'Micro-frontends', highlight: true },
      { name: 'Web components' },
      { name: 'Microservices', highlight: true },
      { name: 'Event-driven UI' },
    ],
  },
  {
    id: 'domains',
    label: 'Domains',
    icon: 'domain',
    skills: [
      { name: 'Fintech' },
      { name: 'Payments' },
      { name: 'Banking' },
      { name: 'Professional Services' },
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
    id: 'backend-gaps',
    title: '48 backend gaps found and closed',
    description:
      'Reviewed the live OpenAPI and requirements tracker under a tight deadline, including a security gap in engagement list scoping, and drove each fix through to frontend integration.',
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
      'Target 100% review coverage on shared and critical paths, set the test-case standard with QA so cases live next to the code, and feed production errors back into standards and tests so the same defect doesn’t ship twice.',
    icon: 'quality',
  },
  {
    id: 'ai',
    title: 'AI as a team practice',
    description:
      'Standardize MCP, Cursor, Copilot, Claude Code and agent rules and skills so everyone drafts, refactors and reviews against the same architecture, with engineers still accountable for what ships.',
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
