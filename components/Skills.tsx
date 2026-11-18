'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Grid,
  Layers,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import Reveal from './Reveal';
import { TechLogo } from './icons/TechLogos';

type SkillCategory = 'all' | 'frontend' | 'ai' | 'backend' | 'state' | 'testing' | 'devops';

interface SkillItem {
  name: string;
  category: 'frontend' | 'ai' | 'backend' | 'state' | 'testing' | 'devops';
  badge: string;
  description: string;
  featured?: boolean;
}

const ALL_SKILLS: SkillItem[] = [
  // Frontend & Mobile
  {
    name: 'React.js',
    category: 'frontend',
    badge: 'Core Stack',
    description: 'Concurrent rendering, custom hooks, reusable design systems & component architecture.',
    featured: true,
  },
  {
    name: 'Next.js',
    category: 'frontend',
    badge: 'Core Stack',
    description: 'App Router, Server Components (RSC), Server Actions, ISR, and dynamic streaming.',
    featured: true,
  },
  {
    name: 'TypeScript',
    category: 'frontend',
    badge: 'Daily Driver',
    description: 'Strict type safety, generic utility types, and contract-first interface design.',
    featured: true,
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    badge: 'Core Stack',
    description: 'Utility-first styling, OKLCH design tokens, responsive breakpoints, zero runtime.',
    featured: true,
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    badge: 'Advanced',
    description: 'Event loop mastery, async/await patterns, modern ES modules, and DOM performance.',
  },
  {
    name: 'React Native',
    category: 'frontend',
    badge: 'Mobile',
    description: 'Cross-platform native mobile applications with shared business logic.',
  },
  {
    name: 'Expo & Expo Router',
    category: 'frontend',
    badge: 'Mobile',
    description: 'File-based native routing, native device APIs, and headless kiosk deployments.',
  },
  {
    name: 'Angular',
    category: 'frontend',
    badge: 'Enterprise',
    description: 'Dependency injection, RxJS reactive streams, and modular architectures.',
  },
  {
    name: 'HTML5 / Modern CSS',
    category: 'frontend',
    badge: 'Foundation',
    description: 'Semantic markup, accessibility (ARIA), CSS Grid, and high-performance canvas.',
  },

  // AI & Systems
  {
    name: 'Google Gemini API',
    category: 'ai',
    badge: 'Production',
    description: 'Multimodal LLM integration, zero-shot intent extraction, and structured JSON parsing.',
    featured: true,
  },
  {
    name: 'FastAPI',
    category: 'ai',
    badge: 'Production',
    description: 'Asynchronous Python endpoints, sub-50ms RAG pipelines, and Pydantic v2 schemas.',
    featured: true,
  },
  {
    name: 'Qdrant Vector DB',
    category: 'ai',
    badge: 'Production',
    description: 'Hybrid vector search combining cosine similarity with strict metadata payload filters.',
    featured: true,
  },
  {
    name: 'LangChain (LCEL)',
    category: 'ai',
    badge: 'Production',
    description: 'Composable retrieval chains, document transformers, and agent memory.',
  },
  {
    name: 'OpenAI API & Tools',
    category: 'ai',
    badge: 'Production',
    description: 'Assistants API, function calling, tool execution, and vector embeddings.',
  },

  // Backend & Databases
  {
    name: 'Node.js',
    category: 'backend',
    badge: 'Production',
    description: 'Scalable async microservices, stream processing, and REST API development.',
    featured: true,
  },
  {
    name: 'NestJS',
    category: 'backend',
    badge: 'Enterprise',
    description: 'Enterprise TypeScript backend, modular IoC containers, and guard pipelines.',
  },
  {
    name: 'PostgreSQL',
    category: 'backend',
    badge: 'Primary DB',
    description: 'Relational database architecture, complex indexing, ACID transactions, SQLModel.',
    featured: true,
  },
  {
    name: 'Supabase',
    category: 'backend',
    badge: 'Cloud DB',
    description: 'Managed PostgreSQL, Row-Level Security (RLS), auth guards, and real-time streams.',
  },
  {
    name: 'Redis',
    category: 'backend',
    badge: 'In-Memory',
    description: 'Sub-millisecond caching layers, session stores, rate-limiting, and Pub/Sub.',
  },
  {
    name: 'MySQL',
    category: 'backend',
    badge: 'Relational',
    description: 'Database schema normalization, indexing strategies, and multi-tenant queries.',
  },
  {
    name: 'Python',
    category: 'backend',
    badge: 'AI & Data',
    description: 'Batch ingestion scripts, vector database synchronization, and data modeling.',
  },

  // State Management & Architecture
  {
    name: 'TanStack Query v5',
    category: 'state',
    badge: 'Core Stack',
    description: 'Server-state hydration, aggressive background caching, and optimistic mutations.',
    featured: true,
  },
  {
    name: 'Zustand',
    category: 'state',
    badge: 'Core Stack',
    description: 'Minimal atomic client state stores with zero boilerplate and shallow selectors.',
    featured: true,
  },
  {
    name: 'Zod',
    category: 'state',
    badge: 'Validation',
    description: 'Defensive runtime type validation, schema inference, and tamper prevention.',
    featured: true,
  },
  {
    name: 'Redux Toolkit',
    category: 'state',
    badge: 'State',
    description: 'Normalized global client state, immutable updates, and middleware logging.',
  },
  {
    name: 'React Hook Form',
    category: 'state',
    badge: 'Forms',
    description: 'High-performance uncontrolled form state management without re-render lag.',
  },
  {
    name: 'Radix UI',
    category: 'state',
    badge: 'Primitives',
    description: 'Unstyled, accessible WAI-ARIA compliant dialogs, popovers, and primitives.',
  },

  // Testing & Quality
  {
    name: 'Vitest',
    category: 'testing',
    badge: 'Testing',
    description: 'Next-generation ESM-native unit and integration test runner with instant feedback.',
    featured: true,
  },
  {
    name: 'Jest',
    category: 'testing',
    badge: 'Testing',
    description: 'Automated unit test suites, mock implementations, and snapshot coverage.',
  },
  {
    name: 'React Testing Library',
    category: 'testing',
    badge: 'UI Testing',
    description: 'User-centric component assertions following accessibility best practices.',
  },
  {
    name: 'Playwright',
    category: 'testing',
    badge: 'E2E Testing',
    description: 'Cross-browser end-to-end regression testing and headless automated runs.',
  },
  {
    name: 'Cypress',
    category: 'testing',
    badge: 'E2E Testing',
    description: 'Browser workflow automation and checkout flow verification.',
  },

  // DevOps & Tooling
  {
    name: 'Docker & Compose',
    category: 'devops',
    badge: 'DevOps',
    description: 'Containerized multi-service development environments (Postgres, Qdrant, Redis).',
    featured: true,
  },
  {
    name: 'Git',
    category: 'devops',
    badge: 'VCS',
    description: 'Trunk-based development, semantic commit conventions, and branch management.',
  },
  {
    name: 'GitHub Actions',
    category: 'devops',
    badge: 'CI/CD',
    description: 'Automated CI/CD pipelines, type-checking, linting, and automated Vercel deploys.',
  },
  {
    name: 'Postman',
    category: 'devops',
    badge: 'API Tooling',
    description: 'API contract testing, environment mocks, and collection documentation.',
  },
  {
    name: 'Firebase',
    category: 'devops',
    badge: 'Cloud',
    description: 'Authentication, Firestore real-time database, and cloud asset hosting.',
  },
];

const CATEGORIES: { id: SkillCategory; label: string; count: number }[] = [
  { id: 'all', label: 'All Stack', count: ALL_SKILLS.length },
  { id: 'frontend', label: 'Frontend & Mobile', count: ALL_SKILLS.filter(s => s.category === 'frontend').length },
  { id: 'ai', label: 'AI & Systems', count: ALL_SKILLS.filter(s => s.category === 'ai').length },
  { id: 'backend', label: 'Backend & DBs', count: ALL_SKILLS.filter(s => s.category === 'backend').length },
  { id: 'state', label: 'State & Arch', count: ALL_SKILLS.filter(s => s.category === 'state').length },
  { id: 'testing', label: 'Testing', count: ALL_SKILLS.filter(s => s.category === 'testing').length },
  { id: 'devops', label: 'DevOps & Tools', count: ALL_SKILLS.filter(s => s.category === 'devops').length },
];

// Preserved L1-L5 system architecture layers for deep spec view
const systemCategories = [
  {
    layer: 'L1',
    title: 'Frontend & Web Platforms',
    icon: Layers,
    summary: 'Streaming SSR interfaces, accessible design primitives, and cross-platform mobile apps.',
    highlight: 'Next.js 14+ · React 18/19 · TypeScript · Tailwind CSS',
    skills: ['TypeScript', 'React.js', 'Next.js (App Router)', 'Tailwind CSS', 'Angular', 'React Native', 'Expo Router', 'HTML5 / Modern CSS'],
    telemetry: '92+ Lighthouse Target',
    appliedIn: 'TechBazaar.pk · Pixels Galaxy · Gatekeeper',
  },
  {
    layer: 'L2',
    title: 'AI, RAG & Vector Systems',
    icon: Bot,
    featured: true,
    summary: 'Semantic product retrieval, local CPU embeddings, and structured Gemini intent parsing.',
    highlight: 'FastAPI · LangChain · Gemini API · Qdrant Vector DB',
    skills: ['FastAPI', 'LangChain (LCEL)', 'Google Gemini API', 'Qdrant Vector DB', 'OpenAI Assistants & Tools', 'HuggingFace Embeddings', 'RAG Pipelines', 'Pydantic v2'],
    telemetry: 'Zero-Cost Local Embeddings',
    appliedIn: 'TechVault AI Search · AI Shopping Assistant',
  },
  {
    layer: 'L3',
    title: 'State & Data Flow',
    icon: Cpu,
    summary: 'Atomic client state selectors, server-cache invalidation, and defensive form validation.',
    highlight: 'TanStack Query v5 · Zustand · Zod · React Hook Form',
    skills: ['TanStack Query v5', 'Zustand', 'Redux Toolkit', 'Zod', 'React Hook Form', 'Radix UI Primitives', 'Axios'],
    telemetry: 'Optimistic UI Updates',
    appliedIn: '40K+ Catalog Grid · Real-time Cart',
  },
  {
    layer: 'L4',
    title: 'Backend & Storage',
    icon: Database,
    summary: 'Server-authoritative checkout checks, relational modeling, and sub-50ms cache layers.',
    highlight: 'Node.js · NestJS · Supabase · Redis · PostgreSQL',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Redis Caching', 'MySQL', 'REST APIs'],
    telemetry: 'Authoritative Checks',
    appliedIn: 'POS Operations · Pixels Galaxy Checkout',
  },
  {
    layer: 'L5',
    title: 'Testing & Infrastructure',
    icon: ShieldCheck,
    summary: 'End-to-end automated regression suites, containerized deployments, and CI pipelines.',
    highlight: 'Vitest · Playwright · Jest · Docker · GitHub Actions',
    skills: ['Vitest', 'Jest', 'React Testing Library', 'Playwright', 'Docker Compose', 'GitHub Actions', 'Postman'],
    telemetry: 'Automated CI/CD',
    appliedIn: 'Multi-service Docker · E2E Checkout Flows',
  },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'logos' | 'layers'>('logos');
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(1);
  const reduceMotion = useReducedMotion();

  // Filter skills
  const filteredSkills = useMemo(() => {
    return ALL_SKILLS.filter((skill) => {
      const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
      const matchesQuery =
        searchQuery.trim() === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.badge.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const activeLayer = systemCategories[selectedLayerIndex];
  const ActiveLayerIcon = activeLayer.icon;

  return (
    <section id="skills" className="section-space relative border-t border-ink/[0.08] bg-canvas">
      <div className="page-shell">
        <Reveal>
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber tabular-nums">02</span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Technical Stack &amp; Skills
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Skills &amp; Technologies.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">
                Battle-tested tools, frameworks, and architectures I use to build scalable web applications and AI systems.
              </p>
            </div>

            {/* View Switcher: Logos Matrix vs Architecture Layers */}
            <div className="inline-flex w-fit rounded-xl border border-ink/10 bg-surface p-1 shadow-sm shrink-0" role="tablist" aria-label="Skills display mode">
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'logos'}
                onClick={() => setViewMode('logos')}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  viewMode === 'logos' ? 'text-canvas font-semibold' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {viewMode === 'logos' && (
                  <motion.span
                    layoutId="skills-mode-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-ink"
                  />
                )}
                <Grid size={13} className="relative z-10" />
                <span className="relative z-10">Skills &amp; Logos ({ALL_SKILLS.length})</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={viewMode === 'layers'}
                onClick={() => setViewMode('layers')}
                className={`relative flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${
                  viewMode === 'layers' ? 'text-canvas font-semibold' : 'text-ink-secondary hover:text-ink'
                }`}
              >
                {viewMode === 'layers' && (
                  <motion.span
                    layoutId="skills-mode-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-ink"
                  />
                )}
                <Layers size={13} className="relative z-10" />
                <span className="relative z-10">System Layers (L1–L5)</span>
              </button>
            </div>
          </div>
        </Reveal>

        {/* VIEW 1: All Skills with Brand Logos */}
        {viewMode === 'logos' && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between border-y border-ink/[0.08] py-3.5">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter skills by domain">
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`rounded-lg px-3 py-1 font-mono text-xs transition-colors ${
                        active
                          ? 'bg-amber text-canvas font-semibold shadow-xs'
                          : 'bg-surface text-ink-secondary hover:bg-canvas-subtle hover:text-ink border border-ink/[0.08]'
                      }`}
                    >
                      {cat.label}
                      <span className="ml-1.5 text-[10px] opacity-75 tabular-nums">({cat.count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Search Field */}
              <div className="relative w-full max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search skills (e.g. React, Python)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-ink/10 bg-surface py-1.5 pl-8 pr-8 font-mono text-xs text-ink placeholder:text-ink-muted focus:border-amber focus:outline-none shadow-xs"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink"
                    aria-label="Clear search"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>
            </div>

            {/* Skills Grid with Official Logos */}
            {filteredSkills.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 py-12 text-center">
                <p className="font-mono text-xs text-ink-muted">
                  No skills matched &ldquo;{searchQuery}&rdquo; in this category.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-3 rounded-lg border border-ink/15 bg-surface px-3 py-1 font-mono text-xs text-ink hover:bg-canvas-subtle"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filteredSkills.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: Math.min(0.25, idx * 0.02) }}
                    className="group relative flex flex-col justify-between rounded-xl border border-ink/[0.08] bg-surface p-4 shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:border-amber/40 hover:shadow-md"
                  >
                    <div>
                      {/* Top Row: Logo + Name + Badge */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Logo Frame */}
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ink/[0.08] bg-canvas p-2 shadow-xs transition-transform duration-150 group-hover:scale-105">
                            <TechLogo name={skill.name} size={22} className="shrink-0" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display text-sm font-bold text-ink truncate group-hover:text-amber transition-colors">
                              {skill.name}
                            </h3>
                            <span className="font-mono text-[10px] text-ink-muted uppercase tracking-wider block">
                              {skill.category}
                            </span>
                          </div>
                        </div>

                        {skill.featured ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber/30 bg-amber/[0.08] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber shrink-0">
                            <Sparkles size={10} />
                            Core
                          </span>
                        ) : (
                          <span className="rounded-md border border-ink/[0.06] bg-canvas-subtle px-1.5 py-0.5 font-mono text-[9px] font-medium text-ink-muted shrink-0">
                            {skill.badge}
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs leading-relaxed text-ink-secondary line-clamp-2">
                        {skill.description}
                      </p>
                    </div>

                    {/* Subtle bottom indicator */}
                    <div className="mt-3 border-t border-ink/[0.04] pt-2 flex items-center justify-between font-mono text-[10px] text-ink-muted">
                      <span>Production</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-amber">
                        Verified &rarr;
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Bottom summary bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/[0.08] bg-canvas-subtle p-3.5 font-mono text-xs text-ink-muted">
              <span>Showing {filteredSkills.length} of {ALL_SKILLS.length} verified technologies</span>
              <span className="text-amber">100% Vector Brand Logos · Production Proven</span>
            </div>
          </div>
        )}

        {/* VIEW 2: System Layers & Tooling (Preserved Architecture Spec) */}
        {viewMode === 'layers' && (
          <div className="grid gap-6 lg:grid-cols-[330px_1fr] lg:items-stretch">
            {/* Left Column: Layer Index */}
            <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="System architecture layers">
              {systemCategories.map((cat, idx) => {
                const Icon = cat.icon;
                const isSelected = selectedLayerIndex === idx;
                return (
                  <button
                    key={cat.layer}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`group relative flex shrink-0 items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors lg:w-full ${
                      isSelected
                        ? 'border-ink/20 bg-surface text-ink shadow-card'
                        : 'border-ink/[0.07] bg-canvas-subtle/60 text-ink-secondary hover:border-ink/15 hover:bg-surface'
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="stack-active-bar"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="hidden lg:block absolute left-0 top-2.5 bottom-2.5 w-1 rounded-r-full bg-amber"
                      />
                    )}
                    <div className="flex items-center gap-3 min-w-0">
                      <span
                        className={`font-mono text-xs font-bold tabular-nums ${
                          isSelected ? 'text-amber' : 'text-ink-muted'
                        }`}
                      >
                        {cat.layer}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-sm font-bold truncate">{cat.title}</p>
                        <p className="hidden lg:block font-mono text-[10px] text-ink-muted truncate">
                          {cat.skills.slice(0, 3).join(' · ')}
                        </p>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                      <Icon size={15} className={isSelected ? 'text-amber' : 'text-ink-muted'} />
                      <ArrowRight
                        size={13}
                        className={`transition-transform ${
                          isSelected ? 'text-ink translate-x-0.5' : 'text-ink-muted opacity-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Live Layer Specification Panel */}
            <div className="rounded-2xl border border-ink/10 bg-surface p-6 sm:p-8 shadow-card flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLayer.layer}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: 'easeOut' }}
                  className="flex h-full flex-col justify-between space-y-6"
                >
                  <div className="space-y-5">
                    {/* Top Badge Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.08] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber/25 bg-amber/[0.08] text-amber">
                          <ActiveLayerIcon size={18} />
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-amber">{activeLayer.layer}</span>
                            <h3 className="font-display text-xl font-bold text-ink">{activeLayer.title}</h3>
                          </div>
                          <p className="font-mono text-xs text-ink-muted">{activeLayer.highlight}</p>
                        </div>
                      </div>

                      {activeLayer.featured && (
                        <span className="inline-flex items-center rounded-full border border-amber/30 bg-amber/[0.08] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber">
                          Core Focus
                        </span>
                      )}
                    </div>

                    {/* Summary */}
                    <p className="text-sm sm:text-base leading-relaxed text-ink-secondary">
                      {activeLayer.summary}
                    </p>

                    {/* Interactive Technology Chips with Logos */}
                    <div>
                      <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                        Core Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {activeLayer.skills.map((skill) => (
                          <span key={skill} className="tag text-xs py-1.5 px-3 flex items-center gap-2">
                            <TechLogo name={skill} size={15} />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spec Footer */}
                  <div className="grid gap-3 border-t border-ink/[0.08] pt-5 sm:grid-cols-2 font-mono text-xs">
                    <div className="flex items-center gap-2 text-ink-secondary">
                      <CheckCircle2 size={14} className="text-emerald shrink-0" />
                      <span>{activeLayer.appliedIn}</span>
                    </div>
                    <div className="sm:text-right">
                      <span className="inline-flex items-center rounded-md border border-amber/20 bg-amber/[0.06] px-2.5 py-1 font-semibold text-amber">
                        {activeLayer.telemetry}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
