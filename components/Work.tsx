'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { workExperience } from '@/lib/data';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

type Experience = (typeof workExperience)[number];
type Project = Experience['projects'][number];

function Architecture({ nodes }: { nodes: string[] }) {
  return (
    <div className="mt-5 rounded-lg border border-amber/15 bg-background/60 p-4" aria-label={`Architecture: ${nodes.join(' to ')}`}>
      <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-muted">System flow</p>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="contents">
            <span className="rounded border border-amber/25 bg-amber/[0.07] px-3 py-2 font-mono text-xs text-amber">{node}</span>
            {index < nodes.length - 1 && <ArrowRight size={14} className="text-amber-dim" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyCard({ experience }: { experience: Experience }) {
  const [openIndex, setOpenIndex] = useState<number | null>(experience.company === 'TechBazaar.pk' ? 1 : null);
  const reduceMotion = useReducedMotion();

  return (
    <article className="warm-card overflow-hidden p-5 sm:p-7 transition-all duration-300 hover:border-amber/30 hover:shadow-[0_20px_80px_rgba(245,166,35,0.06)]">
      <header className="flex flex-col gap-3 border-b border-amber/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-xl font-semibold text-amber">{experience.company}</h3>
            {'url' in experience && experience.url && (
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-amber/20 px-2.5 py-1 text-[10px] uppercase tracking-wider text-amber transition hover:bg-amber/10"
                data-cursor="VISIT"
              >
                techbazaar.pk <ExternalLink size={11} />
              </a>
            )}
          </div>
          <p className="mt-1 text-sm text-sand">{experience.role}</p>
        </div>
        <p className="shrink-0 text-xs text-muted">{experience.period}</p>
      </header>
      <div>
        {experience.projects.map((project: Project, index: number) => {
          const open = openIndex === index;
          return (
            <div key={project.name} className="border-b border-amber/[0.08] last:border-0">
              <button
                type="button"
                className="flex w-full items-center gap-3 py-5 text-left transition duration-200 hover:pl-1"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                data-cursor={open ? "CLOSE" : "EXPAND"}
              >
                <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="text-amber"><ChevronRight size={18} /></motion.span>
                <span className="flex-1 font-display text-base font-medium text-cream sm:text-lg">{project.name}</span>
                {'badge' in project && project.badge && <span className="rounded-full bg-amber/[0.12] px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.12em] text-amber">{project.badge}</span>}
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }} className="overflow-hidden">
                    <div className="pb-6 pl-8 sm:pl-9">
                      <ul className="space-y-3 text-sm leading-6 text-sand">{project.bullets.map((bullet) => <li key={bullet} className="relative pl-4 before:absolute before:left-0 before:top-[.65rem] before:h-1 before:w-1 before:rounded-full before:bg-amber">{bullet}</li>)}</ul>
                      {'architecture' in project && project.architecture && <Architecture nodes={[...project.architecture]} />}
                      <div className="mt-5 flex flex-wrap gap-2">{project.stack.map((technology) => <span key={technology} className="tag">{technology}</span>)}</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section-space">
      <div className="page-shell">
        <Reveal>
          <div className="mb-10">
            <span className="section-label">Work Experience</span>
            <TextReveal text="Selected Projects & Engineering Impact" as="h2" className="font-display text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl" />
          </div>
        </Reveal>
        <div className="space-y-6">{workExperience.map((experience, index) => <Reveal key={experience.company} delay={index * 0.06}><CompanyCard experience={experience} /></Reveal>)}</div>
      </div>
    </section>
  );
}

