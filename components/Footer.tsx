'use client';

import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-ink/[0.08] bg-canvas py-8 text-xs text-ink-muted">
      <div className="page-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-mono text-xs font-bold text-canvas transition-transform hover:scale-105"
            aria-label="Back to top"
          >
            NU
          </a>
          <p className="font-mono text-ink-secondary">
            © {new Date().getFullYear()} Noor Ullah. Built with Next.js, TypeScript &amp; Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={personalInfo.cv}
            download
            className="font-mono text-ink-secondary hover:text-amber transition-colors"
          >
            Resume / CV
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-1 font-mono text-ink-secondary hover:text-amber transition-colors"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
