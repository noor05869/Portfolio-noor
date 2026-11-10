'use client';

import { motion } from 'framer-motion';
import { Command, Download, FileText, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, personalInfo } from '@/lib/data';
import { openCommandMenu } from './CommandMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['work', 'skills', 'about', 'contact'];
      const offset = window.scrollY + 140;
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offset) {
          current = `#${id}`;
        }
      }
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'border-b border-ink/[0.08] bg-canvas/85 backdrop-blur-xl py-3 shadow-[0_1px_12px_rgba(24,24,22,0.04)]'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <nav className="page-shell flex items-center justify-between" aria-label="Primary navigation">
        {/* Left: Brand + Status */}
        <div className="flex items-center gap-4">
          <a
            href="#top"
            className="group flex items-center gap-2.5 font-display text-base font-bold tracking-tight text-ink"
            aria-label="Noor Ullah, back to top"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-mono text-xs font-bold text-canvas shadow-sm transition-transform duration-150 group-hover:scale-105">
              NU
            </span>
            <span className="hidden sm:inline font-display text-sm font-semibold text-ink">
              Noor Ullah
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/[0.07] px-3 py-1 text-xs font-medium text-emerald">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-bright" />
            </span>
            <span>Available for remote roles</span>
          </div>
        </div>

        {/* Center/Right Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-1 rounded-lg border border-ink/[0.06] bg-surface/70 p-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-md px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-canvas-subtle text-ink font-semibold'
                      : 'text-ink-secondary hover:text-ink'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <button
            type="button"
            onClick={openCommandMenu}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-ink/10 bg-surface px-2.5 font-mono text-[11px] text-ink-muted shadow-sm transition-colors hover:border-ink/25 hover:text-ink"
            aria-label="Open quick command menu"
          >
            <Command size={12} />
            <span>K</span>
          </button>

          <a
            href={personalInfo.cv}
            download
            className="primary-button !min-h-9 !px-4 !py-1.5 !text-xs"
          >
            <FileText size={13} aria-hidden="true" />
            <span>Resume / CV</span>
            <Download size={12} aria-hidden="true" />
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={openCommandMenu}
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/10 bg-surface text-ink-secondary transition-colors hover:text-ink"
            aria-label="Open quick command menu"
          >
            <Command size={16} />
          </button>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-ink/10 bg-surface text-ink-secondary transition-colors hover:text-ink"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          className="border-b border-ink/10 bg-canvas/95 backdrop-blur-2xl px-6 py-5 md:hidden space-y-4 shadow-lg"
        >
          <div className="flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/[0.07] px-3 py-1.5 text-xs font-medium text-emerald w-fit">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-bright opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-bright" />
            </span>
            <span>Available for remote roles</span>
          </div>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-ink-secondary hover:bg-canvas-subtle hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={personalInfo.cv}
              download
              className="primary-button w-full justify-center !min-h-10"
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
