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
    <div className="flex shrink-0 items-center gap-2">
      <button type="button" onClick={() => move(-1)} className="gallery-control" aria-label={`Previous screenshot of ${projectName}`} disabled={images.length < 2}>
        <ChevronLeft size={large ? 22 : 18} aria-hidden="true" />
      </button>
      <span className="min-w-10 text-center font-mono text-xs text-sand" aria-live="polite" aria-atomic="true">{index + 1} / {images.length}</span>
      <button type="button" onClick={() => move(1)} className="gallery-control" aria-label={`Next screenshot of ${projectName}`} disabled={images.length < 2}>
        <ChevronRight size={large ? 22 : 18} aria-hidden="true" />
      </button>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-background/80">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">App walkthrough</span>
        <span className="truncate text-xs text-sand">{current.tag}</span>
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
            // Prevent a swipe from also opening the viewer.
            event.preventDefault();
          }
          touchStart.current = null;
        }}
        onTouchCancel={() => { touchStart.current = null; }}
        className="group relative block aspect-[16/9] w-full cursor-zoom-in bg-[#090b10] focus-visible:outline-offset-[-4px]"
        aria-label={`Enlarge ${projectName}: ${current.title}`}
        data-cursor="VIEW"
      >
        <Image src={current.src} alt={current.title} fill sizes="(min-width: 1024px) 650px, (min-width: 768px) 90vw, 100vw" className="object-contain" unoptimized />
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black/85 px-3 py-2 text-xs text-white transition-colors group-hover:bg-black">
          <Maximize2 size={14} aria-hidden="true" /> View full screen
        </span>
      </button>
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" aria-label={`${projectName} screenshots`}>
            {images.map((image, imageIndex) => (
              <button key={image.src} type="button" onClick={() => setIndex(imageIndex)} aria-pressed={index === imageIndex}
                className={`min-h-11 rounded-md px-3 text-xs transition-colors ${index === imageIndex ? 'bg-amber/15 text-amber' : 'text-sand hover:bg-white/5 hover:text-cream'}`}>
                {image.tag}
              </button>
            ))}
          </div>
          {controls()}
        </div>
        <p className="text-sm leading-6 text-muted">{current.description}</p>
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
          <div className="flex max-h-[92dvh] flex-col overflow-hidden rounded-xl border border-white/15 bg-background text-cream">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 p-4">
              <div className="min-w-0">
                <p id={titleId} className="truncate font-display font-semibold">{projectName}</p>
                <p className="mt-1 text-xs text-sand">{current.tag}</p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button type="button" onClick={() => setZoomed(value => !value)} className="gallery-control" aria-label={zoomed ? 'Fit screenshot to viewer' : 'Zoom screenshot to 200%'} aria-pressed={zoomed}>
                  {zoomed ? <ZoomOut size={20} aria-hidden="true" /> : <ZoomIn size={20} aria-hidden="true" />}
                </button>
                <button type="button" autoFocus onClick={() => setExpanded(false)} className="gallery-control" aria-label="Close screenshot viewer"><X size={22} aria-hidden="true" /></button>
              </div>
            </div>
            <div className="min-h-0 overflow-auto bg-[#090b10]" data-lenis-prevent>
              {/* Natural dimensions preserve the complete UI; scroll to inspect tall screens. */}
              <Image src={current.src} alt={current.title} width={1920} height={1080} className="h-auto max-w-none" style={{ width: zoomed ? '200%' : '100%' }} unoptimized />
            </div>
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
              <p className="max-w-3xl text-sm leading-6 text-sand">{current.description}</p>
              {controls(true)}
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
