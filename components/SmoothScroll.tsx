'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

// Native hardware-accelerated scrolling runs on the browser compositor at native 120Hz/144Hz
// without JavaScript wheel-interception lag
export default function SmoothScroll({ children }: SmoothScrollProps) {
  return <>{children}</>;
}
