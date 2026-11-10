'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  FileText,
  FolderGit2,
  Github,
  Layers,
  Linkedin,
  Mail,
  Search,
  Sparkles,
  User,
} from 'lucide-react';
import { personalInfo } from '@/lib/data';

type CommandItem = {
  id: string;
  label: string;
  hint: string;
  group: 'Sections' | 'Featured Work' | 'Actions';
  icon: typeof Layers;
  action: () => void;
};

export function openCommandMenu() {
  window.dispatchEvent(new CustomEvent('open-command-menu'));
}

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();

  const items: CommandItem[] = useMemo(
    () => [
      {
        id: 'sec-top',
        label: 'Overview & Architecture',
        hint: 'Hero',
        group: 'Sections',
        icon: Sparkles,
        action: () => {
          document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'sec-work',
        label: '01 · Selected Work',
        hint: '#work',
        group: 'Sections',
        icon: FolderGit2,
        action: () => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'sec-skills',
        label: '02 · Engineering Stack',
        hint: '#skills',
        group: 'Sections',
        icon: Layers,
        action: () => {
          document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'sec-about',
        label: '03 · Mindset & Experience',
        hint: '#about',
        group: 'Sections',
        icon: User,
        action: () => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'sec-contact',
        label: '04 · Contact & Availability',
        hint: '#contact',
        group: 'Sections',
        icon: Mail,
        action: () => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'proj-marketplace',
        label: 'TechBazaar.pk Marketplace',
        hint: '300K+ Users',
        group: 'Featured Work',
        icon: Code2,
        action: () => {
          document.getElementById('project-marketplace-platform')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'proj-pixels',
        label: 'Pixels Galaxy Storefront',
        hint: 'Next.js · Supabase',
        group: 'Featured Work',
        icon: Code2,
        action: () => {
          document.getElementById('project-pixels-galaxy')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'proj-pos',
        label: 'POS & Operations System',
        hint: '11K+ Sales',
        group: 'Featured Work',
        icon: Code2,
        action: () => {
          document.getElementById('project-point-of-sale-pos-operations-system')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'proj-hepta',
        label: 'Gatekeeper (HEPTA Presence)',
        hint: 'Web & Mobile',
        group: 'Featured Work',
        icon: Code2,
        action: () => {
          document.getElementById('project-gatekeeper-hepta-presence-')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'act-email',
        label: copied ? 'Email Copied to Clipboard' : 'Copy Email Address',
        hint: personalInfo.email,
        group: 'Actions',
        icon: copied ? Check : Copy,
        action: () => {
          navigator.clipboard.writeText(personalInfo.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        },
      },
      {
        id: 'act-cv',
        label: 'Download Resume / CV',
        hint: 'PDF',
        group: 'Actions',
        icon: FileText,
        action: () => {
          const link = document.createElement('a');
          link.href = personalInfo.cv;
          link.download = '';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        },
      },
      {
        id: 'act-github',
        label: 'Open GitHub Profile',
        hint: '@noor05869',
        group: 'Actions',
        icon: Github,
        action: () => {
          window.open(personalInfo.github, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'act-linkedin',
        label: 'Open LinkedIn Profile',
        hint: 'Connect',
        group: 'Actions',
        icon: Linkedin,
        action: () => {
          window.open(personalInfo.linkedin, '_blank', 'noopener,noreferrer');
        },
      },
    ],
    [copied]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.hint.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const handleOpenEvent = () => setOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-menu', handleOpenEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-menu', handleOpenEvent);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      document.body.style.overflow = 'hidden';
      const id = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => {
        window.clearTimeout(id);
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';
    return undefined;
  }, [open]);

  const executeItem = (item: CommandItem) => {
    if (item.group === 'Featured Work') {
      window.dispatchEvent(new CustomEvent('work-show-all'));
      setTimeout(() => item.action(), 40);
    } else {
      item.action();
    }
    if (item.id !== 'act-email') {
      setOpen(false);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filtered.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeItem(filtered[activeIndex] ?? filtered[0]);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
          role="dialog"
          aria-modal="true"
          aria-label="Quick command menu"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.14 }}
            className="fixed inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Palette Window */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.16, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-ink/15 bg-surface shadow-[0_24px_60px_-12px_rgba(24,24,22,0.28)]"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 border-b border-ink/[0.08] px-4 py-3.5">
              <Search size={16} className="shrink-0 text-ink-muted" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Jump to section, project, or action..."
                className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <kbd className="rounded border border-ink/10 bg-canvas-subtle px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="py-10 text-center font-mono text-xs text-ink-muted">
                  No matching sections or commands.
                </div>
              ) : (
                (['Sections', 'Featured Work', 'Actions'] as const).map((group) => {
                  const groupItems = filtered.filter((item) => item.group === group);
                  if (!groupItems.length) return null;
                  return (
                    <div key={group} className="mb-2 last:mb-0">
                      <p className="px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                        {group}
                      </p>
                      <div className="space-y-0.5">
                        {groupItems.map((item) => {
                          const globalIndex = filtered.indexOf(item);
                          const isActive = globalIndex === activeIndex;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onMouseEnter={() => setActiveIndex(globalIndex)}
                              onClick={() => executeItem(item)}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                                isActive
                                  ? 'bg-canvas-subtle text-ink'
                                  : 'text-ink-secondary hover:bg-canvas-subtle/60'
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon
                                  size={15}
                                  className={isActive ? 'text-amber' : 'text-ink-muted'}
                                />
                                <span className={isActive ? 'font-medium text-ink' : ''}>
                                  {item.label}
                                </span>
                              </span>
                              <span className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
                                <span>{item.hint}</span>
                                {isActive && <ArrowRight size={12} className="text-amber" />}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between border-t border-ink/[0.08] bg-canvas-subtle/60 px-4 py-2 font-mono text-[10px] text-ink-muted">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
              </div>
              <span>Noor Ullah · Quick Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
