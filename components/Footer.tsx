'use client';

import { ArrowUp } from 'lucide-react';
import { personalInfo } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-canvas py-8 text-xs text-muted">
      <div className="page-shell flex flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex h-7 w-7 items-center justify-center rounded-md border border-amber/30 bg-amber/10 font-mono text-xs font-bold text-amber hover:border-amber"
            aria-label="Back to top"
          >
            NU
          </a>
          <p className="font-mono text-sand">
            © {new Date().getFullYear()} Noor Ullah. Engineered with Next.js, TypeScript & Tailwind CSS.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={personalInfo.cv}
            download
            className="font-mono text-sand hover:text-amber transition-colors"
          >
            Resume / CV
          </a>
          <a
            href="#top"
            className="inline-flex items-center gap-1 font-mono text-sand hover:text-amber transition-colors"
          >
            <span>Top</span>
            <ArrowUp size={12} />
          </a>
        </div>
      </div>
    </footer>
  );
}
