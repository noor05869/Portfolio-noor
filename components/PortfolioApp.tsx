'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import About from './About';
import Contact from './Contact';
import DarkState from './DarkState';
import Footer from './Footer';
import Hero from './Hero';
import Navbar from './Navbar';
import Skills from './Skills';
import Work from './Work';
import CustomCursor from './CustomCursor';
import CursorSpotlight from './CursorSpotlight';
import GrainOverlay from './GrainOverlay';
import SmoothScroll from './SmoothScroll';
import ThreeBackground from './ThreeBackground';

export default function PortfolioApp() {
  const [lightsOn, setLightsOn] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden">
      <CustomCursor />
      <CursorSpotlight />
      <GrainOverlay />
      <ThreeBackground />
      
      <AnimatePresence mode="sync">
        {!lightsOn ? (
          <DarkState key="dark" onComplete={() => setLightsOn(true)} />
        ) : (
          <SmoothScroll>
            <motion.div
              key="lit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.35 }}
            >
              <Navbar />
              <Hero />
              <About />
              <Skills />
              <Work />
              <Contact />
              <Footer />
            </motion.div>
          </SmoothScroll>
        )}
      </AnimatePresence>
    </main>
  );
}


