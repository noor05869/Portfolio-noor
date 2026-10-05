'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import { workExperience, type Experience, type Project, type ProjectImage } from '@/lib/data';
import Reveal from './Reveal';
import TextReveal from './TextReveal';

function ArchitectureFlow({ nodes }: { nodes: string[] }) {
  return (
    <div className="mt-5 rounded-xl border border-white/10 bg-black/40 p-4" aria-label={`Architecture: ${nodes.join(' to ')}`}>
      <div className="mb-2.5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber font-semibold">
          System Architecture Pipeline
        </span>
        <span className="text-[10px] font-mono text-slate-400">Microservice Data Flow</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {nodes.map((node, index) => (
          <div key={node} className="contents">
            <span className="rounded-lg border border-amber/30 bg-amber/10 px-3 py-1.5 font-mono text-xs font-semibold text-amber shadow-sm">
              {node}
            </span>
            {index < nodes.length - 1 && (
              <ArrowRight size={13} className="text-amber/60 shrink-0" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Project Screenshot Carousel Component (Raw, library-free)
function ProjectGallery({ images, projectName }: { images: ProjectImage[]; projectName: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  const hasMultiple = images.length > 1;

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  const currentImg = images[currentIndex];

  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d0f14] shadow-xl">
      {/* Gallery Top Window Chrome */}
      <div className="flex items-center justify-between border-b border-white/10 bg-[#161a22] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-[11px] text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">
            {projectName} · {currentImg.tag}
          </span>
        </div>

        {hasMultiple && (
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-slate-400">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Main Carousel Screen */}
      <div
        className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 select-none"
        onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchStart === null) return;
          const diff = touchStart - e.changedTouches[0].clientX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) nextSlide();
            else prevSlide();
          }
          setTouchStart(null);
        }}
      >
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={currentImg.src}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction < 0 ? 40 : -40 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="relative h-full w-full"
          >
            <Image
              src={currentImg.src}
              alt={currentImg.title}
              width={1200}
              height={675}
              unoptimized
              className="h-full w-full object-cover object-top"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Carousel Arrow Controls */}
        {hasMultiple && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-all duration-200 hover:border-amber hover:bg-amber hover:text-black shadow-lg active:scale-95"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white backdrop-blur-md transition-all duration-200 hover:border-amber hover:bg-amber hover:text-black shadow-lg active:scale-95"
              aria-label="Next screenshot"
            >
              <ChevronRight size={18} />
            </button>

            {/* Quick Dot Indicators overlay */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-md border border-white/10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentIndex ? 'w-5 bg-amber' : 'w-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pill Selector Tabs & Caption */}
      <div className="border-t border-white/10 bg-[#12151c] p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {hasMultiple && (
            <div className="flex flex-wrap gap-1.5">
              {images.map((img, idx) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => goToSlide(idx)}
                  className={`rounded-lg px-3 py-1 font-mono text-xs font-medium transition duration-150 ${
                    idx === currentIndex
                      ? 'border border-amber bg-amber/20 text-amber shadow-sm font-semibold'
                      : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {img.tag}
                </button>
              ))}
            </div>
          )}

          <p className="font-mono text-[11px] text-slate-400">
            {currentIndex + 1} of {images.length} views
          </p>
        </div>

        <p className="mt-2.5 text-xs leading-5 text-slate-300 font-sans">
          {currentImg.description}
        </p>
      </div>
    </div>
  );
}

// Project Item Card
function ProjectItem({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-xl border border-white/10 bg-[#12151c]/95 p-5 sm:p-7 shadow-lg transition-all duration-200 hover:border-white/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h4 className="font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
              {project.name}
            </h4>
            {project.badge && (
              <span className="rounded-full border border-amber/40 bg-amber/15 px-3 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber shadow-sm">
                {project.badge}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber/40 bg-amber/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-amber transition hover:bg-amber hover:text-black"
              data-cursor="VISIT"
            >
              <span>Live Site</span>
              <ExternalLink size={13} />
            </a>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 font-mono text-xs text-slate-300 hover:bg-white/10 hover:text-white"
            aria-expanded={isOpen}
          >
            <span>{isOpen ? 'Collapse' : 'Details'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            {/* Deliverables / Impact Bullets */}
            <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-200">
              {project.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="relative pl-5 text-slate-200 before:absolute before:left-0 before:top-[0.68rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-amber"
                >
                  {bullet}
                </li>
              ))}
            </ul>

            {/* Architecture Pipeline if available */}
            {project.architecture && <ArchitectureFlow nodes={project.architecture} />}

            {/* Screenshots Showcase if available */}
            {project.images && project.images.length > 0 && (
              <ProjectGallery images={project.images} projectName={project.name} />
            )}

            {/* Technology Stack Pills */}
            <div className="mt-5 flex flex-wrap gap-2 pt-2 border-t border-white/10">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="tag font-semibold text-slate-200 hover:border-amber hover:text-amber"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Company Experience Container
function CompanySection({ experience }: { experience: Experience }) {
  return (
    <article className="warm-card overflow-hidden p-6 sm:p-9 border border-white/10 bg-[#0d0f14]/90 shadow-2xl">
      <header className="flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-display text-2xl font-bold tracking-tight text-amber sm:text-3xl">
              {experience.company}
            </h3>
            {experience.url && (
              <a
                href={experience.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-amber/40 bg-amber/10 px-3.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-amber transition hover:bg-amber hover:text-black"
                data-cursor="VISIT"
              >
                <span>Company URL</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
          <p className="mt-1 font-display text-base font-semibold text-white">
            {experience.role}
          </p>
        </div>

        <span className="shrink-0 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-mono text-xs font-semibold text-slate-200 shadow-sm">
          {experience.period}
        </span>
      </header>

      {/* Projects List with Real Visuals */}
      <div className="mt-6 space-y-6">
        {experience.projects.map((project) => (
          <ProjectItem key={project.name} project={project} />
        ))}
      </div>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" className="section-space relative">
      <div className="page-shell">
        <Reveal>
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="section-label !mb-0">Engineering Portfolio</span>
              <span className="inline-flex items-center gap-1 rounded-full border border-amber/40 bg-amber/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber">
                <Sparkles size={11} /> Verified Production Work
              </span>
            </div>
            <TextReveal
              text="Selected Projects & Production Systems"
              as="h2"
              className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl lg:text-5xl"
            />
            <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-slate-300 sm:text-base">
              Real-world systems engineered across commerce platforms, AI search engines, and enterprise operations serving 300K+ users and handling tens of millions in volume.
            </p>
          </div>
        </Reveal>

        <div className="space-y-10">
          {workExperience.map((experience, index) => (
            <Reveal key={experience.company} delay={index * 0.08}>
              <CompanySection experience={experience} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
