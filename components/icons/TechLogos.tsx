'use client';

import React from 'react';

export interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-6 h-6', size = 24 }) => {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 1. React / React Native
  if (norm.includes('react') && !norm.includes('query')) {
    return (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#00D8FF" />
        <g stroke="#00D8FF" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // 2. Next.js
  if (norm.includes('next')) {
    return (
      <svg viewBox="0 0 180 180" width={size} height={size} className={className} aria-hidden="true">
        <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: 'alpha' }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" fill="#000000" r="90" />
          <path d="M149.508 157.438L69.147 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.136 149.508 157.438Z" fill="url(#next-g1)" />
          <rect fill="url(#next-g2)" height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient id="next-g1" gradientUnits="userSpaceOnUse" x1="109" x2="144.5" y1="116.5" y2="160.5">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="next-g2" gradientUnits="userSpaceOnUse" x1="121" x2="120.799" y1="54" y2="106.875">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  // 3. TypeScript
  if (norm.includes('typescript') || norm === 'ts') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path d="M11.75 14.5c-.32.6-.82 1.05-1.5 1.34-.68.3-1.5.45-2.45.45-.8 0-1.52-.12-2.16-.36s-1.18-.58-1.62-1.02l1.24-1.74c.36.36.78.65 1.26.85.48.2 1 .3 1.56.3.56 0 1-.09 1.32-.27.32-.18.48-.46.48-.84 0-.3-.1-.54-.3-.72-.2-.18-.5-.33-.9-.45L7.2 11.5c-1-.3-1.74-.72-2.22-1.26s-.72-1.22-.72-2.04c0-.76.2-1.42.6-1.98.4-.56.96-.99 1.68-1.29.72-.3 1.58-.45 2.58-.45.74 0 1.44.1 2.1.3.66.2 1.2.48 1.62.84l-1.14 1.74c-.38-.3-.8-.53-1.26-.69-.46-.16-.94-.24-1.44-.24-.54 0-.96.09-1.26.27-.3.18-.45.44-.45.78 0 .28.1.51.3.69.2.18.5.33.9.45l1.47.45c1.02.32 1.78.75 2.28 1.29.5.54.75 1.24.75 2.1 0 .76-.2 1.42-.6 1.98zM21.5 6.5h-5.8V4.8h14.2v1.7h-5.8v11.4h-2.6V6.5z" fill="#FFFFFF" transform="scale(0.8) translate(3, 3)" />
      </svg>
    );
  }

  // 4. JavaScript
  if (norm.includes('javascript') || norm === 'js') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path d="M7.5 17.5c.6.35 1.28.53 2.05.53 1.9 0 3.12-.92 3.12-2.92v-7.1h-2.2v7.1c0 .98-.55 1.42-1.35 1.42-.6 0-1.1-.18-1.62-.48l0 1.45zm8.1-1.3c.72.42 1.62.7 2.5.7 1.42 0 2.25-.68 2.25-1.7 0-1.02-.75-1.52-2.05-2.05-1.7-.7-2.78-1.58-2.78-3.18 0-1.68 1.35-2.95 3.4-2.95 1.08 0 1.98.28 2.65.65l-.65 1.62c-.52-.3-1.25-.55-2-.55-1.1 0-1.75.58-1.75 1.4 0 .95.68 1.4 1.98 1.92 1.8.72 2.85 1.62 2.85 3.32 0 1.78-1.42 3.02-3.62 3.02-1.2 0-2.28-.35-3.05-.82l.52-1.48z" fill="#000000" transform="scale(0.85) translate(2, 1.5)" />
      </svg>
    );
  }

  // 5. Tailwind CSS
  if (norm.includes('tailwind')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#06B6D4" />
      </svg>
    );
  }

  // 6. Angular
  if (norm.includes('angular')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2.5L2.5 5.9l1.45 12.65L12 22.5l8.05-3.95L21.5 5.9 12 2.5zm0 2.28l6.45 2.32-1.12 9.8-5.33 2.62-5.33-2.62-1.12-9.8L12 4.78zm0 3.22L8.2 16.5h1.72l.78-1.95h2.6l.78 1.95H15.8L12 8zm-1.05 5.22L12 10.4l1.05 2.82h-2.1z" fill="#DD0031" />
      </svg>
    );
  }

  // 7. Expo / React Native Expo
  if (norm.includes('expo')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M2.5 19.5L12 3l9.5 16.5H18L12 8.5 6 19.5H2.5z" fill="#000020" />
      </svg>
    );
  }

  // 8. Python
  if (norm.includes('python')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M11.922 2c-3.14 0-2.955 1.36-2.955 1.36l.004 1.41h2.99v.426H6.182s-2.182.246-2.182 3.195c0 2.95 1.905 3.067 1.905 3.067h1.137v-1.61s-.062-1.92 1.884-1.92h3.238s1.822-.027 1.822-1.79V4.28S14.17 2 11.922 2zm-1.64 1.055a.695.695 0 1 1 0 1.39.695.695 0 0 1 0-1.39z" fill="#387EB8" />
        <path d="M12.078 22c3.14 0 2.955-1.36 2.955-1.36l-.004-1.41h-2.99v-.426h5.779s2.182-.246 2.182-3.195c0-2.95-1.905-3.067-1.905-3.067h-1.137v1.61s.062 1.92-1.884 1.92H11.74s-1.822.027-1.822 1.79v3.444S9.83 22 12.078 22zm1.64-1.055a.695.695 0 1 1 0-1.39.695.695 0 0 1 0 1.39z" fill="#FFE052" />
      </svg>
    );
  }

  // 9. FastAPI
  if (norm.includes('fastapi')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="11" fill="#009688" />
        <path d="M12.5 4L6 13h5l-1 7 7.5-10H12l.5-6z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 10. Node.js
  if (norm.includes('node')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2.5L3.5 7.4v9.8L12 22.1l8.5-4.9V7.4L12 2.5zm0 2.3l6.5 3.8v7.5L12 19.8 5.5 16V8.6L12 4.8zm-1.5 5.4c-.8 0-1.5.7-1.5 1.5v3.2c0 .8.7 1.5 1.5 1.5h3c.8 0 1.5-.7 1.5-1.5v-1.2h-2v1h-2v-3h4v-1.5c0-.8-.7-1.5-1.5-1.5h-3z" fill="#5FA04E" />
      </svg>
    );
  }

  // 11. NestJS
  if (norm.includes('nest')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12.4 2.2C10.6 1.8 8.7 2.1 7.2 3.1 5.6 4.1 4.5 5.8 4.2 7.7c-.2 1.2 0 2.4.6 3.5.5 1 1.4 1.8 2.4 2.3l-2.6 4.5c-.3.5-.2 1.1.2 1.5.5.4 1.1.3 1.5-.2l2.7-4.7c.9.3 1.9.4 2.9.3 2.1-.2 4-1.3 5.1-3 1.2-1.7 1.4-3.8.7-5.7-.7-1.9-2.2-3.3-4.1-3.9z" fill="#E0234E" />
      </svg>
    );
  }

  // 12. Google Gemini / AI
  if (norm.includes('gemini') || norm.includes('google')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <defs>
          <linearGradient id="gemini-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1BA1E3" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#gemini-grad)" />
      </svg>
    );
  }

  // 13. OpenAI
  if (norm.includes('openai')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M22.28 9.77a5.98 5.98 0 0 0-.52-4.96 6.07 6.07 0 0 0-6.52-2.83A6.05 6.05 0 0 0 10.7.35a6.07 6.07 0 0 0-5.83 4.25A6.03 6.03 0 0 0 1.3 7.82a6.07 6.07 0 0 0 .7 7.03 6.06 6.06 0 0 0 .52 4.96 6.07 6.07 0 0 0 6.52 2.83A6.08 6.08 0 0 0 13.6 24a6.07 6.07 0 0 0 5.83-4.25 6.05 6.05 0 0 0 3.56-3.22 6.07 6.07 0 0 0-.71-6.76zM13.6 22.38a4.48 4.48 0 0 1-2.92-1.07l.15-.08 4.86-2.81a.8.8 0 0 0 .4-.69v-6.85l2.06 1.19a.07.07 0 0 1 .04.05v5.77a4.5 4.5 0 0 1-4.59 4.49zm-8.8-3.41a4.5 4.5 0 0 1-.65-3.04l.15.09 4.86 2.8a.79.79 0 0 0 .8 0l5.93-3.43v2.38a.07.07 0 0 1-.03.06l-5 2.89a4.52 4.52 0 0 1-6.06-1.75zM3.4 9.17a4.5 4.5 0 0 1 2.27-1.97v5.77a.8.8 0 0 0 .4.69l5.93 3.42-2.06 1.19a.07.07 0 0 1-.07 0l-5-2.89A4.5 4.5 0 0 1 3.4 9.17zm14.88 2.65l-5.93-3.42 2.06-1.19a.07.07 0 0 1 .07 0l5 2.89a4.5 4.5 0 0 1 .65 7.53v-5.12a.8.8 0 0 0-.4-.69zm2.4-3.13l-.15-.09-4.86-2.8a.79.79 0 0 0-.8 0L9 9.22V6.84a.07.07 0 0 1 .03-.06l5-2.89a4.51 4.51 0 0 1 6.72 4.79zm-8.7-2.61a4.48 4.48 0 0 1 2.92 1.07l-.15.08-4.86 2.81a.8.8 0 0 0-.4.69v6.85L7.03 15.5a.07.07 0 0 1-.04-.05V9.68a4.5 4.5 0 0 1 4.59-4.49zM12 13.62l-2.67-1.54 2.67-1.54 2.67 1.54L12 13.62z" fill="#10A37F" />
      </svg>
    );
  }

  // 14. Qdrant / Vector DB
  if (norm.includes('qdrant')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#DC2626" />
        <path d="M12 4L4 8.5v7L12 20l8-4.5v-7L12 4zm0 2.4l5.8 3.3-5.8 3.3-5.8-3.3L12 6.4zM6 10.3l5 2.8v4.8l-5-2.8v-4.8zm12 4.8l-5 2.8v-4.8l5-2.8v4.8z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 15. LangChain
  if (norm.includes('langchain')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#1C3C3C" />
        <path d="M7 6h3v5H7V6zm7 0h3v5h-3V6zm-3.5 4h3v4h-3v-4zm-3.5 3h3v5H7v-5zm7 0h3v5h-3v-5z" fill="#E2B714" />
      </svg>
    );
  }

  // 16. PostgreSQL
  if (norm.includes('postgres') || norm.includes('psql')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.2 17.5c-2.3 0-4.1-1.2-4.8-3h2.3c.4.8 1.4 1.3 2.5 1.3 1.7 0 2.8-1 2.8-2.6v-.7c-.6.6-1.5 1-2.5 1-2.5 0-4.5-2.1-4.5-4.7 0-2.6 2-4.7 4.5-4.7 1 0 1.9.4 2.5 1v-.8h2.3v8.5c0 2.8-2 4.7-5.1 4.7zm0-10.8c-1.4 0-2.5 1.1-2.5 2.6 0 1.4 1.1 2.6 2.5 2.6 1.4 0 2.5-1.1 2.5-2.6 0-1.4-1.1-2.6-2.5-2.6z" fill="#336791" />
      </svg>
    );
  }

  // 17. Supabase
  if (norm.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M13.4 2.1c-.5-.7-1.6-.4-1.7.5L10.2 13h9.1c.9 0 1.4 1.1.8 1.8l-8.5 10.1c-.5.7-1.6.4-1.7-.5l1.5-10.4H2.3c-.9 0-1.4-1.1-.8-1.8L13.4 2.1z" fill="#3ECF8E" />
      </svg>
    );
  }

  // 18. Redis
  if (norm.includes('redis')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M2.5 8.5L12 4l9.5 4.5L12 13 2.5 8.5zm0 4.5L12 17.5l9.5-4.5M2.5 17.5L12 22l9.5-4.5" fill="none" stroke="#DC382D" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 19. Docker
  if (norm.includes('docker')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M13.9 8.2h-2V6.2h2v2zm-2.5 0h-2V6.2h2v2zm-2.5 0h-2V6.2h2v2zm5 2.5h-2v-2h2v2zm-2.5 0h-2v-2h2v2zm-2.5 0h-2v-2h2v2zm-2.5 0h-2v-2h2v2zm12.9.2c-.4-.3-1.6-.4-2.5.2-.2.1-.4.3-.5.5-.9-.1-1.8.2-2.4.8-.4-.2-1.3-.4-2.4-.2H2.3c-.3 1.1-.3 3.6 1.4 5.3 1.6 1.7 4 2.2 7.7 2.2 6.5 0 10.3-3.4 10.9-8.4.6-.2 1.4-.4 1.6-.4z" fill="#2496ED" />
      </svg>
    );
  }

  // 20. Git
  if (norm === 'git') {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M21.6 10.9l-8.5-8.5c-.8-.8-2.1-.8-2.9 0L8.1 4.5l3.6 3.6c.9-.3 1.9-.1 2.5.6.7.7.9 1.7.5 2.6l3.5 3.5c.9-.4 1.9-.2 2.6.5.9.9.9 2.4 0 3.3s-2.4.9-3.3 0c-.7-.7-.9-1.8-.5-2.7l-3.3-3.3v4.6c.3.2.6.5.7.9.6.9.4 2.2-.5 2.8s-2.2.4-2.8-.5c-.6-.9-.4-2.2.5-2.8.4-.3.9-.4 1.4-.3V9.6c-.5.1-1-.1-1.4-.3-.9-.6-1.1-1.9-.5-2.8.3-.4.7-.7 1.2-.8L8.1 2.1 2.4 7.8c-.8.8-.8 2.1 0 2.9l8.5 8.5c.8.8 2.1.8 2.9 0l7.8-7.8c.8-.8.8-2.1 0-2.9z" fill="#F05032" />
      </svg>
    );
  }

  // 21. GitHub Actions
  if (norm.includes('github')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" fill="#24292E" />
      </svg>
    );
  }

  // 22. Vitest
  if (norm.includes('vitest')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M18.8 4.2L12 18.5 5.2 4.2h3.5l3.3 7.8 3.3-7.8z" fill="#729B1A" />
        <circle cx="12" cy="7.5" r="2.2" fill="#FCC72B" />
      </svg>
    );
  }

  // 23. Jest
  if (norm.includes('jest')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2.5c-4 0-6.8 2.2-7.8 5.6-.2.7.2 1.4.9 1.5.7.1 1.4-.3 1.5-1 .7-2.6 2.8-4.1 5.4-4.1 3.2 0 5.6 2.1 5.6 5 0 1.9-1.1 3.4-2.8 4.4-.8.5-1.3 1.3-1.3 2.2V17h2v-.8c0-.3.2-.6.5-.8 2.2-1.3 3.6-3.3 3.6-5.8 0-4.1-3.4-7.1-7.1-7.1zm-1 16.5h2v2h-2v-2z" fill="#C21325" />
      </svg>
    );
  }

  // 24. Playwright
  if (norm.includes('playwright')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M17.5 4.5a4.5 4.5 0 0 0-4 2.5 4.5 4.5 0 1 0-7 5.5l5.5 7 5.5-7a4.5 4.5 0 0 0 0-8z" fill="#2EAD33" />
        <circle cx="10" cy="10" r="1.5" fill="#FFFFFF" />
        <circle cx="15" cy="8.5" r="1.5" fill="#FFFFFF" />
      </svg>
    );
  }

  // 25. Cypress
  if (norm.includes('cypress')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#17202C" />
        <path d="M16.5 9.5a4 4 0 1 0-4 5.5 3.9 3.9 0 0 0 2.5-.9l1.2 1.2a5.7 5.7 0 1 1 .5-6.5l-1.3.9c.4.6.6 1.3.6 2 0 1.2-.5 2.3-1.5 3a2.3 2.3 0 1 1 .5-3.8l1.5-1.4z" fill="#69D3A7" />
      </svg>
    );
  }

  // 26. TanStack Query
  if (norm.includes('tanstack') || norm.includes('query')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="#FF4154" />
        <path d="M12 6a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6zm3 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-6 8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 27. Zustand
  if (norm.includes('zustand')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M7 6c-1.5 0-2.5 1.2-2.5 2.5 0 .8.4 1.5 1 1.9C4.5 11.5 4 13.2 4 15c0 3.3 3.6 6 8 6s8-2.7 8-6c0-1.8-.5-3.5-1.5-4.6.6-.4 1-1.1 1-1.9 0-1.3-1-2.5-2.5-2.5-1.1 0-2 .6-2.3 1.5C13.8 7.2 12.9 7 12 7s-1.8.2-2.7.5C9 6.6 8.1 6 7 6zm2.5 7.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-2.5 2c1.2 0 2 .5 2 1s-.8 1-2 1-2-.5-2-1 .8-1 2-1z" fill="#443E38" />
      </svg>
    );
  }

  // 28. Redux Toolkit
  if (norm.includes('redux')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M16.5 4.5c-1.8 0-3.3 1-4.2 2.5-.9-1.5-2.4-2.5-4.2-2.5-2.8 0-5 2.2-5 5 0 3.8 5 8 9.2 10.8 4.2-2.8 9.2-7 9.2-10.8 0-2.8-2.2-5-5-5zm-4.5 11c-2.5-2-6-5.1-6-7.5 0-1.7 1.3-3 3-3 1.4 0 2.6.9 2.9 2.2h.2c.3-1.3 1.5-2.2 2.9-2.2 1.7 0 3 1.3 3 3 0 2.4-3.5 5.5-6 7.5z" fill="#764ABC" />
      </svg>
    );
  }

  // 29. Zod
  if (norm.includes('zod')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3E67B1" />
        <path d="M6 7.5h12v2.2L9.8 15h8.2v2.2H6v-2.2l8.2-5.3H6V7.5z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 30. React Hook Form
  if (norm.includes('hookform') || norm.includes('form')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 2L3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm-2 15l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#EC5990" />
      </svg>
    );
  }

  // 31. Radix UI
  if (norm.includes('radix')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="7" cy="7" r="3.5" fill="#111110" />
        <path d="M13.5 7h3.5v7h-3.5z" fill="#111110" />
        <path d="M7 13.5c1.93 0 3.5 1.57 3.5 3.5S8.93 20.5 7 20.5 3.5 18.93 3.5 17s1.57-3.5 3.5-3.5z" fill="#111110" />
      </svg>
    );
  }

  // 32. Postman
  if (norm.includes('postman')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path d="M13 6l4 4-5 5-2-2 3-3-4-1 4-3z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 33. Firebase
  if (norm.includes('firebase')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M4.5 16.5L7 3l4.5 8.5-7 5z" fill="#FFA000" />
        <path d="M19.5 16.5L14 3l-2.5 4.5 8 9z" fill="#F57C00" />
        <path d="M11.5 11.5L8.5 6 4.5 16.5l7-5zm.5 1.5l-7.5 3.5 7.5 4.5 7.5-4.5-7.5-3.5z" fill="#FFCA28" />
      </svg>
    );
  }

  // 34. MySQL
  if (norm.includes('mysql')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M12 3c-4.97 0-9 4.03-9 9 0 4.14 2.81 7.63 6.64 8.65.62-.35 1.2-.78 1.73-1.28.32-.3.6-.64.84-1 .47.24 1 .38 1.57.38 2.21 0 4-1.79 4-4 0-.82-.25-1.58-.68-2.22.42-.48.68-1.1.68-1.78 0-1.52-1.23-2.75-2.75-2.75H12V3z" fill="#00758F" />
      </svg>
    );
  }

  // 35. HTML5 / CSS3
  if (norm.includes('html') || norm.includes('css')) {
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
        <path d="M4 3l1.5 16.5L12 21.5l6.5-2L20 3H4zm13.8 4.2l-.3 3.6H9.2l.2 2.2h8l-.5 5.5-4.9 1.4-4.9-1.4-.3-3.6h2.2l.2 1.8 2.8.8 2.8-.8.3-2.7H6.7L6 5h12l-.2 2.2z" fill="#E34F26" />
      </svg>
    );
  }

  // Default Fallback: Clean Generic Terminal / Stack Icon
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M7 8l4 4-4 4m6 0h4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
