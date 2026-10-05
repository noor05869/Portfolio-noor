'use client';

import { Sparkles, Code2, Cpu, Zap, Layers } from 'lucide-react';
import { skillGroups } from '@/lib/data';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

const iconsMap: Record<string, any> = {
  'FRONTEND & MOBILE': Code2,
  'AI & BACKEND EXPERTISE': Cpu,
  'ARCHITECTURE & STATE': Layers,
  'TESTING & QUALITY': Zap,
  'PLATFORM & DEVOPS': Sparkles,
};

export default function Skills() {
  return (
    <section id="skills" className="section-space relative border-t border-white/10">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12">
            <span className="section-label">Engineering Toolkit</span>
            <TextReveal
              text="Capabilities & Technical Architecture"
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl"
            />
          </div>
        </Reveal>

        {/* High-Contrast Bento Grid Boxes */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = iconsMap[group.label] || Sparkles;
            const isWide = group.featured || index === 0;

            return (
              <Reveal
                key={group.label}
                delay={index * 0.08}
                className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-amber/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] ${
                  isWide
                    ? 'md:col-span-2 lg:col-span-2 border-white/15 bg-[#141824]'
                    : 'border-white/10 bg-[#10131a]'
                }`}
              >
                {/* Subtle ambient light mesh */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber/10 blur-3xl transition duration-300 group-hover:bg-amber/20" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 font-display text-xs font-bold uppercase tracking-[0.22em] text-amber">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber/30 bg-amber/15 text-amber shadow-sm">
                          <Icon size={18} />
                        </span>
                        {group.label}
                      </div>
                      {group.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/20 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-amber shadow-sm">
                          <Sparkles size={11} /> Featured Focus
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tag font-semibold text-slate-200 bg-white/5 border-white/10 hover:border-amber hover:bg-amber/20 hover:text-amber"
                          data-cursor="STACK"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate-400">
                    <span>{group.skills.length} core technologies</span>
                    <span className="text-amber font-semibold">Production Tested</span>
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

