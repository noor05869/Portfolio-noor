'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { navLinks, personalInfo } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.7, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-40 bg-background/85 backdrop-blur-xl transition-colors ${scrolled ? 'border-b border-amber/[0.12]' : 'border-b border-transparent'}`}
    >
      <nav className="page-shell flex h-16 items-center justify-between" aria-label="Primary navigation">
        <a href="#top" className="font-display text-lg font-bold tracking-tight text-amber" aria-label="Noor Ullah, back to top">NU</a>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-2 text-sm text-sand transition hover:text-amber">
              {link.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber transition-transform group-hover:scale-x-100" />
            </a>
          ))}
          <a href={personalInfo.cv} download className="amber-button !min-h-9 !px-4 !py-2">
            Download CV <Download size={15} aria-hidden="true" />
          </a>
        </div>
        <button type="button" className="grid h-11 w-11 place-items-center text-sand md:hidden" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label="Toggle navigation menu">
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>
      {menuOpen && (
        <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-amber/10 bg-background px-5 pb-5 md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="block border-b border-amber/[0.08] py-4 text-sm text-sand">{link.label}</a>
          ))}
          <a href={personalInfo.cv} download className="amber-button mt-5 w-full">Download CV <Download size={15} /></a>
        </motion.div>
      )}
    </motion.header>
  );
}
