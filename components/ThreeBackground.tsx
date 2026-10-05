'use client';

// Lightweight, hardware-accelerated ambient background
// 0 WebGL, 0 requestAnimationFrame loops, 0 CPU re-renders during scroll
export default function ThreeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Precision architectural dot grid */}
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(245, 158, 11, 0.2) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
          maskImage:
            'radial-gradient(circle at 50% 30%, black 20%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(circle at 50% 30%, black 20%, transparent 80%)',
        }}
      />

      {/* Subtle ambient light glows (fixed, static GPU layers) */}
      <div
        className="absolute -top-[15%] left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.07] blur-[120px]"
        style={{ background: 'var(--accent)' }}
      />
      <div
        className="absolute top-[45%] -right-[15%] h-[400px] w-[500px] rounded-full opacity-[0.04] blur-[140px]"
        style={{ background: 'var(--accent)' }}
      />
    </div>
  );
}
