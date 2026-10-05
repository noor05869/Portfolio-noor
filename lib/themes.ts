export type Mood = 'warm' | 'natural' | 'cool';

export type ThemeDefinition = {
  label: string;
  description: string;
  variables: Record<string, string>;
};

export const themes: Record<Mood, ThemeDefinition> = {
  warm: {
    label: 'Studio Gold',
    description: 'Refined obsidian background with crisp typography and gold highlights',
    variables: {
      '--accent': '#F59E0B',
      '--accent-dim': '#D97706',
      '--bg-primary': '#0A0B0E',
      '--bg-surface': '#13161F',
      '--bg-surface-hover': '#1A1F2C',
      '--text-primary': '#F9FAFB',
      '--text-secondary': '#D1D5DB',
      '--text-muted': '#9CA3AF',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--glow': 'rgba(245, 158, 11, 0.08)',
      '--beam-color': 'rgba(245, 158, 11, 0.06)',
      '--bulb-color': '#FCD34D',
    },
  },
  natural: {
    label: 'Emerald Matrix',
    description: 'Clean balanced dark slate with emerald accents and crisp contrast',
    variables: {
      '--accent': '#10B981',
      '--accent-dim': '#059669',
      '--bg-primary': '#080C0A',
      '--bg-surface': '#101815',
      '--bg-surface-hover': '#16221D',
      '--text-primary': '#F9FAFB',
      '--text-secondary': '#D1D5DB',
      '--text-muted': '#9CA3AF',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--glow': 'rgba(16, 185, 129, 0.08)',
      '--beam-color': 'rgba(16, 185, 129, 0.06)',
      '--bulb-color': '#6EE7B7',
    },
  },
  cool: {
    label: 'Cyber Cyan',
    description: 'High-contrast focused dark blue with luminous sky accents',
    variables: {
      '--accent': '#38BDF8',
      '--accent-dim': '#0284C7',
      '--bg-primary': '#080B10',
      '--bg-surface': '#0F1522',
      '--bg-surface-hover': '#172033',
      '--text-primary': '#F8FAFC',
      '--text-secondary': '#CBD5E1',
      '--text-muted': '#94A3B8',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--glow': 'rgba(56, 189, 248, 0.08)',
      '--beam-color': 'rgba(56, 189, 248, 0.06)',
      '--bulb-color': '#93C5FD',
    },
  },
};

const hexToRgbChannels = (value: string) => {
  const hex = value.replace('#', '');
  return `${parseInt(hex.slice(0, 2), 16)} ${parseInt(hex.slice(2, 4), 16)} ${parseInt(hex.slice(4, 6), 16)}`;
};

export function applyTheme(mood: Mood, intensity = 78) {
  const root = document.documentElement;
  Object.entries(themes[mood].variables).forEach(([key, value]) => {
    root.style.setProperty(key, value);
    if (value.startsWith('#')) root.style.setProperty(`${key}-rgb`, hexToRgbChannels(value));
  });
  root.style.setProperty('--intensity', String(intensity / 100));
  root.dataset.mood = mood;
}
