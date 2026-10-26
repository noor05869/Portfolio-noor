'use client';

import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { ProjectImage } from '@/lib/data';

export default function ProjectGallery({ images, projectName }: { images: ProjectImage[]; projectName: string }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const titleId = useId();
  const current = images[index];
  const move = useCallback((direction: number) => setIndex(value => (value + direction + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!expanded) return;
    const element = dialog.current;
    if (!element) return;
    const opener = trigger.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [expanded]);

  if (!current) return null;

  const controls = (large = false) => (
    <div className="flex shrink-0 items-center gap-1.5">
      <button type="button" onClick={() => move(-1)} className="gallery-control" aria-label={`Previous screenshot of ${projectName}`} disabled={images.length < 2}>
        <ChevronLeft size={large ? 20 : 16} aria-hidden="true" />
      </button>
      <span className="min-w-10 text-center font-mono text-xs text-sand" aria-live="polite" aria-atomic="true">{index + 1} / {images.length}</span>
      <button type="button" onClick={() => move(1)} className="gallery-control" aria-label={`Next screenshot of ${projectName}`} disabled={images.length < 2}>
        <ChevronRight size={large ? 20 : 16} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-surface shadow-card">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Production Interface</span>
        <span className="truncate text-xs font-mono text-amber">{current.tag}</span>
      </div>
      <button
        ref={trigger}
        type="button"
        onClick={() => { setZoomed(false); setExpanded(true); }}
        onTouchStart={event => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={event => {
          if (touchStart.current === null) return;
          const distance = touchStart.current - event.changedTouches[0].clientX;
          if (Math.abs(distance) > 40) {
            move(distance > 0 ? 1 : -1);
            event.preventDefault();
          }
          touchStart.current = null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        className="group relative block aspect-[16/9] w-full cursor-zoom-in bg-[#080a0e] focus-visible:outline-offset-[-4px]"
        aria-label={`Enlarge ${projectName}: ${current.title}`}
      >
        <Image src={current.src} alt={current.title} fill sizes="(min-width: 1024px) 650px, (min-width: 768px) 90vw, 100vw" className="object-contain" unoptimized />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-black/80 backdrop-blur-md px-2.5 py-1.5 text-xs text-white transition-all group-hover:bg-black group-hover:scale-105">
          <Maximize2 size={13} aria-hidden="true" /> Full screen
        </span>
      </button>
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" aria-label={`${projectName} screenshots`}>
            {images.map((image, imageIndex) => (
              <button key={image.src} type="button" onClick={() => setIndex(imageIndex)} aria-pressed={index === imageIndex}
                className={`min-h-8 rounded-md px-2.5 font-mono text-xs transition-colors ${index === imageIndex ? 'bg-amber/15 text-amber border border-amber/30' : 'text-sand hover:bg-white/5 hover:text-cream border border-transparent'}`}>
                {image.tag}
              </button>
            ))}
          </div>
          {controls()}
        </div>
        <p className="text-xs leading-5 text-muted">{current.description}</p>
      </div>
      <dialog
        ref={dialog}
        aria-labelledby={titleId}
        className="project-viewer"
        onCancel={() => setExpanded(false)}
        onClose={() => setExpanded(false)}
        onClick={event => { if (event.target === event.currentTarget) setExpanded(false); }}
        onKeyDown={event => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        {expanded && (
          <div className="flex max-h-[92dvh] flex-col overflow-hidden rounded-xl border border-white/15 bg-surface text-cream">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 p-4">
              <div className="min-w-0">
                <p id={titleId} className="font-display text-base font-semibold text-cream">{projectName}</p>
                <p className="truncate text-xs font-mono text-amber">{current.title}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button type="button" onClick={() => setZoomed(value => !value)} className="gallery-control" aria-pressed={zoomed} aria-label={zoomed ? 'Reset zoom' : 'Zoom 200%'}>
                  {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
                </button>
                {controls(true)}
                <button type="button" onClick={() => setExpanded(false)} className="gallery-control" aria-label="Close walkthrough">
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className={`relative flex min-h-[50dvh] flex-1 items-center justify-center overflow-auto p-4 ${zoomed ? 'cursor-zoom-out' : 'cursor-default'}`} onClick={() => zoomed && setZoomed(false)}>
              <div className={`relative transition-transform duration-200 ${zoomed ? 'h-[160dvh] w-[160dvw] max-w-none' : 'h-[65dvh] w-full max-w-[1200px]'}`}>
                <Image src={current.src} alt={current.title} fill sizes="100vw" className="object-contain" unoptimized priority />
              </div>
            </div>
            <div className="border-t border-white/10 bg-black/40 p-4 text-xs text-muted">
              <span className="font-semibold text-sand">{current.tag}:</span> {current.description}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
