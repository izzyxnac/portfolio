/**
 * Theme System Type Definitions
 *
 * Comprehensive TypeScript interfaces for the theme system
 * Ensures type safety across all theme-related components
 */

export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  // Core colors
  background: string;
  foreground: string;

  // Surface colors
  surface: string;
  surfaceVariant: string;

  // Primary colors
  primary: string;
  primaryForeground: string;
  primaryHover: string;

  // Secondary colors
  secondary: string;
  secondaryForeground: string;
  secondaryHover: string;

  // Accent colors
  accent: string;
  accentForeground: string;
  accentHover: string;

  // Semantic colors
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  error: string;
  errorForeground: string;
  info: string;
  infoForeground: string;

  // Interactive colors
  border: string;
  borderHover: string;
  input: string;
  inputFocus: string;
  ring: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textDisabled: string;

  // Component colors
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  muted: string;
  mutedForeground: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
}

export interface ThemeRadius {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeShadows {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
}

export interface ThemeTypography {
  fontFamily: {
    sans: string[];
    mono: string[];
    display: string[];
  };
  fontSize: {
    xs: [string, { lineHeight: string; letterSpacing: string }];
    sm: [string, { lineHeight: string; letterSpacing: string }];
    base: [string, { lineHeight: string; letterSpacing: string }];
    lg: [string, { lineHeight: string; letterSpacing: string }];
    xl: [string, { lineHeight: string; letterSpacing: string }];
    '2xl': [string, { lineHeight: string; letterSpacing: string }];
    '3xl': [string, { lineHeight: string; letterSpacing: string }];
    '4xl': [string, { lineHeight: string; letterSpacing: string }];
    '5xl': [string, { lineHeight: string; letterSpacing: string }];
    '6xl': [string, { lineHeight: string; letterSpacing: string }];
  };
  fontWeight: {
    light: string;
    normal: string;
    medium: string;
    semibold: string;
    bold: string;
    extrabold: string;
  };
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  shadows: ThemeShadows;
  typography: ThemeTypography;
}

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemeMode;
  storageKey?: string;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  attribute?: string;
  value?: Record<string, string>;
}

export interface UseThemeReturn {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
}

export interface ThemeConfig {
  themes: {
    light: Theme;
    dark: Theme;
  };
  defaultTheme: ThemeMode;
  storageKey: string;
  attribute: string;
  enableSystem: boolean;
  disableTransitionOnChange: boolean;
}

export interface ResponsiveBreakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
}

export interface ResponsiveConfig {
  breakpoints: {
    mobile: ResponsiveBreakpoint;
    tablet: ResponsiveBreakpoint;
    desktop: ResponsiveBreakpoint;
    wide: ResponsiveBreakpoint;
  };
  touchTargetSize: {
    minimum: number;
    recommended: number;
  };
}

export interface MotionConfig {
  enableAnimations: boolean;
  respectReducedMotion: boolean;
  transitionDuration: {
    fast: string;
    normal: string;
    slow: string;
  };
  easingFunctions: {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    bounce: string;
  };
}

export interface AccessibilityConfig {
  colorContrast: {
    // WCAG AA: 4.5:1
    minimum: number;
    // WCAG AAA: 7:1
    enhanced: number;
  };
  focusVisible: {
    outlineWidth: string;
    outlineStyle: string;
    outlineOffset: string;
  };
  reducedMotion: {
    respectPreference: boolean;
    fallbackDuration: string;
  };
}

export interface ThemeSystemConfig {
  theme: ThemeConfig;
  responsive: ResponsiveConfig;
  motion: MotionConfig;
  accessibility: AccessibilityConfig;
}

// Utility types for theme customization
export type ThemeColorKey = keyof ThemeColors;
export type ThemeSpacingKey = keyof ThemeSpacing;
export type ThemeRadiusKey = keyof ThemeRadius;
export type ThemeShadowKey = keyof ThemeShadows;

// CSS custom property types
export type CSSCustomProperty = `--${string}`;
export type ThemeCSSProperties = Record<CSSCustomProperty, string>;

// Component variant types for theme-aware components
export interface ThemeVariant {
  variant?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'info';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Animation preference types
export type MotionPreference = 'no-preference' | 'reduce';

// Media query types
export type MediaQuery =
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'wide'
  | 'dark'
  | 'light'
  | 'reduced-motion'
  | 'high-contrast';

export interface MediaQueryResult {
  matches: boolean;
  media: string;
}

// Theme event types
export interface ThemeChangeEvent {
  theme: ThemeMode;
  resolvedTheme: 'light' | 'dark';
  systemTheme: 'light' | 'dark';
}

export type ThemeEventListener = (event: ThemeChangeEvent) => void;

// Storage types for theme persistence
export interface ThemeStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
}

// Default theme storage implementation
export const defaultThemeStorage: ThemeStorage = {
  getItem: (key: string) => {
    if (typeof window === 'undefined') return null;
    return window.localStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    if (typeof window === 'undefined') return;
    window.localStorage.removeItem(key);
  },
};
