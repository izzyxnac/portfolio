/**
 * Responsive Breakpoint Constants
 *
 * Defines breakpoints for mobile-first responsive design
 * Includes touch target sizes for accessibility compliance
 */

export interface BreakpointConfig {
  name: string;
  minWidth: number;
  maxWidth?: number;
  mediaQuery: string;
}

/**
 * Responsive breakpoints following mobile-first approach
 * Based on common device sizes and usage patterns
 */
export const BREAKPOINTS = {
  mobile: {
    name: 'mobile',
    minWidth: 320,
    maxWidth: 767,
    mediaQuery: '(min-width: 320px) and (max-width: 767px)',
  },
  tablet: {
    name: 'tablet',
    minWidth: 768,
    maxWidth: 1023,
    mediaQuery: '(min-width: 768px) and (max-width: 1023px)',
  },
  desktop: {
    name: 'desktop',
    minWidth: 1024,
    maxWidth: 1439,
    mediaQuery: '(min-width: 1024px) and (max-width: 1439px)',
  },
  wide: {
    name: 'wide',
    minWidth: 1440,
    mediaQuery: '(min-width: 1440px)',
  },
} as const;

/**
 * Simplified breakpoint values for Tailwind CSS
 */
export const BREAKPOINT_VALUES = {
  // Small devices (landscape phones)
  sm: 640,
  // Medium devices (tablets)
  md: 768,
  // Large devices (desktops)
  lg: 1024,
  // Extra large devices
  xl: 1280,
  // 2X Extra large devices
  '2xl': 1536,
} as const;

/**
 * Touch target sizes for accessibility compliance
 * Based on WCAG 2.1 AA guidelines and platform recommendations
 */
export const TOUCH_TARGETS = {
  // WCAG 2.1 AA minimum requirement
  minimum: {
    size: 44,
    unit: 'px',
    description: 'WCAG 2.1 AA minimum touch target size',
  },
  // Recommended size for better usability
  recommended: {
    size: 48,
    unit: 'px',
    description: 'Recommended touch target size for optimal usability',
  },
  // Platform-specific recommendations
  ios: {
    size: 44,
    unit: 'px',
    description: 'iOS Human Interface Guidelines recommendation',
  },
  android: {
    size: 48,
    unit: 'dp',
    description: 'Android Material Design Guidelines recommendation',
  },
} as const;

/**
 * Spacing scale for responsive design
 * Uses a consistent scale that works across all breakpoints
 */
export const SPACING_SCALE = {
  // 0.25rem
  xs: 4,
  // 0.5rem
  sm: 8,
  // 1rem
  md: 16,
  // 1.5rem
  lg: 24,
  // 2rem
  xl: 32,
  // 3rem
  '2xl': 48,
  // 4rem
  '3xl': 64,
  // 6rem
  '4xl': 96,
  // 8rem
  '5xl': 128,
  // 12rem
  '6xl': 192,
} as const;

/**
 * Typography scale that adapts to different screen sizes
 */
export const TYPOGRAPHY_SCALE = {
  mobile: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  },
  tablet: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  },
  desktop: {
    xs: { fontSize: '0.75rem', lineHeight: '1rem' },
    sm: { fontSize: '0.875rem', lineHeight: '1.25rem' },
    base: { fontSize: '1rem', lineHeight: '1.5rem' },
    lg: { fontSize: '1.125rem', lineHeight: '1.75rem' },
    xl: { fontSize: '1.25rem', lineHeight: '1.75rem' },
    '2xl': { fontSize: '1.5rem', lineHeight: '2rem' },
    '3xl': { fontSize: '1.875rem', lineHeight: '2.25rem' },
    '4xl': { fontSize: '2.25rem', lineHeight: '2.5rem' },
    '5xl': { fontSize: '3rem', lineHeight: '1' },
    '6xl': { fontSize: '3.75rem', lineHeight: '1' },
  },
} as const;

/**
 * Container max widths for different breakpoints
 */
export const CONTAINER_SIZES = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Grid system configuration
 */
export const GRID_CONFIG = {
  columns: 12,
  gutter: {
    // 1rem
    mobile: 16,
    // 1.5rem
    tablet: 24,
    // 2rem
    desktop: 32,
  },
  margins: {
    // 1rem
    mobile: 16,
    // 2rem
    tablet: 32,
    // 3rem
    desktop: 48,
  },
} as const;

/**
 * Media query strings for common use cases
 */
export const MEDIA_QUERIES = {
  // Device-based queries
  mobile: `(max-width: ${BREAKPOINTS.mobile.maxWidth}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet.minWidth}px) and (max-width: ${BREAKPOINTS.tablet.maxWidth}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop.minWidth}px)`,
  wide: `(min-width: ${BREAKPOINTS.wide.minWidth}px)`,

  // Orientation queries
  landscape: '(orientation: landscape)',
  portrait: '(orientation: portrait)',

  // Feature queries
  touch: '(pointer: coarse)',
  mouse: '(pointer: fine)',
  hover: '(hover: hover)',

  // Accessibility queries
  reducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: high)',
  darkMode: '(prefers-color-scheme: dark)',
  lightMode: '(prefers-color-scheme: light)',

  // Combined queries for common patterns
  mobileAndTouch: `(max-width: ${BREAKPOINTS.mobile.maxWidth}px) and (pointer: coarse)`,
  desktopAndMouse: `(min-width: ${BREAKPOINTS.desktop.minWidth}px) and (pointer: fine)`,
  tabletAndLandscape: `(min-width: ${BREAKPOINTS.tablet.minWidth}px) and (max-width: ${BREAKPOINTS.tablet.maxWidth}px) and (orientation: landscape)`,
} as const;

/**
 * Utility functions for working with breakpoints
 */
export const breakpointUtils = {
  /**
   * Get media query string for a specific breakpoint
   */
  getMediaQuery: (breakpoint: keyof typeof BREAKPOINTS): string => {
    return BREAKPOINTS[breakpoint].mediaQuery;
  },

  /**
   * Check if a width falls within a specific breakpoint
   */
  isWithinBreakpoint: (width: number, breakpoint: keyof typeof BREAKPOINTS): boolean => {
    const bp = BREAKPOINTS[breakpoint];
    const hasMaxWidth = 'maxWidth' in bp;
    return width >= bp.minWidth && (hasMaxWidth ? width <= bp.maxWidth : true);
  },

  /**
   * Get the current breakpoint based on window width
   */
  getCurrentBreakpoint: (width: number): BreakpointName => {
    if (width >= BREAKPOINTS.wide.minWidth) return 'wide';
    if (width >= BREAKPOINTS.desktop.minWidth) return 'desktop';
    if (width >= BREAKPOINTS.tablet.minWidth) return 'tablet';
    return 'mobile';
  },

  /**
   * Generate responsive CSS custom properties
   */
  generateResponsiveProperties: () => {
    return {
      '--breakpoint-mobile': `${BREAKPOINTS.mobile.minWidth}px`,
      '--breakpoint-tablet': `${BREAKPOINTS.tablet.minWidth}px`,
      '--breakpoint-desktop': `${BREAKPOINTS.desktop.minWidth}px`,
      '--breakpoint-wide': `${BREAKPOINTS.wide.minWidth}px`,
      '--touch-target-min': `${TOUCH_TARGETS.minimum.size}px`,
      '--touch-target-recommended': `${TOUCH_TARGETS.recommended.size}px`,
      '--container-sm': `${CONTAINER_SIZES.sm}px`,
      '--container-md': `${CONTAINER_SIZES.md}px`,
      '--container-lg': `${CONTAINER_SIZES.lg}px`,
      '--container-xl': `${CONTAINER_SIZES.xl}px`,
      '--container-2xl': `${CONTAINER_SIZES['2xl']}px`,
    };
  },
};

/**
 * Type definitions for breakpoint-related types
 */
export type BreakpointName = keyof typeof BREAKPOINTS;
export type BreakpointValue = (typeof BREAKPOINT_VALUES)[keyof typeof BREAKPOINT_VALUES];
export type SpacingKey = keyof typeof SPACING_SCALE;
export type TouchTargetSize = (typeof TOUCH_TARGETS)[keyof typeof TOUCH_TARGETS];
export type MediaQueryKey = keyof typeof MEDIA_QUERIES;

export default BREAKPOINTS;
