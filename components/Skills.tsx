'use client';

import { Sparkles, Code2, Cpu, Zap, Layers } from 'lucide-react';
import { skillGroups } from '@/lib/data';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

const iconsMap: Record<string, any> = {
  'Primary Stack': Code2,
  'AI & Intelligent Systems': Cpu,
  'Architecture & Quality': Layers,
  'Tools & Operations': Zap,
};

export default function Skills() {
  return (
    <section id="skills" className="section-space bg-surface/[0.18]">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12">
            <span className="section-label">Engineering Toolkit</span>
            <TextReveal
              text="Capabilities & Technical Architecture"
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-cream sm:text-4xl"
            />
          </div>
        </Reveal>

        {/* 2026 Asymmetric Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => {
            const Icon = iconsMap[group.label] || Sparkles;
            const isWide = group.featured || index === 0;

            return (
              <Reveal
                key={group.label}
                delay={index * 0.08}
                className={`group relative overflow-hidden rounded-2xl border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1 hover:border-amber/40 hover:shadow-[0_20px_50px_rgba(245,166,35,0.08)] ${
                  isWide ? 'md:col-span-2 lg:col-span-2 border-amber/30 bg-surface/80' : 'border-amber/10 bg-background/60'
                }`}
              >
                {/* Background ambient light mesh */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber/10 blur-3xl transition duration-500 group-hover:bg-amber/20" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-amber">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber/20 bg-amber/[0.08] text-amber">
                          <Icon size={18} />
                        </span>
                        {group.label}
                      </div>
                      {group.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber/30 bg-amber/[0.12] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber shadow-[0_0_12px_rgba(245,166,35,0.2)]">
                          <Sparkles size={11} /> Featured Focus
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tag hover:scale-105 hover:border-amber/60 hover:bg-amber/20 transition-all duration-200"
                          data-cursor="STACK"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-amber/10 flex items-center justify-between text-xs text-muted font-mono">
                    <span>{group.skills.length} core technologies</span>
                    <span className="text-amber/60">Production Tested</span>
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
