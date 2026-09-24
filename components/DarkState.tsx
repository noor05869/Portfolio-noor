'use client';

import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';

const PULL_THRESHOLD = 50;

export default function DarkState({ onComplete }: { onComplete: () => void }) {
  const startY = useRef(0);
  const moved = useRef(false);
  const [pull, setPull] = useState(0);
  const [turningOn, setTurningOn] = useState(false);
  const cordControls = useAnimationControls();
  const reduceMotion = useReducedMotion();

  const ignite = useCallback(() => {
    if (turningOn) return;
    setTurningOn(true);
    window.setTimeout(onComplete, reduceMotion ? 20 : 350);
  }, [onComplete, reduceMotion, turningOn]);

  const release = useCallback(() => {
    if (pull >= PULL_THRESHOLD || (reduceMotion && !moved.current)) {
      ignite();
    } else {
      cordControls.start({ scaleY: 1, transition: { type: 'spring', stiffness: 300, damping: 20 } });
      setPull(0);
    }
  }, [cordControls, ignite, pull, reduceMotion]);

  return (
    <motion.section
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0d0c0a] cursor-pointer"
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25 }}
      aria-label="Portfolio entrance"
      onClick={() => ignite()}
    >
      <div className={`absolute left-1/2 top-0 -translate-x-1/2 origin-top ${turningOn ? '' : 'motion-safe:animate-sway'}`}>
        <div className="relative flex flex-col items-center">
          <div className={`absolute top-10 h-48 w-48 rounded-full bg-[#FFF5C0] blur-3xl ${turningOn ? 'opacity-80 scale-125' : 'motion-safe:animate-pulse-glow'}`} />
          <motion.div className={turningOn ? 'animate-flicker' : ''}>
            <svg width="86" height="130" viewBox="0 0 76 116" fill="none" aria-hidden="true" className="relative z-10 mt-9 overflow-visible">
              <path d="M38 4C18 4 6 19 6 38c0 14 7 23 16 31 5 4 7 10 7 16h18c0-6 2-12 7-16 9-8 16-17 16-31C70 19 58 4 38 4Z" stroke="#f5a623" strokeWidth="2.5" />
              <path d="M27 86h22M29 93h18M32 100h12" stroke="#f5a623" strokeWidth="2" strokeLinecap="round" />
              <path d="m26 55 7-8 5 8 5-8 7 8M33 47l-2-17M43 47l2-17" stroke={turningOn ? '#FFF5C0' : '#f5a623'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
          <motion.button
            type="button"
            aria-label="Pull cord to enter site"
            className="relative z-20 flex min-h-36 w-16 touch-none cursor-grab flex-col items-center border-0 bg-transparent p-0 active:cursor-grabbing"
            animate={cordControls}
            style={{ transformOrigin: 'top center' }}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              startY.current = event.clientY;
              moved.current = false;
            }}
            onPointerMove={(event) => {
              if (!event.currentTarget.hasPointerCapture(event.pointerId) || turningOn) return;
              const nextPull = Math.max(0, Math.min(110, event.clientY - startY.current));
              moved.current = moved.current || nextPull > 8;
              setPull(nextPull);
              cordControls.set({ scaleY: 1 + nextPull / 180 });
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              if (event.pointerType === 'touch' && !moved.current) ignite();
              else release();
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); ignite(); }
            }}
          >
            <span className="h-[140px] w-0.5 bg-[#f5a623]" />
            <span className="h-6 w-6 rounded-full border-2 border-[#f5a623] bg-amber shadow-[0_0_15px_#f5a623]" />
          </motion.button>
        </div>
      </div>

      <div className="fixed bottom-[12%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); ignite(); }}
          className="rounded-full border border-amber/40 bg-amber/10 px-6 py-2.5 font-display text-xs uppercase tracking-[0.25em] text-amber transition hover:scale-105 hover:bg-amber hover:text-black shadow-[0_0_20px_rgba(245,166,35,0.2)]"
        >
          Click or Pull Cord to Turn On Lights 💡
        </button>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[#FFF5D8]"
        initial={{ opacity: 0 }}
        animate={turningOn && !reduceMotion ? { opacity: [0, 0, 0.7, 0] } : { opacity: 0 }}
        transition={{ duration: 0.6, times: [0, 0.25, 0.45, 1] }}
      />
    </motion.section>
  );
}

