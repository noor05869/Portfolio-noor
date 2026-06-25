'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function StreetLamp({ side }: { side: 'left' | 'right' }) {
  const reduceMotion = useReducedMotion();
  const gradientId = `beam-gradient-${side}`;
  const bloomId = `bulb-bloom-${side}`;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute top-0 z-[1] hidden h-full w-[42vw] max-w-[620px] md:block ${side === 'left' ? 'left-0' : 'right-0 scale-x-[-1]'}`}>
      <svg viewBox="0 0 420 600" preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--bulb-color)" stopOpacity="0.25" />
            <stop offset="70%" stopColor="var(--bulb-color)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--bulb-color)" stopOpacity="0" />
          </linearGradient>
          <radialGradient id={bloomId}>
            <stop offset="0%" stopColor="var(--bulb-color)" stopOpacity="0.72" />
            <stop offset="100%" stopColor="var(--bulb-color)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <motion.g initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.1, duration: reduceMotion ? 0 : 0.3 }}>
          <rect x="76" y="184" width="7" height="416" rx="3" fill="#3A342B" />
          <path d="M79 190 C79 138 62 126 27 126" stroke="#3A342B" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M12 119 H48 L43 143 H17 Z" fill="#2A2420" stroke="#4B4338" strokeWidth="2" />
          <rect x="63" y="575" width="34" height="7" rx="3" fill="#3A342B" />
          <rect x="55" y="582" width="50" height="10" rx="3" fill="#2A2420" />
        </motion.g>
        <motion.polygon points="30,143 6,600 420,600" fill={`url(#${gradientId})`} style={{ opacity: 'var(--intensity)', mixBlendMode: 'screen', transformOrigin: '30px 143px' }} initial={reduceMotion ? false : { scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.45, duration: reduceMotion ? 0 : 0.5, ease: 'easeOut' }} />
        <motion.g initial={reduceMotion ? false : { scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: reduceMotion ? 0 : 0.3, duration: reduceMotion ? 0 : 0.25, ease: 'easeOut' }} style={{ transformOrigin: '30px 135px' }}>
          <circle cx="30" cy="135" r="34" fill={`url(#${bloomId})`} style={{ animation: `lampFlicker 7s ease-in-out infinite ${side === 'right' ? '1.8s' : '0s'}` }} />
          <circle cx="30" cy="135" r="7" fill="var(--bulb-color)" style={{ animation: `lampFlicker 7s ease-in-out infinite ${side === 'right' ? '1.8s' : '0s'}` }} />
        </motion.g>
      </svg>
    </div>
  );
}
