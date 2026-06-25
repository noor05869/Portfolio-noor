export const personalInfo = {
  name: 'Noor Ullah',
  role: 'Frontend Engineer',
  location: 'Pakistan',
  tagline: '4+ years building things that ship.',
  email: 'noor05869@gmail.com',
  phone: '+92 332 446 8116',
  phoneHref: '+923324468116',
  github: 'https://github.com/noor05869',
  linkedin: 'https://linkedin.com/in/noor-ullah-71a938193',
  cv: '/noor-ullah-cv.pdf',
};

export const stats = [
  { value: 4, suffix: '+', label: 'Years of Experience' },
  { value: 300, suffix: 'K+', label: 'Active Users Served' },
  { value: 92, suffix: '+', label: 'Lighthouse Score' },
  { value: 40, suffix: 'K+', label: 'Live Product Listings' },
];

export const skillGroups = [
  {
    label: 'FRONTEND',
    skills: ['React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Angular', 'Tailwind CSS'],
  },
  {
    label: 'AI & ML',
    featured: true,
    skills: ['RAG Architecture', 'OpenAI API', 'Qdrant', 'Vector Embeddings', 'LLM Tool Calling', 'AI Agents', 'MCP Servers'],
  },
  {
    label: 'BACKEND & DATA',
    skills: ['NestJS', 'Node.js', 'Redis', 'REST APIs', 'MicroORM'],
  },
  {
    label: 'TESTING & TOOLS',
    skills: ['Jest', 'React Testing Library', 'Cypress', 'Playwright', 'Git', 'Docker', 'Firebase', 'Postman'],
  },
];

export const workExperience = [
  {
    company: 'TechBazaar.pk',
    role: 'Frontend Engineer',
    period: 'Sept 2022 – Present',
    url: 'https://techbazaar.pk',
    projects: [
      {
        name: 'Marketplace Platform',
        featured: true,
        badge: 'FEATURED',
        bullets: [
          'Built with Next.js and TypeScript, serving 300K+ active users and 40K+ live product listings.',
          'Reached a 92+ Lighthouse score with SSR, code-splitting, React Query, and Zustand state management.',
        ],
        stack: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'React Query'],
      },
      {
        name: 'AI Shopping Assistant',
        featured: true,
        badge: 'AI · FEATURED',
        architecture: ['Next.js', 'NestJS', 'Qdrant', 'MySQL'],
        bullets: [
          'Built an OpenAI Assistants API agent with tool calling across search, comparison, stock checks, and recommendations.',
          'Connected a Next.js chat widget to NestJS, Qdrant, MySQL, and voice input through the Web Speech API.',
          'Uses clarifying questions around budget, brand, and use case to return ranked real-time matches.',
        ],
        stack: ['Next.js', 'NestJS', 'OpenAI API', 'Qdrant', 'Web Speech API'],
      },
      {
        name: 'RAG Conversational Search',
        bullets: [
          'Replaced conventional search with a RAG system using Qdrant, OpenAI embeddings, and NestJS microservices.',
          'Extracts intent into structured filters with GPT-4o-mini and preserves multi-turn context in Redis.',
        ],
        stack: ['NestJS', 'Qdrant', 'OpenAI API', 'Redis'],
      },
      {
        name: 'POS System',
        bullets: [
          'Built a web-based POS for sales, inventory, transaction management, and business reporting.',
        ],
        stack: ['React.js', 'TypeScript'],
      },
    ],
  },
  {
    company: 'U2Ventures Pvt Ltd',
    role: 'Frontend Developer',
    period: 'Jan 2022 – Sept 2022',
    projects: [
      {
        name: 'E-Agrimarket',
        bullets: [
          'Built a responsive agriculture trading platform with real-time market insights and advanced product filtering.',
        ],
        stack: ['React.js', 'JavaScript'],
      },
      {
        name: 'Finqalab',
        bullets: ['Built a platform for opening Investor Portfolio Securities accounts through NCCPL.'],
        stack: ['React.js', 'JavaScript'],
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
