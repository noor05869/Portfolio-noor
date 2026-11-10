'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { workExperience, type Experience, type Project } from '@/lib/data';
import ProjectGallery from './ProjectGallery';
import Reveal from './Reveal';

type WorkFilter = 'all' | 'live' | 'systems';

const filterOptions: { id: WorkFilter; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'live', label: 'Live Products' },
  { id: 'systems', label: 'AI & Systems' },
];

function ProjectDetails({ project }: { project: Project }) {
  return (
    <details className="project-details mt-6 border-t border-ink/[0.08] pt-2">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-xs font-mono uppercase tracking-wider text-ink-secondary transition-colors hover:text-ink">
        <span>Architectural &amp; Implementation Details</span>
        <ChevronDown size={15} className="details-chevron shrink-0 transition-transform duration-200" aria-hidden="true" />
      </summary>
      <div className="pt-3 pb-2 space-y-4">
        <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-ink-secondary">
          {project.bullets.map(bullet => (
            <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber">
              {bullet}
            </li>
          ))}
        </ul>

        {project.architecture && (
          <div className="mt-4 rounded-lg border border-ink/[0.08] bg-canvas p-3.5">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-ink-muted">Architecture Pipeline</p>
            <ol className="flex flex-wrap items-center gap-2" aria-label="Architecture components">
              {project.architecture.map((node, index) => (
                <li key={node} className="flex items-center gap-2">
                  <span className="rounded-md border border-amber/25 bg-amber/[0.08] px-2.5 py-1 font-mono text-xs font-medium text-amber">{node}</span>
                  {index < project.architecture!.length - 1 && <ArrowRight size={13} className="text-ink-muted" aria-hidden="true" />}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </details>
  );
}

function ProjectShowcase({ project, experience, index }: { project: Project; experience: Experience; index: number }) {
  return (
    <article
      id={`project-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
      className="scroll-mt-24 rounded-2xl border border-ink/[0.08] bg-surface p-5 sm:p-8 shadow-card"
    >
      {/* Top Meta Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.06] pb-4">
        <div className="flex items-center gap-3 font-mono text-xs text-ink-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-amber/25 bg-amber/[0.08] font-bold text-amber tabular-nums">
            0{index + 1}
          </span>
          <span className="text-ink font-medium">{experience.company === 'Featured Projects' ? 'Independent Production App' : experience.company}</span>
        </div>
        <span className="rounded-full border border-amber/25 bg-amber/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber font-semibold">
          {project.badge}
        </span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:gap-10">
        {/* Left: Interactive Interface Walkthrough */}
        <div className="min-w-0">
          <ProjectGallery images={project.images!} projectName={project.name} />
        </div>

        {/* Right: Technical Narrative & Metrics */}
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-secondary">
            {project.summary}
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-xs text-ink-muted">
            <span>{experience.role}</span>
            <span className="text-amber">/</span>
            <span>{experience.period}</span>
          </div>

          {/* Key Impact Stats */}
          {project.impact && (
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-ink/[0.08] py-4">
              {project.impact.map(metric => (
                <div key={metric.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-ink-muted">{metric.label}</dt>
                  <dd className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-ink tabular-nums">{metric.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {/* Technology Stack Pills */}
          <div className="mt-5 flex flex-wrap gap-1.5" aria-label="Technology stack">
            {project.stack.map(tech => (
              <span key={tech} className="tag text-[11px]">
                {tech}
              </span>
            ))}
          </div>

          {project.url && (
            <div className="mt-6">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="primary-button w-full sm:w-auto text-xs"
                aria-label={`Open ${project.name} live application in a new tab`}
              >
                <span>Launch Live Product</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </div>
          )}

          <ProjectDetails project={project} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<WorkFilter>('all');
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const resetFilter = () => setFilter('all');
    window.addEventListener('work-show-all', resetFilter);
    return () => window.removeEventListener('work-show-all', resetFilter);
  }, []);

  const projects = workExperience.flatMap(experience => experience.projects.map(project => ({ project, experience })));
  const allShowcases = projects
    .filter(({ project }) => project.featured && project.images?.length)
    .sort((a, b) => Number(Boolean(b.project.url)) - Number(Boolean(a.project.url)));

  const visibleShowcases = allShowcases.filter(({ project }) => {
    if (filter === 'live') return Boolean(project.url);
    if (filter === 'systems') return !project.url;
    return true;
  });

  const supporting = workExperience
    .map(experience => ({
      experience,
      projects: experience.projects.filter(project => !allShowcases.some(item => item.project === project)),
    }))
    .filter(group => group.projects.length);

  const showSupporting = filter === 'all' || filter === 'systems';

  return (
    <section id="work" className="section-space relative border-t border-ink/[0.08] bg-canvas-subtle">
      <div className="page-shell">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-amber tabular-nums">01</span>
                <span className="h-px w-8 bg-ink/15" />
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  Selected Work
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                High-scale products &amp; systems.
              </h2>
            </div>

            {/* Interactive Filter Pills */}
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex w-fit rounded-xl border border-ink/10 bg-surface p-1 shadow-sm"
            >
              {filterOptions.map((opt) => {
                const active = filter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(opt.id)}
                    className={`relative rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${
                      active ? 'text-canvas font-semibold' : 'text-ink-secondary hover:text-ink'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="work-filter-pill"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-lg bg-ink"
                      />
                    )}
                    <span className="relative z-10">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* Featured App Walkthroughs */}
        <div className="space-y-8">
          {visibleShowcases.map(({ project, experience }, index) => (
            <motion.div
              key={`${filter}-${project.name}`}
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, delay: index * 0.04, ease: 'easeOut' }}
            >
              <ProjectShowcase project={project} experience={experience} index={index} />
            </motion.div>
          ))}
        </div>

        {/* Supporting Systems & Experience */}
        {showSupporting && (
          <div className="mt-14 border-t border-ink/[0.08] pt-12">
            <Reveal>
              <div className="mb-8">
                <span className="section-label">Architectural Foundations</span>
                <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Production Systems &amp; Infrastructure
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-secondary">
                  Vector search pipelines, shared UI libraries, and backend integrations.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {supporting.map(({ experience, projects: items }) => (
                <Reveal key={experience.company}>
                  <div className="rounded-2xl border border-ink/[0.08] bg-surface p-6 sm:p-8 shadow-card">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/[0.08] pb-4 mb-6">
                      <div>
                        <h4 className="font-display text-lg font-bold text-ink">{experience.company}</h4>
                        <p className="font-mono text-xs text-ink-muted">{experience.role} · {experience.period}</p>
                      </div>
                      {experience.url && (
                        <a href={experience.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-amber hover:underline">
                          <span>Visit Site</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <div className="space-y-6">
                      {items.map(project => (
                        <article key={project.name} className="space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h5 className="font-display text-base font-semibold text-ink">{project.name}</h5>
                            {project.badge && (
                              <span className="rounded-full border border-amber/25 bg-amber/[0.08] px-2.5 py-0.5 font-mono text-[10px] text-amber font-semibold">
                                {project.badge}
                              </span>
                            )}
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                            {project.bullets.map(b => (
                              <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                                {b}
                              </li>
                            ))}
                          </ul>
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {project.stack.map(tech => (
                              <span key={tech} className="tag text-[10px]">{tech}</span>
                            ))}
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
