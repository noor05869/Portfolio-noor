import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--bg-primary-rgb) / <alpha-value>)',
        surface: 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
        'surface-hover': 'rgb(var(--bg-surface-hover-rgb) / <alpha-value>)',
        amber: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          dim: 'rgb(var(--accent-dim-rgb) / <alpha-value>)',
        },
        cream: 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        sand: 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        muted: 'rgb(var(--text-muted-rgb) / <alpha-value>)',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        amber: '0 0 40px rgb(var(--accent-rgb) / calc(var(--intensity) * 0.10))',
        'amber-strong': '0 0 32px rgb(var(--accent-rgb) / calc(var(--intensity) * 0.18))',
      },
      animation: {
        sway: 'sway 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'hint-pulse': 'hintPulse 2.5s ease-in-out infinite',
        flicker: 'flicker 0.45s steps(1) forwards',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.22' },
        },
        hintPulse: {
          '0%, 100%': { opacity: '0.08' },
          '50%': { opacity: '0.16' },
        },
        flicker: {
          '0%': { opacity: '1' },
          '18%': { opacity: '0' },
          '34%': { opacity: '0.8' },
          '48%': { opacity: '0' },
          '64%': { opacity: '0.5' },
          '78%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
