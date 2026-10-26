'use client';

import { Briefcase, CheckCircle2, Code2, Compass, Cpu, Sparkles } from 'lucide-react';
import Reveal from './Reveal';

const principles = [
  {
    title: 'Performance as an Architectural Constraint',
    description: 'A slow interface is a broken interface. I design client boundaries, data pre-fetching, and image pipelines to maintain sub-second LCP and 90+ Lighthouse scores under real-world network constraints.',
  },
  {
    title: 'Defensive Data & Authoritative Boundaries',
    description: 'Client state is ephemeral and untrusted. I enforce strict schema validations (Zod on web, Pydantic on Python) with server-authoritative pricing and checkout checks to guarantee financial and data integrity.',
  },
  {
    title: 'Full-Stack Craft from Interface to Vector DB',
    description: 'True frontend craftsmanship requires understanding the entire system behind the pixel—from micro-interaction springs and layout shifts down to Qdrant vector retrieval, Redis caching, and database schemas.',
  },
];

const timeline = [
  {
    role: 'Frontend & AI Systems Engineer',
    company: 'TechBazaar.pk',
    period: 'Sep 2022 – Present',
    badge: 'Current / Scaling',
    achievements: [
      'Architected frontend powering 300K+ monthly active shoppers and 40K+ live inventory listings with 92+ Lighthouse score.',
      'Shipped TechVault AI: zero-cost local embedding RAG pipeline using FastAPI, LangChain, Gemini, and Qdrant.',
      'Developed enterprise web POS system processing over 11,000+ sales and multi-branch inventory operations.',
    ],
  },
  {
    role: 'Creator & Lead Engineer',
    company: 'Pixels Galaxy & HEPTA Gatekeeper',
    period: '2023 – 2024',
    badge: 'Production Systems',
    achievements: [
      'Built Pixels Galaxy D2C storefront with dynamic colorway configurators and authoritative cash-on-delivery validation.',
      'Engineered cross-platform mobile & web attendance foundation for educational campuses using Expo Router and Next.js.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'U2Ventures Pvt Ltd',
    period: 'Jan 2022 – Sep 2022',
    badge: 'Foundations',
    achievements: [
      'Built core corporate web applications and established reusable React design systems.',
      'Engineered dashboard workflows and investor onboarding interfaces for Finqalab and E-Agrimarket.',
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="section-space relative border-t border-white/10">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <span className="section-label">Engineering Background</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl">
              Engineering mindset & track record.
            </h2>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-sand">
              Over 4 years of dedicated engineering experience building mission-critical user interfaces and full-stack systems that serve real users at scale.
            </p>
          </div>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-14">
          {/* Left: Engineering Principles */}
          <div className="space-y-6">
            <Reveal>
              <h3 className="font-display text-xl font-bold text-cream flex items-center gap-2">
                <Compass size={20} className="text-amber" />
                <span>How I Build Software</span>
              </h3>
            </Reveal>

            <div className="space-y-4">
              {principles.map((p, idx) => (
                <Reveal key={p.title} delay={idx * 0.08}>
                  <div className="rounded-xl border border-white/10 bg-surface/70 p-5 shadow-card transition-colors hover:border-amber/30">
                    <div className="flex items-center gap-2.5 font-display text-sm font-bold text-cream">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber/15 text-[11px] font-mono text-amber">
                        {idx + 1}
                      </span>
                      <h4>{p.title}</h4>
                    </div>
                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-sand/90">
                      {p.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: Career Trajectory Timeline */}
          <div className="space-y-6">
            <Reveal>
              <h3 className="font-display text-xl font-bold text-cream flex items-center gap-2">
                <Briefcase size={20} className="text-amber" />
                <span>Career Experience</span>
              </h3>
            </Reveal>

            <div className="relative border-l border-white/10 pl-6 ml-2 space-y-8">
              {timeline.map((item, idx) => (
                <Reveal key={item.company} delay={idx * 0.08}>
                  <div className="relative">
                    {/* Node Dot */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-amber/50 bg-canvas">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                    </span>

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base font-bold text-cream">
                        {item.role}
                      </h4>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] text-amber">
                        {item.badge}
                      </span>
                    </div>

                    <p className="mt-1 font-mono text-xs text-muted">
                      <span className="text-sand font-medium">{item.company}</span> · {item.period}
                    </p>

                    <ul className="mt-3 space-y-2 text-xs sm:text-sm leading-relaxed text-sand/90">
                      {item.achievements.map((ach) => (
                        <li key={ach} className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-amber">
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
    </section>
  );
}
