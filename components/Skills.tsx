'use client';

import { Sparkles } from 'lucide-react';
import { skillGroups } from '@/lib/data';
import Reveal from './Reveal';

export default function Skills() {
  return (
    <section id="skills" className="section-space bg-surface/[0.18]">
      <div className="page-shell">
        <Reveal><h2 className="section-label">Skills</h2></Reveal>
        <div className="space-y-5">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05} className={`rounded-xl border bg-background/50 p-5 sm:p-7 ${group.featured ? 'border-amber/25 shadow-amber' : 'border-amber/[0.1]'}`}>
              <div className="mb-5 flex items-center gap-2 font-body text-[11px] font-medium uppercase tracking-[0.22em] text-amber">{group.featured && <Sparkles size={14} aria-hidden="true" />}{group.label}</div>
              <div className="flex flex-wrap gap-2.5">{group.skills.map((skill) => <span key={skill} className={`tag ${group.featured ? 'hover:shadow-[0_0_20px_rgb(var(--accent-rgb)/calc(var(--intensity)*.15))]' : ''}`}>{skill}</span>)}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
