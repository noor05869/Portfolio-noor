'use client';

import { ArrowUpRight, Github, Linkedin, Phone } from 'lucide-react';
import { personalInfo } from '@/lib/data';
import Reveal from './Reveal';

export default function Contact() {
  return (
    <section id="contact" className="section-space relative overflow-hidden border-t border-amber/[0.06]">
      <div aria-hidden="true" className="contact-grid absolute inset-0 opacity-20" />
      <div className="page-shell relative text-center">
        <Reveal>
          <p className="mb-5 font-body text-xs uppercase tracking-[0.26em] text-amber">Contact</p>
          <h2 className="font-display text-4xl font-bold tracking-tight text-cream sm:text-5xl">Let&apos;s build something.</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-sand">Have a project, role, or idea? I&apos;m always open to the right conversation.</p>
          <a href={`mailto:${personalInfo.email}`} className="group mt-9 inline-flex items-center gap-2 break-all font-display text-lg text-amber sm:text-xl">
            <span className="bg-gradient-to-r from-amber to-amber bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">{personalInfo.email}</span><ArrowUpRight size={18} />
          </a>
          <div className="mx-auto my-9 h-px w-full max-w-[200px] bg-amber/[0.12]" />
          <div className="flex flex-col items-center justify-center gap-5 text-sm text-sand sm:flex-row sm:gap-8">
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 transition hover:text-amber"><Github size={17} /> GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 transition hover:text-amber"><Linkedin size={17} /> LinkedIn</a>
            <a href={`tel:${personalInfo.phoneHref}`} className="inline-flex min-h-11 items-center gap-2 transition hover:text-amber"><Phone size={17} /> {personalInfo.phone}</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
