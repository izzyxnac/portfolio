'use client';

import { useEffect, useState } from 'react';
import {
  BREAKPOINTS,
  MEDIA_QUERIES,
  breakpointUtils,
  type BreakpointName,
  type MediaQueryKey,
} from '@/lib/constants/breakpoints';

/**
 * Custom hook for responsive media queries
 *
 * Provides reactive breakpoint detection and media query matching
 * with SSR-safe initialization and cleanup
 */

interface UseMediaQueryOptions {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
}

/**
 * Hook to match a media query string
 */
export function useMediaQuery(query: string, options: UseMediaQueryOptions = {}): boolean {
  const { defaultValue = false, initializeWithValue = true } = options;

  const [matches, setMatches] = useState(() => {
    if (!initializeWithValue) return defaultValue;

    // SSR-safe initialization
    if (typeof window === 'undefined') return defaultValue;

    try {
      return window.matchMedia(query).matches;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let mediaQuery: MediaQueryList;

    try {
      mediaQuery = window.matchMedia(query);
    } catch {
      // Invalid media query, keep default value
      return;
    }

    // Set initial value if not initialized
    if (!initializeWithValue) {
      setMatches(mediaQuery.matches);
    }

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Use addEventListener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [query, initializeWithValue]);

  return matches;
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint(): BreakpointName {
  const [breakpoint, setBreakpoint] = useState<BreakpointName>('mobile');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const currentBreakpoint = breakpointUtils.getCurrentBreakpoint(width);
      setBreakpoint(currentBreakpoint);
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Listen for resize events
    const handleResize = () => {
      updateBreakpoint();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook to check if current viewport matches a specific breakpoint
 */
export function useBreakpointMatch(breakpoint: BreakpointName): boolean {
  const mediaQuery = breakpointUtils.getMediaQuery(breakpoint);
  return useMediaQuery(mediaQuery);
}

/**
 * Hook to get multiple breakpoint matches
 */
export function useBreakpoints() {
  const isMobile = useMediaQuery(MEDIA_QUERIES.mobile);
  const isTablet = useMediaQuery(MEDIA_QUERIES.tablet);
  const isDesktop = useMediaQuery(MEDIA_QUERIES.desktop);
  const isWide = useMediaQuery(MEDIA_QUERIES.wide);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isWide,
    current: useBreakpoint(),
  };
}

/**
 * Hook for device and interaction capabilities
 */
export function useDeviceCapabilities() {
  const hasTouch = useMediaQuery(MEDIA_QUERIES.touch);
  const hasMouse = useMediaQuery(MEDIA_QUERIES.mouse);
  const canHover = useMediaQuery(MEDIA_QUERIES.hover);
  const isLandscape = useMediaQuery(MEDIA_QUERIES.landscape);
  const isPortrait = useMediaQuery(MEDIA_QUERIES.portrait);

  return {
    hasTouch,
    hasMouse,
    canHover,
    isLandscape,
    isPortrait,
    // Derived capabilities
    isTouchDevice: hasTouch && !hasMouse,
    isDesktopDevice: hasMouse && canHover,
    isHybridDevice: hasTouch && hasMouse,
  };
}

/**
 * Hook for accessibility preferences
 */
export function useAccessibilityPreferences() {
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERIES.reducedMotion);
  const prefersHighContrast = useMediaQuery(MEDIA_QUERIES.highContrast);
  const prefersDarkMode = useMediaQuery(MEDIA_QUERIES.darkMode);
  const prefersLightMode = useMediaQuery(MEDIA_QUERIES.lightMode);

  return {
    prefersReducedMotion,
    prefersHighContrast,
    prefersDarkMode,
    prefersLightMode,
    systemTheme: prefersDarkMode ? 'dark' : 'light',
  };
}

/**
 * Hook to get window dimensions
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState(() => {
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Hook for responsive values based on breakpoints
 */
export function useResponsiveValue<T>(values: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  wide?: T;
  default: T;
}): T {
  const { isMobile, isTablet, isDesktop, isWide } = useBreakpoints();

  if (isWide && values.wide !== undefined) return values.wide;
  if (isDesktop && values.desktop !== undefined) return values.desktop;
  if (isTablet && values.tablet !== undefined) return values.tablet;
  if (isMobile && values.mobile !== undefined) return values.mobile;

  return values.default;
}

/**
 * Hook to check if viewport is above a certain breakpoint
 */
export function useBreakpointUp(breakpoint: BreakpointName): boolean {
  const breakpointValue = BREAKPOINTS[breakpoint].minWidth;
  return useMediaQuery(`(min-width: ${breakpointValue}px)`);
}

/**
 * Hook to check if viewport is below a certain breakpoint
 */
export function useBreakpointDown(breakpoint: BreakpointName): boolean {
  const bp = BREAKPOINTS[breakpoint];
  const hasMaxWidth = 'maxWidth' in bp;
  const breakpointValue = hasMaxWidth ? bp.maxWidth : 9999;

  return useMediaQuery(`(max-width: ${breakpointValue}px)`) && hasMaxWidth;
}

/**
 * Hook to check if viewport is between two breakpoints
 */
export function useBreakpointBetween(
  minBreakpoint: BreakpointName,
  maxBreakpoint: BreakpointName
): boolean {
  const minValue = BREAKPOINTS[minBreakpoint].minWidth;
  const maxBp = BREAKPOINTS[maxBreakpoint];
  const hasMaxWidth = 'maxWidth' in maxBp;
  const maxValue = hasMaxWidth ? maxBp.maxWidth : 9999;

  // Always call useMediaQuery to maintain hook order
  const minQuery = useMediaQuery(`(min-width: ${minValue}px)`);
  const betweenQuery = useMediaQuery(`(min-width: ${minValue}px) and (max-width: ${maxValue}px)`);

  return hasMaxWidth ? betweenQuery : minQuery;
}

/**
 * Hook for predefined media query keys
 */
export function useMediaQueries(queries: MediaQueryKey[]) {
  const results: Record<string, boolean> = {};

  // Create stable array of queries to avoid hook order issues
  const stableQueries = [...queries].sort();

  stableQueries.forEach(queryKey => {
    // This is safe because we're using a stable, sorted array
    // eslint-disable-next-line react-hooks/rules-of-hooks
    results[queryKey] = useMediaQuery(MEDIA_QUERIES[queryKey]);
  });

  return results as Record<MediaQueryKey, boolean>;
}

/**
 * Hook to get container query information
 */
export function useContainerQuery(containerRef: React.RefObject<HTMLElement>) {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerSize({ width, height });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return {
    ...containerSize,
    breakpoint: breakpointUtils.getCurrentBreakpoint(containerSize.width),
  };
}

/**
 * Hook for orientation changes
 */
export function useOrientation() {
  const isLandscape = useMediaQuery('(orientation: landscape)');
  const isPortrait = useMediaQuery('(orientation: portrait)');

  return {
    isLandscape,
    isPortrait,
    orientation: isLandscape ? 'landscape' : 'portrait',
  };
}

export default useMediaQuery;
