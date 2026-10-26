'use client';

import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { workExperience, type Experience, type Project } from '@/lib/data';
import ProjectGallery from './ProjectGallery';
import Reveal from './Reveal';

function ProjectDetails({ project }: { project: Project }) {
  return (
    <details className="project-details mt-6 border-t border-white/10 pt-2">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 py-2 text-xs font-mono uppercase tracking-wider text-sand transition-colors hover:text-cream">
        <span>Architectural & Implementation Details</span>
        <ChevronDown size={15} className="details-chevron shrink-0 transition-transform duration-200" aria-hidden="true" />
      </summary>
      <div className="pt-3 pb-2 space-y-4">
        <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-sand/90">
          {project.bullets.map(bullet => (
            <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber">
              {bullet}
            </li>
          ))}
        </ul>

        {project.architecture && (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/30 p-3.5">
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-muted">Architecture Pipeline</p>
            <ol className="flex flex-wrap items-center gap-2" aria-label="Architecture components">
              {project.architecture.map((node, index) => (
                <li key={node} className="flex items-center gap-2">
                  <span className="rounded-md border border-amber/30 bg-amber/10 px-2.5 py-1 font-mono text-xs text-amber">{node}</span>
                  {index < project.architecture!.length - 1 && <ArrowRight size={13} className="text-muted" aria-hidden="true" />}
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
    <article id={`project-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="scroll-mt-24 border-t border-white/10 py-10 sm:py-14">
      {/* Top Meta Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 font-mono text-xs text-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-md border border-amber/30 bg-amber/10 font-bold text-amber">
            0{index + 1}
          </span>
          <span className="text-sand font-medium">{experience.company === 'Featured Projects' ? 'Independent Production App' : experience.company}</span>
        </div>
        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-amber font-semibold">
          {project.badge}
        </span>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-10">
        {/* Left: Interactive Interface Walkthrough */}
        <div className="min-w-0">
          <ProjectGallery images={project.images!} projectName={project.name} />
        </div>

        {/* Right: Technical Narrative & Metrics */}
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-bold leading-tight tracking-tight text-cream sm:text-3xl">
            {project.name}
          </h3>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-sand">
            {project.summary}
          </p>
          <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
            <span>{experience.role}</span>
            <span className="text-amber/60">/</span>
            <span>{experience.period}</span>
          </div>

          {/* Key Impact Stats */}
          {project.impact && (
            <dl className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-white/10 py-4">
              {project.impact.map(metric => (
                <div key={metric.label}>
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted">{metric.label}</dt>
                  <dd className="mt-1 font-display text-lg sm:text-xl font-bold tracking-tight text-cream">{metric.value}</dd>
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
                className="amber-button w-full sm:w-auto text-xs"
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
  const projects = workExperience.flatMap(experience => experience.projects.map(project => ({ project, experience })));
  const showcases = projects.filter(({ project }) => project.featured && project.images?.length)
    .sort((a, b) => Number(Boolean(b.project.url)) - Number(Boolean(a.project.url)));
  const supporting = workExperience.map(experience => ({
    experience,
    projects: experience.projects.filter(project => !showcases.some(item => item.project === project)),
  })).filter(group => group.projects.length);

  return (
    <section id="work" className="section-space relative border-t border-white/10">
      <div className="page-shell">
        <Reveal>
          <div className="mb-10 grid gap-4 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <span className="section-label">Selected Engineering Work</span>
              <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
                High-scale products & production systems.
              </h2>
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-sand">
              Direct interfaces, verified scale, and real production metrics. Explore the actual applications, architecture flows, and business impact.
            </p>
          </div>
        </Reveal>

        {/* Featured App Walkthroughs */}
        <div>
          {showcases.map(({ project, experience }, index) => (
            <Reveal key={project.name} delay={index * 0.05}>
              <ProjectShowcase project={project} experience={experience} index={index} />
            </Reveal>
          ))}
        </div>

        {/* Supporting Systems & Experience */}
        <div className="mt-8 border-t border-white/10 pt-12 sm:pt-16">
          <Reveal>
            <div className="mb-8">
              <span className="section-label">Architectural Foundations</span>
              <h3 className="font-display text-2xl font-bold tracking-tight text-cream sm:text-3xl">
                Production Systems & Infrastructure
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-sand">
                End-to-end vector search pipelines, shared UI system libraries, and full-stack backend integrations.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {supporting.map(({ experience, projects: items }) => (
              <Reveal key={experience.company}>
                <div className="rounded-xl border border-white/10 bg-surface/60 p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6">
                    <div>
                      <h4 className="font-display text-lg font-bold text-cream">{experience.company}</h4>
                      <p className="font-mono text-xs text-muted">{experience.role} · {experience.period}</p>
                    </div>
                    {experience.url && (
                      <a href={experience.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-xs text-amber hover:underline">
                        <span>Visit Site</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  <div className="space-y-6">
                    {items.map(project => (
                      <article key={project.name} className="space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h5 className="font-display text-base font-semibold text-cream">{project.name}</h5>
                          {project.badge && (
                            <span className="rounded-full border border-amber/30 bg-amber/10 px-2.5 py-0.5 font-mono text-[10px] text-amber font-semibold">
                              {project.badge}
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-sand">
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
      </div>
    </section>
  );
}
