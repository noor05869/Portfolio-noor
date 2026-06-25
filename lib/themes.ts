export type Mood = 'warm' | 'natural' | 'cool';

export type ThemeDefinition = {
  label: string;
  description: string;
  variables: Record<string, string>;
};

export const themes: Record<Mood, ThemeDefinition> = {
  warm: {
    label: 'Warm White',
    description: 'Classic incandescent · Comfortable for long sessions',
    variables: {
      '--accent': '#F5A623', '--accent-dim': '#C4841A', '--bg-primary': '#0F0E0C',
      '--bg-surface': '#1A1814', '--bg-surface-hover': '#221F1A', '--text-primary': '#F0E6D3',
      '--text-secondary': '#A89880', '--text-muted': '#6B5E4E', '--border': 'rgba(245,166,35,0.15)',
      '--glow': 'rgba(245,166,35,0.10)', '--beam-color': 'rgba(255,200,80,0.15)', '--bulb-color': '#FFD580',
    },
  },
  natural: {
    label: 'Natural White',
    description: 'Balanced · Easy on eyes · True-to-life colors',
    variables: {
      '--accent': '#78C4A0', '--accent-dim': '#4E9E7E', '--bg-primary': '#0C0F0E',
      '--bg-surface': '#141A18', '--bg-surface-hover': '#1B2420', '--text-primary': '#DFF0EA',
      '--text-secondary': '#8BA89C', '--text-muted': '#5A7A6E', '--border': 'rgba(120,196,160,0.15)',
      '--glow': 'rgba(120,196,160,0.08)', '--beam-color': 'rgba(180,230,200,0.12)', '--bulb-color': '#C8EDDC',
    },
  },
  cool: {
    label: 'Cool White',
    description: 'Crisp · High contrast · Focus mode',
    variables: {
      '--accent': '#7EB8F7', '--accent-dim': '#4A8FD4', '--bg-primary': '#0A0C10',
      '--bg-surface': '#111420', '--bg-surface-hover': '#181D2C', '--text-primary': '#D8E8F8',
      '--text-secondary': '#7A90AA', '--text-muted': '#4A5E78', '--border': 'rgba(126,184,247,0.15)',
      '--glow': 'rgba(126,184,247,0.08)', '--beam-color': 'rgba(140,190,255,0.12)', '--bulb-color': '#B0D4FF',
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
