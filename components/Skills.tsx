'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Reveal from './Reveal';
import { TechLogo } from './icons/TechLogos';

type SkillCategory = 'all' | 'frontend' | 'ai' | 'backend' | 'state' | 'testing-devops';

interface SkillItem {
  name: string;
  label: string;
  category: 'frontend' | 'ai' | 'backend' | 'state' | 'testing-devops';
}

const ALL_SKILLS: SkillItem[] = [
  // Frontend & Mobile
  { name: 'React.js', label: 'React', category: 'frontend' },
  { name: 'Next.js', label: 'Next.js', category: 'frontend' },
  { name: 'TypeScript', label: 'TypeScript', category: 'frontend' },
  { name: 'Tailwind CSS', label: 'Tailwind', category: 'frontend' },
  { name: 'JavaScript (ES6+)', label: 'JavaScript', category: 'frontend' },
  { name: 'React Native', label: 'React Native', category: 'frontend' },
  { name: 'Expo & Expo Router', label: 'Expo', category: 'frontend' },
  { name: 'Angular', label: 'Angular', category: 'frontend' },
  { name: 'HTML5 / Modern CSS', label: 'HTML5 / CSS3', category: 'frontend' },

  // AI & Systems
  { name: 'Google Gemini API', label: 'Gemini AI', category: 'ai' },
  { name: 'FastAPI', label: 'FastAPI', category: 'ai' },
  { name: 'Qdrant Vector DB', label: 'Qdrant', category: 'ai' },
  { name: 'LangChain (LCEL)', label: 'LangChain', category: 'ai' },
  { name: 'OpenAI API & Tools', label: 'OpenAI', category: 'ai' },

  // Backend & Databases
  { name: 'Node.js', label: 'Node.js', category: 'backend' },
  { name: 'NestJS', label: 'NestJS', category: 'backend' },
  { name: 'PostgreSQL', label: 'PostgreSQL', category: 'backend' },
  { name: 'Supabase', label: 'Supabase', category: 'backend' },
  { name: 'Redis', label: 'Redis', category: 'backend' },
  { name: 'MySQL', label: 'MySQL', category: 'backend' },
  { name: 'Python', label: 'Python', category: 'backend' },

  // State Management & Architecture
  { name: 'TanStack Query v5', label: 'TanStack Query', category: 'state' },
  { name: 'Zustand', label: 'Zustand', category: 'state' },
  { name: 'Zod', label: 'Zod', category: 'state' },
  { name: 'Redux Toolkit', label: 'Redux', category: 'state' },
  { name: 'React Hook Form', label: 'Hook Form', category: 'state' },
  { name: 'Radix UI', label: 'Radix UI', category: 'state' },

  // Testing & DevOps
  { name: 'Vitest', label: 'Vitest', category: 'testing-devops' },
  { name: 'Jest', label: 'Jest', category: 'testing-devops' },
  { name: 'React Testing Library', label: 'Testing Library', category: 'testing-devops' },
  { name: 'Playwright', label: 'Playwright', category: 'testing-devops' },
  { name: 'Cypress', label: 'Cypress', category: 'testing-devops' },
  { name: 'Docker & Compose', label: 'Docker', category: 'testing-devops' },
  { name: 'Git', label: 'Git', category: 'testing-devops' },
  { name: 'GitHub Actions', label: 'GitHub Actions', category: 'testing-devops' },
  { name: 'Postman', label: 'Postman', category: 'testing-devops' },
  { name: 'Firebase', label: 'Firebase', category: 'testing-devops' },
];

const CATEGORIES: { id: SkillCategory; label: string }[] = [
  { id: 'all', label: 'All Stack' },
  { id: 'frontend', label: 'Frontend & Mobile' },
  { id: 'ai', label: 'AI & Systems' },
  { id: 'backend', label: 'Backend & DBs' },
  { id: 'state', label: 'State & Architecture' },
  { id: 'testing-devops', label: 'Testing & DevOps' },
];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');
  const reduceMotion = useReducedMotion();

  const filteredSkills = useMemo(() => {
    if (activeCategory === 'all') return ALL_SKILLS;
    return ALL_SKILLS.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="section-space relative border-t border-ink/[0.08] bg-canvas">
      <div className="page-shell">
        <Reveal>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-2.5 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber tabular-nums">02</span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Technical Stack
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Skills &amp; Technologies.
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter skills by domain"
              className="flex flex-wrap items-center gap-1 rounded-xl border border-ink/10 bg-surface p-1 shadow-xs"
            >
              {CATEGORIES.map((cat) => {
                const active = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                      active
                        ? 'bg-ink text-canvas font-semibold shadow-xs'
                        : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Compact Logo & Name Tiles Grid */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2 sm:gap-2.5"
        >
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.14, delay: Math.min(0.18, index * 0.012) }}
              className="group flex flex-col items-center justify-center rounded-xl border border-ink/[0.08] bg-surface p-2.5 sm:p-3 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-amber/40 hover:bg-canvas-subtle hover:shadow-card cursor-default text-center"
              title={skill.name}
            >
              {/* Compact Logo Frame */}
              <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center transition-transform duration-150 group-hover:scale-110 shrink-0">
                <TechLogo name={skill.name} size={28} className="h-full w-full object-contain shrink-0" />
              </div>

              {/* Skill Name Underneath */}
              <span className="mt-1.5 w-full truncate font-body text-[11px] sm:text-xs font-medium text-ink-secondary group-hover:text-ink transition-colors leading-tight">
                {skill.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
