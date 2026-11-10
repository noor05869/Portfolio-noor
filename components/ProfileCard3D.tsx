'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { Verified } from 'lucide-react';

export default function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const springConfig = { stiffness: 280, damping: 22, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const scale = useSpring(isHovered ? 1.02 : 1, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    glareX.set(50);
    glareY.set(50);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center p-2 [perspective:1200px]"
      aria-label="Noor Ullah interactive 3D portrait card"
    >
      {/* Main 3D Card Shell: Studio Print / Ivory Matte Frame */}
      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
              }
        }
        className="group relative h-[360px] w-[275px] sm:h-[390px] sm:w-[295px] select-none overflow-hidden rounded-2xl border border-ink/10 bg-surface p-2 shadow-portrait transition-colors duration-200 hover:border-ink/20"
      >
        {/* Interior Picture Container */}
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-canvas-subtle ring-1 ring-ink/10">
          {/* Portrait Image */}
          <Image
            src="/noor-ullah.png"
            alt="Noor Ullah — Senior Frontend & Full-Stack Engineer"
            fill
            sizes="(max-width: 640px) 275px, 295px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Subtle Studio Specular Sheen on Hover */}
          {!reduceMotion && isHovered && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 220px at ${glareX.get()}% ${glareY.get()}%, rgba(255, 252, 245, 0.55), transparent 70%)`,
              }}
            />
          )}

          {/* Compact Floating Frosted Paper Caption */}
          <div
            style={reduceMotion ? undefined : { transform: 'translateZ(32px)' }}
            className="absolute inset-x-2.5 bottom-2.5 flex items-center justify-between rounded-xl border border-ink/10 bg-surface/90 px-3 py-2 backdrop-blur-md shadow-sm"
          >
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-sm font-bold text-ink">
                  Noor Ullah
                </span>
                <Verified size={13} className="text-amber" />
              </div>
              <p className="font-mono text-[10px] text-ink-secondary">Frontend &amp; AI Systems</p>
            </div>

            <span className="rounded-md border border-emerald/25 bg-emerald/[0.08] px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald">
              TechBazaar.pk
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
