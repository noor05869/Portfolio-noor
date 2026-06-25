'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { applyTheme, themes } from '@/lib/themes';
import type { Mood } from '@/lib/themes';

const moods: Mood[] = ['warm', 'natural', 'cool'];

export default function LightMoodSwitcher() {
  const [mood, setMood] = useState<Mood>('warm');
  const [intensity, setIntensity] = useState(78);
  const reduceMotion = useReducedMotion();
  const activeTheme = themes[mood];

  useEffect(() => applyTheme(mood, intensity), [mood, intensity]);

  const rangeStyle = { '--range-progress': `${((intensity - 30) / 70) * 100}%` } as CSSProperties;

  return (
    <motion.aside aria-label="Light mood controls" className="mood-glow w-full max-w-[380px] justify-self-center rounded-2xl border border-white/10 bg-surface/70 p-6 backdrop-blur-2xl sm:p-7 lg:justify-self-end" initial={reduceMotion ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : 0.6, duration: reduceMotion ? 0 : 0.4, ease: 'easeOut' }}>
      <div className="flex items-center gap-2 font-display text-xs font-medium uppercase tracking-[0.18em] text-amber"><Sparkles size={15} aria-hidden="true" /> Light Mood</div>
      <div role="radiogroup" aria-label="Color mood" className="mt-6 grid grid-cols-3">
        {moods.map((option, index) => {
          const selected = mood === option;
          return (
            <button key={option} type="button" role="radio" aria-checked={selected} onClick={() => setMood(option)} className={`min-h-11 border py-2 font-display text-sm font-medium capitalize transition duration-200 ${index === 0 ? 'rounded-l-lg' : ''} ${index === 2 ? 'rounded-r-lg' : ''} ${index > 0 ? '-ml-px' : ''} ${selected ? 'relative z-10 border-amber bg-amber/[0.12] text-amber' : 'border-white/[0.08] text-muted hover:bg-white/[0.04] hover:text-sand'}`}>
              {option}
            </button>
          );
        })}
      </div>
      <div className="mt-7">
        <div className="mb-3 flex items-center justify-between text-xs text-muted"><label htmlFor="light-intensity">Intensity</label><output htmlFor="light-intensity" className="font-mono text-amber">{intensity}%</output></div>
        <input id="light-intensity" type="range" min="30" max="100" step="1" value={intensity} onInput={(event) => setIntensity(Number(event.currentTarget.value))} style={rangeStyle} className="mood-range h-4 w-full cursor-pointer bg-transparent" />
      </div>
      <div className="mt-6 border-t border-white/[0.08] pt-5" aria-live="polite"><p className="font-display font-medium text-amber">{activeTheme.label}</p><p className="mt-1 text-[0.82rem] leading-5 text-muted">{activeTheme.description}</p></div>
    </motion.aside>
  );
}
