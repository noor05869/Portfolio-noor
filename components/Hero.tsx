'use client';

import { useState } from 'react';
import { ArrowDown, Check, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import ArchitectureHub from './ArchitectureHub';
import TelemetryBar from './TelemetryBar';
import ProfileCard3D from './ProfileCard3D';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="top" className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      {/* Subtle radial ambient illumination */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-amber/5 blur-[120px]"
      />

      <div className="page-shell relative z-10 space-y-12 sm:space-y-16">
        {/* 1. Editorial Introduction + 3D Interactive Portrait Card */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-12 xl:gap-16">
          <div className="max-w-2xl">
            {/* Eyebrow Pill */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/[0.08] px-3.5 py-1 text-xs font-mono font-medium text-amber">
              <span>Senior Frontend Engineer</span>
              <span className="text-amber/40">/</span>
              <span>AI Systems</span>
              <span className="text-amber/40">·</span>
              <span className="text-sand/80">4+ Years Experience</span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]">
              Architecting high-scale web apps & production AI systems.
            </h1>

            {/* Subheading with verifiable impact */}
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-sand sm:text-lg">
              I build frontend systems that are fast, tested, and built to last. Scaled{' '}
              <strong className="font-semibold text-cream">TechBazaar.pk</strong> to 300K+ active users with a{' '}
              <strong className="font-semibold text-amber">92+ Lighthouse score</strong>, and engineered production RAG search pipelines with FastAPI, Gemini, and Qdrant.
            </p>

            {/* Action Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <a href="#work" className="amber-button">
                <span>View Selected Work</span>
                <ArrowDown size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="secondary-button"
                aria-label="Copy Noor Ullah's email to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={15} className="text-emerald-400" />
                    <span className="text-emerald-400 font-mono text-xs">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Mail size={15} />
                    <span>Copy Email</span>
                    <Copy size={13} className="text-muted" />
                  </>
                )}
              </button>

              {/* Social Links */}
              <div className="flex items-center gap-2 pl-1 sm:pl-2">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sand transition-colors hover:border-white/20 hover:text-cream"
                  aria-label="GitHub profile"
                >
                  <Github size={17} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sand transition-colors hover:border-white/20 hover:text-cream"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>

            {/* Location & Quick Context */}
            <div className="mt-7 flex items-center gap-2 text-xs font-mono text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
              <span>Based in {personalInfo.location} · Available for Remote Full-Time & Contract Roles</span>
            </div>
          </div>

          {/* 3D Interactive Portrait Card */}
          <div className="flex justify-center lg:justify-end">
            <ProfileCard3D />
          </div>
        </div>

        {/* 2. Key Telemetry Strip */}
        <TelemetryBar />

        {/* 3. Interactive System Architecture Workbench */}
        <div className="pt-2">
          <ArchitectureHub />
        </div>
      </div>
    </section>
  );
}
