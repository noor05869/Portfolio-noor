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
          DEFAULT: '#faf9f6',
          subtle: '#f3f1ec',
        },
        surface: {
          DEFAULT: '#fdfcfa',
          elevated: '#fefdfb',
          hover: '#efede6',
        },
        ink: {
          DEFAULT: '#181816',
          secondary: '#52514d',
          muted: '#73716b',
        },
        amber: {
          DEFAULT: '#b45309',
          light: '#d97706',
          dark: '#92400e',
        },
        emerald: {
          DEFAULT: '#047857',
          bright: '#059669',
        },
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(24, 24, 22, 0.04), 0 8px 24px -6px rgba(24, 24, 22, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
        'card-hover': '0 2px 4px rgba(24, 24, 22, 0.05), 0 16px 32px -8px rgba(24, 24, 22, 0.09), inset 0 1px 0 rgba(255, 255, 255, 1)',
        portrait: '0 22px 48px -12px rgba(24, 24, 22, 0.16), 0 4px 12px -2px rgba(24, 24, 22, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
