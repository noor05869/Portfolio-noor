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

export type ProjectImage = {
  src: string;
  title: string;
  tag: string;
  description: string;
};

export type Project = {
  name: string;
  featured?: boolean;
  badge?: string;
  url?: string;
  architecture?: string[];
  bullets: string[];
  stack: string[];
  images?: ProjectImage[];
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  url?: string;
  projects: Project[];
};

export const workExperience: Experience[] = [
  {
    company: 'TechBazaar.pk',
    role: 'Frontend Engineer',
    period: 'Sep 2022 – Present',
    url: 'https://techbazaar.pk',
    projects: [
      {
        name: 'AI Search & RAG Pipeline Engineer | TechVault AI',
        featured: true,
        badge: 'AI · SEARCH',
        architecture: ['FastAPI', 'LangChain', 'Gemini', 'Qdrant', 'PostgreSQL'],
        bullets: [
          'Engineered an end-to-end AI-powered search and RAG backend using FastAPI and LangChain (LCEL), converting unstructured buyer queries into grounded product recommendations and structured JSON payloads.',
          'Implemented zero-shot intent extraction using Google Gemini and Pydantic v2 schemas to parse natural-language search constraints (brand, price ceilings, stock status, category) prior to retrieval.',
          'Eliminated external embedding costs and rate limits by deploying local 384-dimensional HuggingFace embeddings (BAAI/bge-small-en-v1.5) running locally on CPU.',
          'Configured hybrid metadata-filtered vector search in Qdrant Vector DB, combining semantic cosine similarity with strict SQL-like payload filters for precise catalog matching.',
          'Architected a resilient multi-model fallback chain (gemini-flash-lite → gemini-flash) to ensure continuous service availability during API throttling or quota exhaustion.',
          'Built an incremental, checkpointed batch ingestion pipeline synchronizing catalog listings from PostgreSQL (SQLModel) into Qdrant, avoiding redundant re-embedding.',
          'Containerized infrastructure with Docker Compose managing PostgreSQL, Qdrant Vector DB, and Redis caching.',
        ],
        stack: ['Python', 'FastAPI', 'LangChain', 'Qdrant', 'Google Gemini', 'PostgreSQL', 'Docker'],
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
        images: [
          {
            src: '/workSCs/Screenshot 2026-10-02 202805.png',
            title: 'Marketplace Storefront & Flash Offers',
            tag: 'Catalog UI',
            description: 'High-density responsive storefront serving 300K+ users with 40K+ active listings, flash discounts, and instant category discovery.',
          },
          {
            src: '/workSCs/Screenshot 2026-10-02 202912.png',
            title: 'Budget Deals & Price Discovery Matrix',
            tag: 'Filters & Navigation',
            description: 'Segmented budget filters (Under 5k to 100k+) and deal widgets engineered for rapid conversion and fast mobile browsing.',
          },
          {
            src: '/workSCs/Screenshot 2026-10-02 203020.png',
            title: 'Dynamic Product View & Multi-Pack Bundles',
            tag: 'Checkout & Conversion',
            description: 'Interactive gallery, multi-quantity bundle discounts, real-time stock availability, and automated bank transfer checkout.',
          },
        ],
      },
      {
        name: 'Point of Sale (POS) & Operations System',
        featured: true,
        badge: 'ENTERPRISE · RS 163M+ VOLUME',
        bullets: [
          'Developed sales, purchasing, inventory, transaction-history, and operational reporting workflows for an enterprise web-based POS system.',
          'Created real-time financial tracking dashboards processing over 11,000+ sales and Rs. 163M+ in transaction volume.',
          'Built an integrated order queue system with customer verification, SMS triggers, spam protection, and automated shopkeeper dispatch.',
        ],
        stack: ['React.js', 'TypeScript', 'Tailwind CSS', 'State Management', 'REST APIs'],
        images: [
          {
            src: '/workSCs/pos-1.png',
            title: 'Super-Admin Operations Command Center',
            tag: 'Operations Portal',
            description: 'Central operations portal managing sales dashboards, listings, shopkeeper accounts, order logistics, and platform permissions.',
          },
          {
            src: '/workSCs/POS-2.png',
            title: 'Sales & POS Revenue Analytics Engine',
            tag: 'Financial Analytics',
            description: 'Interactive real-time metrics tracking Rs. 163M+ in POS volume, 11K+ transactions, and monthly subscription growth curves.',
          },
          {
            src: '/workSCs/POS-3.png',
            title: 'Live Order Queue & Merchant Dispatch Flow',
            tag: 'Fulfillment Pipeline',
            description: 'Real-time order pipeline with customer verification, instant SMS triggers, spam filtering, and merchant delivery routing.',
          },
        ],
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
        images: [
          {
            src: '/workSCs/Pixel-1.png',
            title: 'Pixels Galaxy Brand Storefront',
            tag: 'D2C Storefront',
            description: 'High-energy dark-mode commerce storefront built with Next.js, custom colorway showcases, and frictionless cash-on-delivery ordering.',
          },
          {
            src: '/workSCs/pixel-2.png',
            title: 'Interactive Multi-Color Configurator & Bundles',
            tag: 'Product Customizer',
            description: 'Dynamic dual-color selector, real-time stock counters, server-authoritative pricing validation, and bundle discounts.',
          },
        ],
      },
      {
        name: 'Gatekeeper (HEPTA Presence)',
        featured: true,
        badge: 'CROSS-PLATFORM · WEB & MOBILE',
        bullets: [
          'Role-aware attendance and safety foundation for schools & organizations designed across mobile and web experiences.',
          'Built welcome, sign-in, password recovery, role previews, protected kiosk-demo boundaries, mock repositories, and secure session-token storage.',
          'Implemented mobile foundation with Expo Router and React Native while web app uses protected routes and clear authentication boundaries.',
        ],
        stack: ['Next.js', 'React Native', 'Expo Router', 'TypeScript', 'TanStack Query', 'Zustand', 'Radix UI'],
        images: [
          {
            src: '/workSCs/hepta-1.png',
            title: 'Role-Aware Portal Authentication',
            tag: 'Auth & Security',
            description: 'Clean split-screen authentication with organization access controls, password recovery, and pre-configured role-preview demos.',
          },
          {
            src: '/workSCs/hepta-2.png',
            title: 'Campus Attendance & Live Headcount',
            tag: 'Roster Telemetry',
            description: 'Real-time telemetry showing live on-site student & staff counts, late arrivals, missing rosters, and campus setup workflows.',
          },
          {
            src: '/workSCs/hepta-3.png',
            title: 'Interactive Geofencing & Tablet Kiosk Setup',
            tag: 'Geospatial Boundary',
            description: 'Interactive map-based geofence radius adjustment, campus boundary definition, and physical tablet kiosk activation.',
          },
        ],
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
