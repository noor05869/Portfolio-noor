'use client';

import { useEffect, useRef } from 'react';

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
          spotlightRef.current.style.opacity = '1';
        }
      });
    };

    const handleMouseLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden" aria-hidden="true">
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute left-0 top-0 h-[280px] w-[280px] rounded-full opacity-0 transition-opacity duration-500 ease-out"
        style={{
          background:
            'radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
