'use client';

import { ArrowRight, ChevronDown, ExternalLink } from 'lucide-react';
import { workExperience, type Experience, type Project } from '@/lib/data';
import ProjectGallery from './ProjectGallery';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

function ProjectDetails({ project }: { project: Project }) {
  return (
    <details className="project-details mt-6 border-t border-white/10">
      <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-medium text-sand transition-colors hover:text-cream">
        Engineering details <ChevronDown size={16} className="details-chevron shrink-0 transition-transform" aria-hidden="true" />
      </summary>
      <div className="pb-4">
        <ul className="space-y-3 text-sm leading-7 text-sand">
          {project.bullets.map(bullet => <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-full before:bg-amber">{bullet}</li>)}
        </ul>
        {project.architecture && (
          <div className="mt-5 border-t border-white/10 pt-4">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">Architecture</p>
            <ol className="flex flex-wrap items-center gap-2" aria-label="Architecture components">
              {project.architecture.map((node, index) => (
                <li key={node} className="flex items-center gap-2">
                  <span className="rounded-md bg-amber/10 px-3 py-2 font-mono text-xs text-amber">{node}</span>
                  {index < project.architecture!.length - 1 && <ArrowRight size={14} className="text-muted" aria-hidden="true" />}
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-muted"><span className="mr-3 text-amber">0{index + 1}</span>{experience.company === 'Featured Projects' ? 'Independent project' : experience.company}</span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{project.badge}</span>
      </div>
      <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-10">
        <div className="min-w-0">
          <ProjectGallery images={project.images!} projectName={project.name} />
        </div>
        <div className="min-w-0 lg:pt-2">
          <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-cream sm:text-3xl">{project.name}</h3>
          <p className="mt-4 text-base leading-7 text-sand">{project.summary}</p>
          <p className="mt-4 text-xs leading-5 text-muted">{experience.role} <span className="mx-1.5 text-amber/60">/</span> {experience.period}</p>
          {project.impact && (
            <dl className="mt-6 flex flex-wrap gap-x-7 gap-y-4 border-y border-white/10 py-5">
              {project.impact.map(metric => <div key={metric.label}><dt className="text-xs text-muted">{metric.label}</dt><dd className="mt-1 font-display text-xl font-semibold tracking-tight text-cream">{metric.value}</dd></div>)}
            </dl>
          )}
          <div className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {project.stack.map(tech => <span key={tech} className="rounded-md border border-white/10 px-2.5 py-1.5 text-xs text-sand">{tech}</span>)}
          </div>
          {project.url ? (
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="amber-button mt-6 w-full sm:w-auto" aria-label={`Open ${project.name} live app in a new tab`} data-cursor="OPEN">
              Open live app <ExternalLink size={15} aria-hidden="true" />
            </a>
          ) : (
            <p className="mt-6 text-xs leading-5 text-muted">Explore the app screens in the walkthrough.</p>
          )}
          <ProjectDetails project={project} />
        </div>
      </div>
    </article>
  );
}

export default function Work() {
  const projects = workExperience.flatMap(experience => experience.projects.map(project => ({ project, experience })));
  // Public products lead; screenshots make the remaining app experiences inspectable.
  const showcases = projects.filter(({ project }) => project.featured && project.images?.length)
    .sort((a, b) => Number(Boolean(b.project.url)) - Number(Boolean(a.project.url)));
  const supporting = workExperience.map(experience => ({
    experience,
    projects: experience.projects.filter(project => !showcases.some(item => item.project === project)),
  })).filter(group => group.projects.length);

  return (
    <section id="work" className="section-space relative">
      <div className="page-shell">
        <Reveal>
          <div className="mb-8 grid gap-5 sm:mb-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
            <div>
              <span className="section-label">Selected work</span>
              <TextReveal text="A closer look at the work." as="h2" className="font-display text-4xl font-medium leading-tight tracking-tight text-cream sm:text-5xl" />
            </div>
            <p className="max-w-lg text-base leading-7 text-sand lg:pb-1">Commerce, operations, and everyday tools. Explore the real interfaces, the work behind them, and the impact they make.</p>
          </div>
        </Reveal>
        <div>
          {showcases.map(({ project, experience }, index) => (
            <Reveal key={project.name}>
              <ProjectShowcase project={project} experience={experience} index={index} />
            </Reveal>
          ))}
        </div>
        <div className="mt-6 border-t border-white/10 pt-10 sm:pt-14">
          <Reveal>
            <div className="mb-8">
              <span className="section-label">Behind the interfaces</span>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-cream sm:text-3xl">More engineering work</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-sand">AI systems, reusable UI foundations, and the experience that supports my frontend work.</p>
            </div>
          </Reveal>
          <div className="space-y-8">
            {supporting.map(({ experience, projects: items }) => (
              <Reveal key={experience.company}>
                <div className="grid gap-5 border-t border-white/10 py-6 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10">
                  <div>
                    <h4 className="font-display text-base font-semibold text-cream">{experience.company}</h4>
                    <p className="mt-1 text-xs leading-5 text-muted">{experience.role}<br />{experience.period}</p>
                    {experience.url && <a href={experience.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs text-amber">Company website <ExternalLink size={13} aria-hidden="true" /></a>}
                  </div>
                  <div className="min-w-0 space-y-6">
                    {items.map(project => (
                      <article key={project.name}>
                        <h5 className="font-display text-lg font-medium leading-7 text-cream">{project.name}</h5>
                        <p className="mt-2 text-sm leading-6 text-sand">{project.bullets[0]}</p>
                        <div className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs text-muted">{project.stack.map(tech => <span key={tech}>{tech}</span>)}</div>
                        <ProjectDetails project={project} />
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
