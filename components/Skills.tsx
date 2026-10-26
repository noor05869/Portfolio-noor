'use client';

import { Bot, CheckCircle2, Cpu, Database, Layers, ShieldCheck, Terminal, Zap } from 'lucide-react';
import { skillGroups } from '@/lib/data';
import Reveal from './Reveal';

const systemCategories = [
  {
    title: 'Frontend Architecture & Web Platforms',
    icon: Layers,
    description: 'Component architecture, streaming SSR, performance budgets, and responsive design systems.',
    highlight: 'Next.js 14+ · React 18/19 · TypeScript · Tailwind CSS',
    skills: ['TypeScript', 'React.js', 'Next.js (App Router)', 'Tailwind CSS', 'Angular', 'React Native', 'Expo Router', 'HTML5 / Modern CSS'],
    telemetry: '92+ Lighthouse Target',
  },
  {
    title: 'AI, RAG & Vector Retrieval Systems',
    icon: Bot,
    featured: true,
    description: 'End-to-end semantic search, intent extraction, local vector embeddings, and LLM tool calling.',
    highlight: 'FastAPI · LangChain · Gemini API · Qdrant Vector DB',
    skills: ['FastAPI', 'LangChain (LCEL)', 'Google Gemini API', 'Qdrant Vector DB', 'OpenAI Assistants & Tools', 'HuggingFace Embeddings', 'RAG Pipelines', 'Pydantic v2'],
    telemetry: 'Zero-Cost Local Embeddings',
  },
  {
    title: 'State Architecture, Caching & Data Flow',
    icon: Cpu,
    description: 'Atomic state management, cache invalidation, defensive schema validation, and optimistic UI mutations.',
    highlight: 'TanStack Query v5 · Zustand · Zod · React Hook Form',
    skills: ['TanStack Query v5', 'Zustand', 'Redux Toolkit', 'Zod', 'React Hook Form', 'Radix UI Primitives', 'Axios'],
    telemetry: 'Optimistic UI Updates',
  },
  {
    title: 'Backend Services, APIs & Storage',
    icon: Database,
    description: 'Serverless functions, RESTful API design, relational data modeling, and vector indexes.',
    highlight: 'Node.js · NestJS · Supabase · Redis · PostgreSQL',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Supabase', 'Redis Caching', 'MySQL', 'REST APIs'],
    telemetry: 'Authoritative Server Checks',
  },
  {
    title: 'Automated Testing, Quality & Tooling',
    icon: ShieldCheck,
    description: 'Unit testing, component isolation, end-to-end integration, and continuous deployment workflows.',
    highlight: 'Vitest · Playwright · Jest · Docker · GitHub Actions',
    skills: ['Vitest', 'Jest', 'React Testing Library', 'Playwright', 'Docker Compose', 'GitHub Actions', 'Postman'],
    telemetry: 'Automated CI/CD',
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-space relative border-t border-white/10">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="section-label">Engineering Stack</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              Architectural toolkit & technical depth.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-sand">
              Technologies chosen for reliability, developer ergonomics, and high-scale production performance. Every tool in this stack is backed by delivered, production code.
            </p>
          </div>
        </Reveal>

        {/* Structured Engineering Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systemCategories.map((cat, index) => {
            const Icon = cat.icon;
            const isWide = cat.featured || index === 0;

            return (
              <Reveal
                key={cat.title}
                delay={index * 0.06}
                className={isWide ? 'md:col-span-2 lg:col-span-2' : ''}
              >
                <div
                  className={`group relative flex h-full flex-col justify-between rounded-xl border p-6 sm:p-7 shadow-card transition-all duration-200 hover:border-amber/40 hover:bg-surface-elevated/90 ${
                    cat.featured
                      ? 'border-amber/30 bg-surface/90'
                      : 'border-white/10 bg-surface/70'
                  }`}
                >
                  <div>
                    {/* Header with Icon and Telemetry badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber/30 bg-amber/10 text-amber shadow-sm">
                          <Icon size={18} />
                        </span>
                        <div>
                          <h3 className="font-display text-base font-bold text-cream">
                            {cat.title}
                          </h3>
                          <span className="font-mono text-[11px] text-amber font-medium">
                            {cat.highlight}
                          </span>
                        </div>
                      </div>

                      {cat.featured && (
                        <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/15 px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber">
                          Core Specialization
                        </span>
                      )}
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-sand">
                      {cat.description}
                    </p>

                    {/* Skill Tags */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="tag text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[11px] text-muted">
                    <span className="flex items-center gap-1.5 text-sand">
                      <CheckCircle2 size={13} className="text-emerald" />
                      Production Tested
                    </span>
                    <span className="text-amber font-semibold">{cat.telemetry}</span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
