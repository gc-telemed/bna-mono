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

export const LIGHT_THEME_IDS = ['deepTeal', 'pink'] as const;
export type LightThemeId = (typeof LIGHT_THEME_IDS)[number];

export const DARK_THEME_IDS = ['slate', 'trueBlack'] as const;
export type DarkThemeId = (typeof DARK_THEME_IDS)[number];

export type ThemeId = LightThemeId | DarkThemeId;

export const LIGHT_THEMES: Record<LightThemeId, Palette> = { deepTeal, pink };
export const DARK_THEMES: Record<DarkThemeId, Palette> = { slate, trueBlack };
export const THEMES: Record<ThemeId, Palette> = { ...LIGHT_THEMES, ...DARK_THEMES };

/** Matches the app's `appearance.*` strings so both surfaces use the same words. */
export const LABELS = {
  title: 'Theme',
  system: 'System default',
  systemHint: 'Follows your device, including at sunset.',
  light: 'Light',
  dark: 'Dark',
  theme: {
    deepTeal: 'Deep teal',
    pink: 'Pink',
    slate: 'Slate',
    trueBlack: 'True black',
  },
} as const;

export const THEME_IDS = [...LIGHT_THEME_IDS, ...DARK_THEME_IDS] as const;

/**
 * What the OS preference resolves to when the visitor has not chosen a theme.
 *
 * Deep teal is the app's light default too. The dark side differs deliberately: the app
 * defaults to slate, the site to true black, because a marketing page is read once in
 * passing rather than lived in, and true black is the more striking first impression.
 * Slate remains one tap away.
 */
export const SYSTEM_LIGHT_THEME: LightThemeId = 'deepTeal';
export const SYSTEM_DARK_THEME: DarkThemeId = 'trueBlack';

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === 'string' && (THEME_IDS as readonly string[]).includes(value);
}

/**
 * The visitor's stored choice if they made one, otherwise whichever theme the OS
 * preference maps to. There is no separate light/dark mode control: choosing a theme
 * is choosing light or dark, because each theme is one or the other.
 */
export function resolveThemeId(
  stored: string | null,
  systemScheme: 'light' | 'dark' | null,
): ThemeId {
  if (isThemeId(stored)) return stored;
  return systemScheme === 'dark' ? SYSTEM_DARK_THEME : SYSTEM_LIGHT_THEME;
}

export function isDarkTheme(id: ThemeId): boolean {
  return (DARK_THEME_IDS as readonly string[]).includes(id);
}
