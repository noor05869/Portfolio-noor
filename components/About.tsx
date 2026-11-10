'use client';

import { Briefcase, Compass } from 'lucide-react';
import Reveal from './Reveal';

const principles = [
  {
    code: 'P-01',
    title: 'Performance as a Constraint',
    description: 'A slow interface is broken. I architect streaming SSR, client boundaries, and asset pipelines to sustain sub-second LCP and 90+ Lighthouse scores.',
  },
  {
    code: 'P-02',
    title: 'Defensive Data Boundaries',
    description: 'Client state is untrusted. I enforce strict Zod and Pydantic schemas with server-authoritative pricing to guarantee financial integrity.',
  },
  {
    code: 'P-03',
    title: 'Full-Stack Technical Depth',
    description: 'True craft extends behind the pixel—from tactile micro-interactions down to vector retrieval, Redis caching, and database schemas.',
  },
];

const timeline = [
  {
    role: 'Frontend & AI Systems Engineer',
    company: 'TechBazaar.pk',
    period: '2022 – Present',
    badge: 'Current',
    achievements: [
      'Architected marketplace frontend serving 300K+ active users with 92+ Lighthouse score.',
      'Shipped TechVault AI: zero-cost local embedding RAG search using FastAPI, LangChain, and Qdrant.',
      'Built enterprise POS system handling 11,000+ sales and multi-branch inventory sync.',
    ],
  },
  {
    role: 'Creator & Lead Engineer',
    company: 'Pixels Galaxy & HEPTA Gatekeeper',
    period: '2023 – 2024',
    badge: 'Production Apps',
    achievements: [
      'Built Pixels Galaxy D2C storefront with dynamic product configurators and authoritative checkout.',
      'Engineered cross-platform campus attendance app with Expo Router and Next.js.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'U2Ventures Pvt Ltd',
    period: '2022',
    badge: 'Foundations',
    achievements: [
      'Built core web applications and established reusable React design systems.',
      'Delivered market dashboards and investor onboarding for Finqalab and E-Agrimarket.',
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="section-space relative border-t border-ink/[0.08] bg-canvas-subtle overflow-hidden">
      {/* Subtle architectural dot matrix differentiating Background from other sections */}
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0" />

      <div className="page-shell relative z-10">
        <Reveal>
          <div className="mb-12 max-w-xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="font-mono text-xs font-bold text-amber tabular-nums">03</span>
              <span className="h-px w-8 bg-ink/15" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink-muted">
                Mindset &amp; Experience
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Engineering principles &amp; track record.
            </h2>
          </div>
        </Reveal>

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: Engineering Principles */}
          <div className="space-y-4">
            <Reveal>
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-2 mb-4">
                <Compass size={17} className="text-amber" />
                <span>How I Build</span>
              </h3>
            </Reveal>

            <div className="space-y-3">
              {principles.map((p, idx) => (
                <Reveal key={p.code} delay={idx * 0.06}>
                  <div className="rounded-xl border border-ink/[0.08] bg-surface p-5 shadow-card transition-colors hover:border-amber/35">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-display text-sm font-bold text-ink">{p.title}</h4>
                      <span className="rounded bg-canvas-subtle px-2 py-0.5 font-mono text-[10px] font-bold text-amber tabular-nums">
                        {p.code}
                      </span>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-ink-secondary">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Career Trajectory Timeline */}
          <div className="space-y-4">
            <Reveal>
              <h3 className="font-display text-base font-bold text-ink flex items-center gap-2 mb-4">
                <Briefcase size={17} className="text-amber" />
                <span>Career Timeline</span>
              </h3>
            </Reveal>

            <div className="rounded-2xl border border-ink/[0.08] bg-surface p-6 shadow-card">
              <div className="relative border-l border-ink/[0.12] pl-5 ml-1.5 space-y-7">
                {timeline.map((item, idx) => (
                  <Reveal key={item.company} delay={idx * 0.06}>
                    <div className="relative">
                      <span className="absolute -left-[27px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-amber/60 bg-surface">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                      </span>

                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="font-display text-sm font-bold text-ink">
                          {item.role}
                        </h4>
                        <span className="rounded-full border border-amber/25 bg-amber/[0.06] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber">
                          {item.badge}
                        </span>
                      </div>

                      <p className="mt-0.5 font-mono text-[11px] text-ink-muted tabular-nums">
                        <span className="text-ink-secondary font-medium">{item.company}</span> · {item.period}
                      </p>

                      <ul className="mt-2.5 space-y-1.5 text-xs leading-relaxed text-ink-secondary">
                        {item.achievements.map((ach) => (
                          <li key={ach} className="relative pl-3.5 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
                            {ach}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
