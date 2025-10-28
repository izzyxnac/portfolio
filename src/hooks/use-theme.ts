'use client';

import { useEffect, useState } from 'react';
import { ThemeMode, UseThemeReturn, defaultThemeStorage } from '@/lib/types/theme';

// Import the theme context (we'll need to export it from theme-provider)
import { useThemeContext } from '@/components/layout/theme-provider';

/**
 * Custom hook for theme management
 *
 * Provides theme state and controls with localStorage persistence
 * Can be used with or without ThemeProvider context
 */
export function useTheme(): UseThemeReturn {
  // Always call hooks in the same order
  const standaloneTheme = useStandaloneTheme();

  try {
    // Try to use context first (preferred method)
    const contextTheme = useThemeContext();
    return contextTheme;
  } catch {
    // Fallback to standalone implementation if no context
    return standaloneTheme;
  }
}

/**
 * Standalone theme hook implementation
 * Used when ThemeProvider is not available in the component tree
 */
function useStandaloneTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<ThemeMode>('system');
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(true);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  // Initialize theme from localStorage and system preferences
  useEffect(() => {
    const initializeTheme = () => {
      try {
        // Get stored theme
        const storedTheme = defaultThemeStorage.getItem('portfolio-theme') as ThemeMode;

        // Get system preference
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemPreference = mediaQuery.matches ? 'dark' : 'light';
        setSystemTheme(systemPreference);

        // Set initial theme
        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
          setThemeState(storedTheme);
        } else {
          setThemeState('system');
        }

        setIsLoading(false);
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        setThemeState('system');
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isLoading) return;

    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(resolvedTheme);
  }, [resolvedTheme, isLoading]);

  // Set theme function with localStorage persistence
  const setTheme = (newTheme: ThemeMode) => {
    try {
      setThemeState(newTheme);
      defaultThemeStorage.setItem('portfolio-theme', newTheme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
      setThemeState(newTheme);
    }
  };

  // Toggle between light and dark themes
  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return {
    theme,
    setTheme,
    toggleTheme,
    systemTheme,
    resolvedTheme,
    isLoading,
  };
}

/**
 * Hook to get current theme colors
 * Returns computed CSS custom properties for the current theme
 */
export function useThemeColors() {
  const { resolvedTheme } = useTheme();
  const [colors, setColors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateColors = () => {
      const root = window.document.documentElement;
      const computedStyle = window.getComputedStyle(root);

      const themeColors = {
        background: computedStyle.getPropertyValue('--background').trim(),
        foreground: computedStyle.getPropertyValue('--foreground').trim(),
        surface: computedStyle.getPropertyValue('--surface').trim(),
        surfaceVariant: computedStyle.getPropertyValue('--surface-variant').trim(),
        primary: computedStyle.getPropertyValue('--primary').trim(),
        primaryForeground: computedStyle.getPropertyValue('--primary-foreground').trim(),
        primaryHover: computedStyle.getPropertyValue('--primary-hover').trim(),
        secondary: computedStyle.getPropertyValue('--secondary').trim(),
        secondaryForeground: computedStyle.getPropertyValue('--secondary-foreground').trim(),
        secondaryHover: computedStyle.getPropertyValue('--secondary-hover').trim(),
        accent: computedStyle.getPropertyValue('--accent').trim(),
        accentForeground: computedStyle.getPropertyValue('--accent-foreground').trim(),
        accentHover: computedStyle.getPropertyValue('--accent-hover').trim(),
        success: computedStyle.getPropertyValue('--success').trim(),
        successForeground: computedStyle.getPropertyValue('--success-foreground').trim(),
        warning: computedStyle.getPropertyValue('--warning').trim(),
        warningForeground: computedStyle.getPropertyValue('--warning-foreground').trim(),
        error: computedStyle.getPropertyValue('--error').trim(),
        errorForeground: computedStyle.getPropertyValue('--error-foreground').trim(),
        info: computedStyle.getPropertyValue('--info').trim(),
        infoForeground: computedStyle.getPropertyValue('--info-foreground').trim(),
        border: computedStyle.getPropertyValue('--border').trim(),
        borderHover: computedStyle.getPropertyValue('--border-hover').trim(),
        input: computedStyle.getPropertyValue('--input').trim(),
        inputFocus: computedStyle.getPropertyValue('--input-focus').trim(),
        ring: computedStyle.getPropertyValue('--ring').trim(),
        textPrimary: computedStyle.getPropertyValue('--text-primary').trim(),
        textSecondary: computedStyle.getPropertyValue('--text-secondary').trim(),
        textMuted: computedStyle.getPropertyValue('--text-muted').trim(),
        textDisabled: computedStyle.getPropertyValue('--text-disabled').trim(),
        card: computedStyle.getPropertyValue('--card').trim(),
        cardForeground: computedStyle.getPropertyValue('--card-foreground').trim(),
        popover: computedStyle.getPropertyValue('--popover').trim(),
        popoverForeground: computedStyle.getPropertyValue('--popover-foreground').trim(),
        muted: computedStyle.getPropertyValue('--muted').trim(),
        mutedForeground: computedStyle.getPropertyValue('--muted-foreground').trim(),
      };

      setColors(themeColors);
    };

    // Update colors initially
    updateColors();

    // Update colors when theme changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          (mutation.attributeName === 'class' || mutation.attributeName === 'data-theme')
        ) {
          updateColors();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, [resolvedTheme]);

  return colors;
}

/**
 * Hook to check if current theme is dark
 */
export function useIsDarkTheme(): boolean {
  const { resolvedTheme } = useTheme();
  return resolvedTheme === 'dark';
}

/**
 * Hook to get theme-aware CSS classes
 * Returns classes that adapt to the current theme
 */
export function useThemeClasses() {
  const { resolvedTheme } = useTheme();

  return {
    // Background classes
    background: resolvedTheme === 'dark' ? 'bg-background' : 'bg-background',
    surface: resolvedTheme === 'dark' ? 'bg-surface' : 'bg-surface',
    surfaceVariant: resolvedTheme === 'dark' ? 'bg-surface-variant' : 'bg-surface-variant',

    // Text classes
    textPrimary: 'text-hierarchy-primary',
    textSecondary: 'text-hierarchy-secondary',
    textMuted: 'text-hierarchy-muted',
    textDisabled: 'text-hierarchy-disabled',

    // Border classes
    border: 'border-border',
    borderHover: 'hover:border-border-hover',

    // Interactive classes
    interactive: 'interactive-hover',
    touchTarget: 'touch-target',
    touchTargetRecommended: 'touch-target-recommended',

    // Transition classes
    transition: 'theme-transition',
  };
}

/**
 * Hook for theme-aware animations
 * Respects user's reduced motion preferences
 */
export function useThemeAnimations() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    prefersReducedMotion,
    duration: {
      fast: prefersReducedMotion ? '0ms' : '150ms',
      normal: prefersReducedMotion ? '0ms' : '300ms',
      slow: prefersReducedMotion ? '0ms' : '500ms',
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      bounce: prefersReducedMotion
        ? 'cubic-bezier(0.4, 0, 0.2, 1)'
        : 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  };
}

export default useTheme;
