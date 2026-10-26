'use client';

import { motion } from 'framer-motion';
import { Download, FileText, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, personalInfo } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-white/10 bg-canvas/85 backdrop-blur-xl py-3 shadow-lg'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <nav className="page-shell flex items-center justify-between" aria-label="Primary navigation">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-cream"
            aria-label="Noor Ullah, back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber/40 bg-amber/10 font-mono text-xs font-bold text-amber shadow-sm transition-all group-hover:scale-105 group-hover:border-amber group-hover:bg-amber/20">
              NU
            </span>
            <span className="hidden sm:inline font-display text-sm font-semibold text-cream">
              Noor Ullah
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Available for remote engineering roles</span>
          </div>
        </div>

        {/* Center/Right Desktop Navigation */}
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-sand transition-colors duration-150 hover:text-cream"
            >
              {link.label}
            </a>
          ))}

          <a
            href={personalInfo.cv}
            download
            className="amber-button !min-h-9 !px-4 !py-1.5 !text-xs"
          >
            <FileText size={14} aria-hidden="true" />
            <span>Resume / CV</span>
            <Download size={13} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-sand md:hidden transition-colors hover:text-cream"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="border-b border-white/10 bg-canvas/95 backdrop-blur-2xl px-6 py-5 md:hidden space-y-4"
        >
          <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span>Available for remote roles</span>
          </div>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-sand hover:bg-white/[0.04] hover:text-cream"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={personalInfo.cv}
              download
              className="amber-button w-full justify-center !min-h-10"
            >
              <FileText size={15} />
              Download Resume / CV
              <Download size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}
