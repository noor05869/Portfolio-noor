'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Bot, CheckCircle2, Cpu, Database, Layers, ShieldCheck } from 'lucide-react';
import Reveal from './Reveal';

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
  const [selectedIndex, setSelectedIndex] = useState(1);
  const reduceMotion = useReducedMotion();
  const active = systemCategories[selectedIndex];
  const ActiveIcon = active.icon;

  return (
    <section id="skills" className="section-space relative border-t border-ink/[0.08] bg-canvas">
      <div className="page-shell">
        <Reveal>
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber tabular-nums">02</span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Engineering Stack
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                System Layers &amp; Tooling.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink-secondary">
              Select a layer to inspect its architectural stack and production footprint.
            </p>
          </div>
        </Reveal>

        {/* 2-Pane Interactive Stack Spec */}
        <div className="grid gap-6 lg:grid-cols-[330px_1fr] lg:items-stretch">
          {/* Left Column: Layer Index */}
          <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="System architecture layers">
            {systemCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={cat.layer}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedIndex(idx)}
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
                key={active.layer}
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
                        <ActiveIcon size={18} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-amber">{active.layer}</span>
                          <h3 className="font-display text-xl font-bold text-ink">{active.title}</h3>
                        </div>
                        <p className="font-mono text-xs text-ink-muted">{active.highlight}</p>
                      </div>
                    </div>

                    {active.featured && (
                      <span className="inline-flex items-center rounded-full border border-amber/30 bg-amber/[0.08] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber">
                        Core Focus
                      </span>
                    )}
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base leading-relaxed text-ink-secondary">
                    {active.summary}
                  </p>

                  {/* Interactive Technology Chips */}
                  <div>
                    <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-ink-muted">
                      Core Technologies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {active.skills.map((skill) => (
                        <span key={skill} className="tag text-xs py-1.5 px-3">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spec Footer */}
                <div className="grid gap-3 border-t border-ink/[0.08] pt-5 sm:grid-cols-2 font-mono text-xs">
                  <div className="flex items-center gap-2 text-ink-secondary">
                    <CheckCircle2 size={14} className="text-emerald shrink-0" />
                    <span>{active.appliedIn}</span>
                  </div>
                  <div className="sm:text-right">
                    <span className="inline-flex items-center rounded-md border border-amber/20 bg-amber/[0.06] px-2.5 py-1 font-semibold text-amber">
                      {active.telemetry}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
