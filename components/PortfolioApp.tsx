'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import Work from './Work';
import Skills from './Skills';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import CommandMenu from './CommandMenu';

export default function PortfolioApp() {
  return (
    <div className="min-h-screen bg-canvas text-ink selection:bg-amber/15 selection:text-ink">
      <CommandMenu />
      <Navbar />
      <main id="content">
        <Hero />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
