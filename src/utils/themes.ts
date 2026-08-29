import { FabTheme } from '../types';

export interface ThemeConfig {
  '--rf-bg-main': string;
  '--rf-bg-item': string;
  '--rf-bg-item-hover': string;
  '--rf-bg-item-active': string;
  '--rf-border': string;
  '--rf-text': string;
  '--rf-text-muted': string;
  '--rf-accent': string;
  '--rf-accent-glow': string;
  '--rf-danger': string;
  '--rf-danger-glow': string;
  '--rf-track': string;
  '--rf-fill': string;
  '--rf-backdrop': string;
  '--rf-shadow': string;
  '--rf-tooltip-bg': string;
  '--rf-tooltip-text': string;
}

export const THEMES: Record<string, ThemeConfig> = {
  'luxury-watch': {
    '--rf-bg-main': 'linear-gradient(135deg, #18191c 0%, #0d0e11 100%)',
    '--rf-bg-item': 'rgba(24, 25, 29, 0.85)',
    '--rf-bg-item-hover': 'rgba(38, 40, 46, 0.95)',
    '--rf-bg-item-active': '#ffffff',
    '--rf-border': 'rgba(255, 255, 255, 0.18)',
    '--rf-text': '#ffffff',
    '--rf-text-muted': 'rgba(255, 255, 255, 0.55)',
    '--rf-accent': '#ffffff',
    '--rf-accent-glow': 'rgba(255, 255, 255, 0.75)',
    '--rf-danger': '#ef4444',
    '--rf-danger-glow': 'rgba(239, 68, 68, 0.7)',
    '--rf-track': 'rgba(255, 255, 255, 0.15)',
    '--rf-fill': '#ffffff',
    '--rf-backdrop': 'radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 70%)',
    '--rf-shadow': '0 8px 32px rgba(0, 0, 0, 0.65)',
    '--rf-tooltip-bg': '#0f1013',
    '--rf-tooltip-text': '#ffffff'
  },
  'glassmorphic': {
    '--rf-bg-main': 'rgba(255, 255, 255, 0.12)',
    '--rf-bg-item': 'rgba(255, 255, 255, 0.15)',
    '--rf-bg-item-hover': 'rgba(255, 255, 255, 0.28)',
    '--rf-bg-item-active': 'rgba(255, 255, 255, 0.9)',
    '--rf-border': 'rgba(255, 255, 255, 0.3)',
    '--rf-text': '#ffffff',
    '--rf-text-muted': 'rgba(255, 255, 255, 0.65)',
    '--rf-accent': '#38bdf8',
    '--rf-accent-glow': 'rgba(56, 189, 248, 0.8)',
    '--rf-danger': '#f43f5e',
    '--rf-danger-glow': 'rgba(244, 63, 94, 0.75)',
    '--rf-track': 'rgba(255, 255, 255, 0.2)',
    '--rf-fill': '#38bdf8',
    '--rf-backdrop': 'radial-gradient(circle at bottom left, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0) 70%)',
    '--rf-shadow': '0 12px 40px rgba(0, 0, 0, 0.35)',
    '--rf-tooltip-bg': 'rgba(15, 23, 42, 0.85)',
    '--rf-tooltip-text': '#f8fafc'
  },
  'cyberpunk': {
    '--rf-bg-main': 'linear-gradient(135deg, #090a0f 0%, #150024 100%)',
    '--rf-bg-item': 'rgba(18, 12, 36, 0.9)',
    '--rf-bg-item-hover': 'rgba(255, 0, 128, 0.3)',
    '--rf-bg-item-active': '#00f0ff',
    '--rf-border': 'rgba(0, 240, 255, 0.4)',
    '--rf-text': '#00f0ff',
    '--rf-text-muted': 'rgba(0, 240, 255, 0.6)',
    '--rf-accent': '#ffe600',
    '--rf-accent-glow': 'rgba(255, 230, 0, 0.85)',
    '--rf-danger': '#ff0055',
    '--rf-danger-glow': 'rgba(255, 0, 85, 0.9)',
    '--rf-track': 'rgba(0, 240, 255, 0.2)',
    '--rf-fill': '#00f0ff',
    '--rf-backdrop': 'radial-gradient(circle at bottom left, rgba(255, 0, 85, 0.25) 0%, rgba(0, 0, 0, 0) 70%)',
    '--rf-shadow': '0 0 30px rgba(0, 240, 255, 0.35)',
    '--rf-tooltip-bg': '#090a0f',
    '--rf-tooltip-text': '#00f0ff'
  },
  'minimal-light': {
    '--rf-bg-main': '#ffffff',
    '--rf-bg-item': 'rgba(255, 255, 255, 0.96)',
    '--rf-bg-item-hover': '#f1f5f9',
    '--rf-bg-item-active': '#0f172a',
    '--rf-border': 'rgba(0, 0, 0, 0.12)',
    '--rf-text': '#0f172a',
    '--rf-text-muted': '#64748b',
    '--rf-accent': '#2563eb',
    '--rf-accent-glow': 'rgba(37, 99, 235, 0.4)',
    '--rf-danger': '#dc2626',
    '--rf-danger-glow': 'rgba(220, 38, 38, 0.4)',
    '--rf-track': 'rgba(0, 0, 0, 0.1)',
    '--rf-fill': '#2563eb',
    '--rf-backdrop': 'radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
    '--rf-shadow': '0 10px 25px rgba(0, 0, 0, 0.15)',
    '--rf-tooltip-bg': '#0f172a',
    '--rf-tooltip-text': '#f8fafc'
  },
  'neon': {
    '--rf-bg-main': 'linear-gradient(135deg, #11052C 0%, #0c021c 100%)',
    '--rf-bg-item': 'rgba(26, 8, 64, 0.85)',
    '--rf-bg-item-hover': 'rgba(61, 19, 148, 0.95)',
    '--rf-bg-item-active': '#a855f7',
    '--rf-border': 'rgba(168, 85, 247, 0.4)',
    '--rf-text': '#f3e8ff',
    '--rf-text-muted': 'rgba(243, 232, 255, 0.6)',
    '--rf-accent': '#a855f7',
    '--rf-accent-glow': 'rgba(168, 85, 247, 0.85)',
    '--rf-danger': '#f43f5e',
    '--rf-danger-glow': 'rgba(244, 63, 94, 0.85)',
    '--rf-track': 'rgba(168, 85, 247, 0.25)',
    '--rf-fill': '#c084fc',
    '--rf-backdrop': 'radial-gradient(circle at bottom left, rgba(168, 85, 247, 0.3) 0%, rgba(0, 0, 0, 0) 70%)',
    '--rf-shadow': '0 0 35px rgba(168, 85, 247, 0.35)',
    '--rf-tooltip-bg': '#1e0b36',
    '--rf-tooltip-text': '#f3e8ff'
  }
};

/**
 * Returns merged CSS properties for the specified theme and custom overrides.
 */
export function getThemeStyle(
  theme: FabTheme = 'luxury-watch',
  customTheme?: Record<string, string>
): React.CSSProperties {
  const preset = THEMES[theme] || THEMES['luxury-watch'];
  return {
    ...preset,
    ...(customTheme as any)
  };
}
