'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

export default function TextReveal({
  text,
  className = '',
  as: Component = 'h2',
  delay = 0,
}: TextRevealProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 150,
      },
    },
    hidden: {
      opacity: 0,
      y: 28,
      rotateX: -20,
    },
  };

  return (
    <Component className={`inline-flex flex-wrap gap-[0.25em] ${className}`}>
      <motion.span
        className="inline-flex flex-wrap gap-[0.25em]"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block origin-bottom transform-gpu"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
