export const personalInfo = {
  name: 'Noor Ullah',
  role: 'Senior Frontend Engineer',
  location: 'Pakistan',
  tagline: 'Senior Frontend Engineer with Backend Expertise & 4+ years building scalable commerce & AI applications.',
  email: 'noor05869@gmail.com',
  phone: '+92 332 446 8116',
  phoneHref: '+923324468116',
  github: 'https://github.com/noor05869',
  linkedin: 'https://linkedin.com/in/noor-ullah-71a938193',
  cv: '/noor-ullah-cv.pdf',
};

export const stats = [
  { value: 4, suffix: '+', label: 'Years Experience' },
  { value: 300, suffix: 'K+', label: 'Active Users Served' },
  { value: 92, suffix: '+', label: 'Lighthouse Score' },
  { value: 40, suffix: 'K+', label: 'Live Product Listings' },
];

export const skillGroups = [
  {
    label: 'FRONTEND & MOBILE',
    skills: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Angular', 'React Native', 'Expo', 'Expo Router', 'Tailwind CSS', 'HTML5 / CSS3'],
  },
  {
    label: 'AI & BACKEND EXPERTISE',
    featured: true,
    skills: ['NestJS', 'Node.js', 'Qdrant Vector DB', 'OpenAI Embeddings', 'OpenAI Assistants API', 'RAG Architecture', 'Redis', 'REST APIs', 'Supabase', 'MySQL'],
  },
  {
    label: 'ARCHITECTURE & STATE',
    skills: ['TanStack Query', 'Zustand', 'Redux Toolkit', 'Radix UI', 'React Hook Form', 'Zod'],
  },
  {
    label: 'TESTING & QUALITY',
    skills: ['Jest', 'React Testing Library', 'Playwright', 'Cypress', 'Vitest'],
  },
  {
    label: 'PLATFORM & DEVOPS',
    skills: ['Docker', 'Git', 'GitHub Actions', 'Firebase', 'Resend', 'VS Code', 'Postman'],
  },
];

export const workExperience = [
  {
    company: 'TechBazaar.pk',
    role: 'Frontend Engineer',
    period: 'Sep 2022 – Present',
    url: 'https://techbazaar.pk',
    projects: [
      {
        name: 'AI Product Discovery & RAG Conversational Search',
        featured: true,
        badge: 'AI · SEARCH',
        architecture: ['Next.js', 'NestJS', 'Qdrant', 'OpenAI', 'Redis'],
        bullets: [
          'Designed and implemented production conversational search using Qdrant vector retrieval, OpenAI embeddings, and NestJS microservices.',
          'Built a GPT-4o-mini intent pipeline with structured JSON output translating natural-language queries into budget, category, brand, and use-case filters.',
          'Developed hybrid search combining Qdrant ANN retrieval with structured SQL filters and Redis-backed memory for multi-turn conversations.',
          'Introduced Jest and React Testing Library coverage for intent extraction, search-pipeline logic, API integration, and frontend behavior.',
        ],
        stack: ['NestJS', 'Qdrant', 'OpenAI API', 'Redis', 'Jest', 'RAG'],
      },
      {
        name: 'Marketplace Platform',
        featured: true,
        badge: 'SCALE · 300K+ USERS',
        bullets: [
          'Built responsive product discovery, cart, checkout, payment, and order flows for a marketplace serving 300K+ active users and 40K+ live listings.',
          'Architected reusable server/client and desktop/mobile modules with Next.js, TypeScript, Axios, TanStack Query, and Zustand.',
          'Achieved a 92+ Google Lighthouse performance score through optimized rendering, code splitting, and careful client-side boundaries.',
        ],
        stack: ['Next.js', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
      },
      {
        name: 'AI Shopping Assistant',
        featured: true,
        badge: 'AI AGENT',
        architecture: ['Next.js', 'NestJS', 'OpenAI Assistants', 'Qdrant'],
        bullets: [
          'Implemented an OpenAI Assistants API agent with tool calling for search, comparison, stock checks, and recommendations across Next.js and NestJS.',
          'Designed a conversational experience that gathers budget, category, brand, and use-case requirements before returning relevant catalog results, with voice input via Web Speech API.',
        ],
        stack: ['Next.js', 'NestJS', 'OpenAI Assistants', 'Qdrant', 'Web Speech API'],
      },
      {
        name: 'Point of Sale (POS) System',
        bullets: [
          'Developed sales, purchasing, inventory, transaction-history, and operational reporting workflows for a web-based POS system.',
        ],
        stack: ['React.js', 'TypeScript', 'State Management'],
      },
    ],
  },
  {
    company: 'Featured Projects',
    role: 'Creator & Engineer',
    period: '2023 – 2024',
    projects: [
      {
        name: 'Pixels Galaxy',
        featured: true,
        badge: 'COMMERCE · LIVE',
        url: 'https://pixelsgalaxy.com',
        bullets: [
          'An online commerce storefront focused on reliable cash-on-delivery ordering and a fast shopping experience.',
          'Built cart, checkout, server-authoritative PKR price validation, Supabase order management, protected admin, Resend notifications, SEO, and Vitest coverage.',
          'Implemented defensive order handling with expected-total and catalogue-revision checks so the server remains authoritative during checkout.',
        ],
        stack: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Zod', 'Resend', 'Vitest'],
      },
      {
        name: 'Gatekeeper (HEPTA)',
        badge: 'CROSS-PLATFORM',
        bullets: [
          'Role-aware attendance and safety foundation for schools & organizations designed across mobile and web experiences.',
          'Built welcome, sign-in, password recovery, role previews, protected kiosk-demo boundaries, mock repositories, and secure session-token storage.',
          'Implemented mobile foundation with Expo Router and React Native while web app uses protected routes and clear authentication boundaries.',
        ],
        stack: ['Next.js', 'React Native', 'Expo Router', 'TypeScript', 'TanStack Query', 'Zustand', 'Radix UI'],
      },
      {
        name: 'Progress Tracker',
        badge: 'PRODUCTIVITY',
        bullets: [
          'Responsive solo project-management tool for turning projects into reviewable task plans and tracking work through constrained status board.',
          'Built project creation, editable AI-labelled local plan drafts, review and acceptance flows, task views, validation, and local persistence.',
          'Added explicit task-transition rules and a NestJS health endpoint scaffold with interaction tests.',
        ],
        stack: ['Next.js', 'React', 'TypeScript', 'NestJS', 'React Hook Form', 'Zod', 'Radix UI', 'Vitest'],
      },
    ],
  },
  {
    company: 'U2Ventures Pvt Ltd',
    role: 'Frontend Developer',
    period: 'Jan 2022 – Sep 2022',
    projects: [
      {
        name: 'Company Website & Shared UI Systems',
        bullets: [
          'Built the company website frontend in React from the ground up, establishing reusable component and state-management patterns.',
          'Created shared UI libraries and API integration layers for React applications backed by Django and Express.',
        ],
        stack: ['React.js', 'JavaScript', 'Django', 'Express'],
      },
      {
        name: 'E-Agrimarket & Finqalab',
        bullets: [
          'Delivered responsive interfaces for E-Agrimarket and Finqalab, including market dashboards, filtering, and investor-account onboarding workflows.',
        ],
        stack: ['React.js', 'JavaScript', 'State Management'],
      },
    ],
  },
];

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];
