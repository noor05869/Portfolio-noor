'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, MessageSquare, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-space relative border-t border-white/10 overflow-hidden">
      <div className="page-shell relative">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-label justify-center">Get in Touch</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-cream sm:text-4xl lg:text-5xl">
              Let&apos;s build something exceptional together.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-sand">
              Whether you are hiring for a Senior Frontend / Full-Stack role, looking to architect a production AI/RAG system, or exploring a technical advisory engagement, my inbox is always open.
            </p>

            {/* Email Card with 1-Click Copy */}
            <div className="mt-10 mx-auto max-w-lg rounded-2xl border border-white/10 bg-surface/90 p-6 sm:p-8 shadow-card">
              <span className="font-mono text-xs uppercase tracking-wider text-muted">Primary Email Address</span>
              <div className="mt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="font-display text-lg sm:text-xl font-bold text-amber hover:underline break-all"
                >
                  {personalInfo.email}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-xs text-sand transition-all hover:border-amber/40 hover:bg-amber/10 hover:text-amber active:scale-95"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-emerald" />
                      <span className="text-emerald">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 font-mono text-[11px] text-muted">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                <span>Usually responds within 24 hours · UTC+5 Timezone</span>
              </div>
            </div>

            {/* Direct Channel Pills */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sand transition-colors hover:border-amber/40 hover:bg-amber/10 hover:text-cream"
              >
                <Linkedin size={16} className="text-amber" />
                <span>LinkedIn</span>
                <ArrowUpRight size={14} className="text-muted" />
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sand transition-colors hover:border-amber/40 hover:bg-amber/10 hover:text-cream"
              >
                <Github size={16} className="text-amber" />
                <span>GitHub</span>
                <ArrowUpRight size={14} className="text-muted" />
              </a>

              <a
                href={`tel:${personalInfo.phoneHref}`}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2.5 text-sand transition-colors hover:border-amber/40 hover:bg-amber/10 hover:text-cream"
              >
                <Phone size={16} className="text-amber" />
                <span>{personalInfo.phone}</span>
                <ArrowUpRight size={14} className="text-muted" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
