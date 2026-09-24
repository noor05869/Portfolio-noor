'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';
import Reveal from './Reveal';
import TextReveal from './TextReveal';
import InteractiveTerminal from './InteractiveTerminal';

function Stat({ value, suffix, label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setDisplay(value); return; }
    const duration = 1100;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -3 }}
      className="warm-card p-5 border border-amber/25 bg-[#161410] shadow-lg transition-colors hover:border-amber"
    >
      <div className="font-display text-4xl font-bold text-amber">{display}{suffix}</div>
      <p className="mt-2 text-xs font-mono font-medium leading-5 text-[#c8b9a6] uppercase tracking-wider">{label}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-space relative border-t border-amber/15">
      <div className="page-shell">
        <Reveal>
          <div className="mb-10">
            <span className="section-label">About</span>
            <TextReveal text="Engineering Mindset & Background" as="h2" className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl" />
          </div>
        </Reveal>
        
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-6">
            <p className="font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
              I build frontend systems that are fast, tested, and built to last.
            </p>
            <p className="text-base leading-8 text-[#e0d3c1]">
              Senior Frontend Engineer with backend & AI experience. Currently at <strong className="text-amber">TechBazaar.pk</strong>, where I shipped a production RAG-based conversational search system, an AI shopping assistant, and a marketplace serving 300K+ users.
            </p>
            <p className="text-base leading-8 text-[#e0d3c1]">
              Expanded into AI agents, LLM tool calling, and MCP servers—bringing careful interface work all the way through to the system behind it.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4">
              {stats.map((stat) => <Stat key={stat.label} {...stat} />)}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <InteractiveTerminal />
          </Reveal>
        </div>
      </div>
    </section>
  );
}


