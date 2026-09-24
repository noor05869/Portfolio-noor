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
    <div className="mt-5 rounded-xl border border-amber/30 bg-black/40 p-4" aria-label={`Architecture: ${nodes.join(' to ')}`}>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-amber font-semibold">System Architecture Flow</p>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="contents">
            <span className="rounded-md border border-amber/40 bg-amber/10 px-3 py-1.5 font-mono text-xs font-semibold text-amber shadow-sm">{node}</span>
            {index < nodes.length - 1 && <ArrowRight size={14} className="text-amber/70" aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanyCard({ experience }: { experience: Experience }) {
  // Default open all projects or first 2 for instant visibility
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <article className="warm-card overflow-hidden p-6 sm:p-8 border border-amber/20 bg-[#161410] shadow-2xl transition-all duration-300 hover:border-amber/40">
      <header className="flex flex-col gap-3 border-b border-amber/20 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight text-amber">{experience.company}</h3>
            {'url' in experience && experience.url && (
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 font-mono text-xs uppercase tracking-wider text-amber font-medium transition hover:bg-amber hover:text-black"
                data-cursor="VISIT"
              >
                Website <ExternalLink size={12} />
              </a>
            )}
          </div>
          <p className="mt-1 font-display text-base font-semibold text-white">{experience.role}</p>
        </div>
        <span className="shrink-0 rounded-full border border-amber/20 bg-black/40 px-3.5 py-1 font-mono text-xs font-medium text-amber">
          {experience.period}
        </span>
      </header>

      <div className="divide-y divide-amber/15">
        {experience.projects.map((project: Project, index: number) => {
          const open = openIndex === index;
          return (
            <div key={project.name} className="py-2">
              <button
                type="button"
                className="flex w-full items-center gap-4 py-4 text-left transition duration-200 hover:text-amber"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                data-cursor={open ? "CLOSE" : "EXPAND"}
              >
                <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: reduceMotion ? 0 : 0.2 }} className="text-amber">
                  <ChevronRight size={20} />
                </motion.span>
                <span className="flex-1 font-display text-lg font-bold text-white tracking-wide">{project.name}</span>
                {'badge' in project && project.badge && (
                  <span className="rounded-full border border-amber/30 bg-amber/15 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-amber shadow-sm">
                    {project.badge}
                  </span>
                )}
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.3, ease: 'easeOut' }} className="overflow-hidden">
                    <div className="pb-6 pl-8 sm:pl-9 pt-1">
                      <ul className="space-y-3 text-sm leading-7 text-[#e8dac7]">
                        {project.bullets.map((bullet) => (
                          <li key={bullet} className="relative pl-5 before:absolute before:left-0 before:top-[.75rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {'architecture' in project && project.architecture && <Architecture nodes={[...project.architecture]} />}
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {project.stack.map((technology) => (
                          <span key={technology} className="tag font-semibold">
                            {technology}
                          </span>
                        ))}
                      </div>
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
    <section id="work" className="section-space relative">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12">
            <span className="section-label">Work Experience & Projects</span>
            <TextReveal text="Selected Projects & Engineering Impact" as="h2" className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl" />
          </div>
        </Reveal>
        <div className="space-y-8">
          {workExperience.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.06}>
              <CompanyCard experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


