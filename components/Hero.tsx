'use client';

import { useState } from 'react';
import { ArrowDown, Check, Command, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import ArchitectureHub from './ArchitectureHub';
import TelemetryBar from './TelemetryBar';
import ProfileCard3D from './ProfileCard3D';
import { openCommandMenu } from './CommandMenu';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="top" className="relative bg-canvas pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle architectural drafting grid fading softly into alabaster */}
      <div aria-hidden="true" className="drafting-grid pointer-events-none absolute inset-0" />

      <div className="page-shell relative z-10 space-y-12 sm:space-y-16">
        {/* 1. Introduction + 3D Portrait Card */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-14 xl:gap-20">
          <div className="max-w-xl">
            {/* Chapter & Role Eyebrow */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber/25 bg-surface px-3 py-1 font-mono text-xs font-medium text-amber shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-bright" />
                <span>Senior Frontend &amp; AI Systems</span>
              </div>
              <button
                type="button"
                onClick={openCommandMenu}
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-muted transition-colors hover:border-ink/25 hover:text-ink"
              >
                <Command size={11} />
                <span>K to jump</span>
              </button>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display text-4xl font-bold tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Architecting high-scale web &amp; production AI.
            </h1>

            {/* Subheading - Concise & direct */}
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-secondary">
              Specialized in React, Next.js, and vector search. Scaled{' '}
              <strong className="font-semibold text-ink">TechBazaar.pk</strong> to 300K+ active users with a{' '}
              <strong className="font-semibold text-amber">92+ Lighthouse score</strong>.
            </p>

            {/* Action Row */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#work" className="primary-button">
                <span>View Work</span>
                <ArrowDown size={14} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="secondary-button"
                aria-label="Copy Noor Ullah's email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={14} className="text-emerald" />
                    <span className="text-emerald font-mono text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Mail size={14} className="text-ink-secondary" />
                    <span>Copy Email</span>
                    <Copy size={12} className="text-ink-muted" />
                  </>
                )}
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-2 pl-1">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-surface text-ink-secondary shadow-sm transition-colors hover:border-ink/25 hover:bg-canvas-subtle hover:text-ink"
                  aria-label="GitHub profile"
                >
                  <Github size={16} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-surface text-ink-secondary shadow-sm transition-colors hover:border-ink/25 hover:bg-canvas-subtle hover:text-ink"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* 3D Interactive Portrait Card */}
          <div className="flex justify-center lg:justify-end">
            <ProfileCard3D />
          </div>
        </div>

        {/* 2. Key Telemetry Strip */}
        <TelemetryBar />

        {/* 3. System Architecture Workbench */}
        <div className="pt-2">
          <ArchitectureHub />
        </div>
      </div>
    </section>
  );
}
