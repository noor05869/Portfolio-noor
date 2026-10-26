import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#08090c',
          subtle: '#0c0e14',
        },
        surface: {
          DEFAULT: '#11141d',
          elevated: '#161a26',
          hover: '#1c2232',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.07)',
          medium: 'rgba(255, 255, 255, 0.12)',
          strong: 'rgba(255, 255, 255, 0.20)',
        },
        amber: {
          DEFAULT: '#f59e0b',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          dim: 'rgba(245, 158, 11, 0.12)',
        },
        emerald: {
          DEFAULT: '#10b981',
          400: '#34d399',
          500: '#10b981',
        },
        cream: '#f9fafb',
        sand: '#d1d5db',
        muted: '#9ca3af',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 12px 36px -8px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'card-hover': '0 20px 48px -10px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.14)',
        highlight: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
