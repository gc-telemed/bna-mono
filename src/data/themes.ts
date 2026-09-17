/**
 * The app's four themes, ported for the web.
 *
 * Values are copied verbatim from the app's `src/theme/palette.ts` (ADR-09 §V1) so the
 * site and the product read as the same thing. Two light themes on one shared warm
 * neutral ramp — deep teal (default) and pink — and two complete dark palettes — slate
 * (default) and true black. Appearance follows the OS unless the visitor pins it.
 *
 * Only the tokens a marketing site actually draws with are carried over. The app's
 * clinical tokens (chart series, target band, reading gaps, illustration fills) have no
 * counterpart here and are deliberately left behind.
 *
 * Labels match the app's `appearance.*` strings in `src/i18n/en.json`, so a visitor who
 * later installs the app meets the same words.
 */

export interface Palette {
  ground: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  focus: string;
  text: string;
  textMuted: string;
  textOnFill: string;
  primary: string;
  primaryPressed: string;
  primaryTint: string;
  success: string;
  successTint: string;
  warning: string;
  warningTint: string;
  danger: string;
  dangerTint: string;
}

/** The warm neutral ramp both light themes share; they differ only in the primary trio. */
const lightRamp = {
  ground: '#FAF7F2',
  surface: '#FFFFFF',
  surfaceMuted: '#F3EEE7',
  border: '#E7DFD4',
  borderStrong: '#8A7C6B',
  text: '#2A2320',
  textMuted: '#6B5F57',
  textOnFill: '#FFFFFF',
  success: '#2E7D32',
  successTint: '#E7EFE0',
  warning: '#8A5A00',
  warningTint: '#F7EEDC',
  danger: '#B3261E',
  dangerTint: '#F8E6E1',
} as const;

export const deepTeal: Palette = {
  ...lightRamp,
  focus: '#0F6E63',
  primary: '#0F6E63',
  primaryPressed: '#0B554C',
  primaryTint: '#E2F0ED',
};

export const pink: Palette = {
  ...lightRamp,
  focus: '#D3007D',
  primary: '#D3007D',
  primaryPressed: '#A80063',
  primaryTint: '#FBE4F1',
};

export const slate: Palette = {
  ground: '#0F172A',
  surface: '#1E293B',
  surfaceMuted: '#273449',
  border: '#334155',
  borderStrong: '#94A3B8',
  focus: '#5EC2F0',
  text: '#F1F5F9',
  textMuted: '#A9B6C8',
  // Every dark-theme fill is a light colour, so its label is ink rather than white.
  textOnFill: '#0F172A',
  primary: '#5EC2F0',
  // Lighter than `primary`: on a dark ground, pressed means brighter.
  primaryPressed: '#8FD6F6',
  primaryTint: '#1B3346',
  success: '#5FD48C',
  successTint: '#17301F',
  warning: '#E8B451',
  warningTint: '#33280F',
  danger: '#F58C84',
  dangerTint: '#351D1B',
};

export const trueBlack: Palette = {
  ground: '#000000',
  surface: '#0E0E0E',
  surfaceMuted: '#171717',
  border: '#2E2E2E',
  borderStrong: '#A3A3A3',
  focus: '#5EEAD4',
  text: '#FFFFFF',
  textMuted: '#CFCFCF',
  textOnFill: '#000000',
  primary: '#5EEAD4',
  primaryPressed: '#99F6E4',
  primaryTint: '#0B2E29',
  success: '#6EE7A8',
  successTint: '#0E2A1B',
  warning: '#FCD34D',
  warningTint: '#2E2510',
  danger: '#FCA5A5',
  dangerTint: '#2E1717',
};

export const APPEARANCE_MODES = ['system', 'light', 'dark'] as const;
export type AppearanceMode = (typeof APPEARANCE_MODES)[number];

export const LIGHT_THEME_IDS = ['deepTeal', 'pink'] as const;
export type LightThemeId = (typeof LIGHT_THEME_IDS)[number];

export const DARK_THEME_IDS = ['slate', 'trueBlack'] as const;
export type DarkThemeId = (typeof DARK_THEME_IDS)[number];

export type ThemeId = LightThemeId | DarkThemeId;

export const LIGHT_THEMES: Record<LightThemeId, Palette> = { deepTeal, pink };
export const DARK_THEMES: Record<DarkThemeId, Palette> = { slate, trueBlack };
export const THEMES: Record<ThemeId, Palette> = { ...LIGHT_THEMES, ...DARK_THEMES };

export const DEFAULT_LIGHT_THEME: LightThemeId = 'deepTeal';
export const DEFAULT_DARK_THEME: DarkThemeId = 'slate';

/** Matches the app's `appearance.*` strings so both surfaces use the same words. */
export const LABELS = {
  title: 'Appearance',
  mode: 'Appearance',
  modeSystem: 'Follow system',
  modeLight: 'Always light',
  modeDark: 'Always dark',
  modeHint: 'Follow system changes with your device, including at sunset.',
  light: 'Light theme',
  dark: 'Dark theme',
  theme: {
    deepTeal: 'Deep teal',
    pink: 'Pink',
    slate: 'Slate',
    trueBlack: 'True black',
  },
} as const;

/**
 * Product accents, which the app has no counterpart for — it has one primary per theme,
 * while the site needs to tell three products apart at a glance.
 *
 * Two values rather than four: the light themes share a neutral ramp and the dark ones are
 * both dark, so a light-side and a dark-side value cover all four grounds.
 */
export const PRODUCT_ACCENTS = {
  diabetes: { light: '#A94E08', dark: '#FCD34D', lightTint: '#F7EEDC', darkTint: '#33280F' },
  clinic: { light: '#4338CA', dark: '#A5B4FC', lightTint: '#E7E6FB', darkTint: '#1E1B4B' },
  platform: { light: '#6D28D9', dark: '#C4B5FD', lightTint: '#EFE9FC', darkTint: '#2A1B4B' },
} as const;

export type ProductAccent = keyof typeof PRODUCT_ACCENTS;

/** The app's `resolvePalette`, minus the palette lookup the browser does in CSS. */
export function resolveThemeId(options: {
  mode: AppearanceMode;
  light: LightThemeId;
  dark: DarkThemeId;
  systemScheme: 'light' | 'dark' | null;
}): ThemeId {
  const { mode, light, dark, systemScheme } = options;
  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  return isDark ? dark : light;
}

export function isDarkTheme(id: ThemeId): boolean {
  return (DARK_THEME_IDS as readonly string[]).includes(id);
}
