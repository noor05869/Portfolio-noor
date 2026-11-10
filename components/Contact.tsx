'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Clock, Copy, Github, Linkedin, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Reveal from './Reveal';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [pktTime, setPktTime] = useState<string>('--:--');

  useEffect(() => {
    const updateClock = () => {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Karachi',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setPktTime(formatter.format(new Date()));
    };
    updateClock();
    const timer = setInterval(updateClock, 30000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="section-space relative border-t border-ink/[0.08] bg-canvas">
      <div className="page-shell">
        <Reveal>
          {/* High-Contrast Carbon Ink Closing Monolith */}
          <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-canvas shadow-[0_24px_60px_-15px_rgba(24,24,22,0.28)] sm:px-12 sm:py-16">
            {/* Top Status & Chapter Bar */}
            <div className="mb-10 flex flex-wrap items-center justify-between gap-4 border-b border-canvas/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#fbbf24] tabular-nums">04</span>
                <span className="h-px w-8 bg-canvas/20" />
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-canvas/70">
                  Initiate Conversation
                </span>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-canvas/15 bg-canvas/[0.06] px-3 py-1 font-mono text-xs text-canvas/85 tabular-nums">
                <Clock size={12} className="text-[#34d399]" />
                <span>Pakistan · {pktTime} (UTC+5)</span>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-canvas sm:text-4xl lg:text-5xl">
                  Let&apos;s build something exceptional.
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-canvas/75">
                  Open to Senior Frontend / Full-Stack engineering roles, production AI architecture, and technical advisory.
                </p>

                {/* Direct Channel Pills */}
                <div className="mt-8 flex flex-wrap items-center gap-3 text-sm">
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-canvas/15 bg-canvas/[0.06] px-4 py-2.5 text-canvas/90 transition-colors hover:border-[#fbbf24]/50 hover:bg-canvas/[0.12] hover:text-canvas"
                  >
                    <Linkedin size={16} className="text-[#fbbf24]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight size={14} className="text-canvas/50" />
                  </a>

                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-canvas/15 bg-canvas/[0.06] px-4 py-2.5 text-canvas/90 transition-colors hover:border-[#fbbf24]/50 hover:bg-canvas/[0.12] hover:text-canvas"
                  >
                    <Github size={16} className="text-[#fbbf24]" />
                    <span>GitHub</span>
                    <ArrowUpRight size={14} className="text-canvas/50" />
                  </a>

                  <a
                    href={`tel:${personalInfo.phoneHref}`}
                    className="inline-flex items-center gap-2 rounded-lg border border-canvas/15 bg-canvas/[0.06] px-4 py-2.5 text-canvas/90 transition-colors hover:border-[#fbbf24]/50 hover:bg-canvas/[0.12] hover:text-canvas"
                  >
                    <Phone size={16} className="text-[#fbbf24]" />
                    <span>{personalInfo.phone}</span>
                    <ArrowUpRight size={14} className="text-canvas/50" />
                  </a>
                </div>
              </div>

              {/* Email Copy Box */}
              <div className="rounded-2xl border border-canvas/15 bg-canvas/[0.06] p-6 sm:p-7">
                <span className="font-mono text-[11px] uppercase tracking-wider text-canvas/60">
                  Direct Email
                </span>
                <div className="mt-3 flex flex-col gap-4">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="font-display text-lg sm:text-xl font-bold text-[#fbbf24] hover:underline break-all"
                  >
                    {personalInfo.email}
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex w-fit items-center gap-2 rounded-lg border border-canvas/20 bg-canvas px-4 py-2 font-mono text-xs font-semibold text-ink transition-all hover:bg-canvas/90 active:scale-[0.98]"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="text-emerald" />
                        <span className="text-emerald">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        <span>Copy Email Address</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-2 border-t border-canvas/10 pt-4 font-mono text-[11px] text-canvas/65">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#34d399]" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
