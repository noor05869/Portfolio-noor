'use client';

import Navbar from './Navbar';
import Hero from './Hero';
import Work from './Work';
import Skills from './Skills';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';

export default function PortfolioApp() {
  return (
    <div className="min-h-screen bg-canvas text-cream selection:bg-amber/20 selection:text-white">
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
