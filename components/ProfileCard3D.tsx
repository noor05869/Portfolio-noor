'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { MapPin, Sparkles, Verified } from 'lucide-react';

export default function ProfileCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse coordinates normalized from -0.5 to 0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Glare position coordinates in percentage (0 to 100)
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  // Smooth springs for rotation and translation
  const springConfig = { stiffness: 280, damping: 22, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms (max tilt +/- 14 degrees)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  // Subtle floating scale effect
  const scale = useSpring(isHovered ? 1.03 : 1, springConfig);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

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
      className="relative flex items-center justify-center p-4 [perspective:1200px]"
      aria-label="Noor Ullah interactive 3D portrait card"
    >
      {/* Ambient background glow that follows tilt */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 rounded-3xl bg-gradient-to-tr from-amber/20 via-emerald-500/10 to-transparent blur-2xl opacity-60 transition-opacity duration-300"
        style={reduceMotion ? undefined : { scale }}
      />

      {/* Main 3D Card Shell */}
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
        className="group relative h-[380px] w-[290px] sm:h-[410px] sm:w-[315px] select-none overflow-hidden rounded-2xl border border-white/15 bg-[#0e121a] p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] transition-colors duration-200 hover:border-amber/40"
      >
        {/* Interior Picture Container */}
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-black">
          {/* Portrait Image */}
          <Image
            src="/noor-ullah.png"
            alt="Noor Ullah — Senior Frontend & Full-Stack Engineer"
            fill
            sizes="(max-width: 640px) 290px, 315px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            priority
          />

          {/* Gradients for text contrast */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20"
          />

          {/* Specular Glare Overlay (moves with cursor) */}
          {!reduceMotion && isHovered && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 mix-blend-overlay transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 220px at ${glareX.get()}% ${glareY.get()}%, rgba(255, 255, 255, 0.35), transparent 70%)`,
              }}
            />
          )}

          {/* Top Floating Badge Bar (Depth Layer 1) */}
          <div
            style={reduceMotion ? undefined : { transform: 'translateZ(30px)' }}
            className="absolute inset-x-3 top-3 flex items-center justify-between"
          >
            {/* Live Availability Pill */}
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-black/60 px-2.5 py-1 text-[11px] font-medium text-emerald-400 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>Open for roles</span>
            </div>

            {/* Experience Tag */}
            <span className="rounded-md border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-amber backdrop-blur-md">
              4+ YOE
            </span>
          </div>

          {/* Bottom Floating Bio & Details (Depth Layer 2) */}
          <div
            style={reduceMotion ? undefined : { transform: 'translateZ(38px)' }}
            className="absolute inset-x-3 bottom-3 space-y-1.5 rounded-xl border border-white/10 bg-black/75 p-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-bold text-cream">
                  Noor Ullah
                </span>
                <Verified size={15} className="text-amber" />
              </div>
              <span className="font-mono text-[10px] text-muted">UTC+5</span>
            </div>

            <p className="font-mono text-[11px] text-amber font-medium">
              Senior Frontend & AI Engineer
            </p>

            <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[10px] text-muted font-mono">
              <span className="flex items-center gap-1 text-sand">
                <MapPin size={11} className="text-amber" />
                Pakistan (Remote)
              </span>
              <span className="text-emerald font-semibold">TechBazaar.pk</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
