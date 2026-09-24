'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import LightMoodSwitcher from './LightMoodSwitcher';
import StreetLamp from './StreetLamp';
import Magnetic from './Magnetic';
import TextReveal from './TextReveal';
import HeroBulb3D from './HeroBulb3D';

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const container: Variants = {
    hidden: {},
    visible: { transition: { delayChildren: reduceMotion ? 0 : 0.4, staggerChildren: reduceMotion ? 0 : 0.1 } },
  };
  const item: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.55, ease: 'easeOut' } },
  };

  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28">
      <StreetLamp side="left" />
      <StreetLamp side="right" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgb(var(--accent-rgb)/calc(var(--intensity)*.07)),transparent_58%)] transition duration-500" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-3vw] top-1/2 -translate-y-1/2 font-mono text-[28vw] font-bold leading-none text-amber/[0.025]">&lt;/&gt;</div>

      <motion.div className="page-shell relative z-10 grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr]" variants={container} initial="hidden" animate="visible">
        <div>
          <motion.p variants={item} className="mb-5 font-body text-xs uppercase tracking-[0.3em] text-amber">Hello, I&apos;m {personalInfo.name}</motion.p>
          
          <div className="overflow-hidden">
            <h1 className="font-display text-[clamp(3rem,10vw,6rem)] font-bold uppercase leading-[0.86] tracking-[-0.065em] text-cream">
              <TextReveal text="Frontend" as="span" />
              <br />
              <TextReveal text="Engineer" as="span" className="text-sand" delay={0.2} />
              <span className="text-amber">.</span>
            </h1>
          </div>

          <motion.div variants={item} className="mt-8 max-w-lg text-base leading-7 text-sand sm:text-lg">
            <p className="font-display text-xl font-medium text-cream">{personalInfo.name}</p>
            <p className="mt-2">Based in {personalInfo.location} <span className="text-amber">·</span> {personalInfo.tagline}</p>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-6">
            <Magnetic strength={0.25}>
              <a href="#work" className="amber-button" data-cursor="EXPLORE">
                View Work <ArrowDown size={16} aria-hidden="true" />
              </a>
            </Magnetic>
            <Magnetic strength={0.35}>
              <a href="#contact" className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-amber" data-cursor="SAY HI">
                Say Hello <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div variants={item} className="flex flex-col items-center gap-6">
          <HeroBulb3D />
          <LightMoodSwitcher />
        </motion.div>
      </motion.div>
    </section>
  );
}


