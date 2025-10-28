'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ThemeMode,
  ThemeContextValue,
  ThemeProviderProps,
  defaultThemeStorage,
} from '@/lib/types/theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook to use theme context
 * Throws error if used outside ThemeProvider
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

/**
 * Theme Provider Component
 *
 * Provides theme state management with localStorage persistence
 * and system preference detection. Supports light, dark, and system modes.
 */
// Helper function to initialize theme from storage and system preferences
function useThemeInitialization(
  defaultTheme: ThemeMode,
  storageKey: string,
  setThemeState: (theme: ThemeMode) => void,
  setSystemTheme: (theme: 'light' | 'dark') => void,
  setIsLoading: (loading: boolean) => void
) {
  useEffect(() => {
    const initializeTheme = () => {
      try {
        const storedTheme = defaultThemeStorage.getItem(storageKey) as ThemeMode;
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemPreference = mediaQuery.matches ? 'dark' : 'light';
        setSystemTheme(systemPreference);

        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
          setThemeState(storedTheme);
        } else {
          setThemeState(defaultTheme);
        }

        setIsLoading(false);
      } catch (error) {
        console.warn('Failed to initialize theme:', error);
        setThemeState(defaultTheme);
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, [defaultTheme, storageKey, setThemeState, setSystemTheme, setIsLoading]);
}

// Helper function to listen for system theme changes
function useSystemThemeListener(
  enableSystem: boolean,
  setSystemTheme: (theme: 'light' | 'dark') => void
) {
  useEffect(() => {
    if (!enableSystem) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [enableSystem, setSystemTheme]);
}

// Helper function to apply theme to document
function useThemeApplication(
  resolvedTheme: 'light' | 'dark',
  attribute: string,
  value: Record<string, string> | undefined,
  disableTransitionOnChange: boolean,
  isLoading: boolean
) {
  useEffect(() => {
    if (isLoading) return;

    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (!disableTransitionOnChange) {
      root.classList.add('theme-transition');
    }

    if (attribute === 'class') {
      root.classList.add(resolvedTheme);
    } else if (attribute === 'data-theme') {
      root.setAttribute('data-theme', resolvedTheme);
    }

    if (value) {
      const themeValue = value[resolvedTheme];
      if (themeValue && attribute === 'data-theme') {
        root.setAttribute('data-theme', themeValue);
      }
    }

    if (!disableTransitionOnChange) {
      const timeoutId = setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [resolvedTheme, attribute, value, disableTransitionOnChange, isLoading]);
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'portfolio-theme',
  enableSystem = true,
  disableTransitionOnChange = false,
  attribute = 'class',
  value,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(defaultTheme);
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');
  const [isLoading, setIsLoading] = useState(true);

  const resolvedTheme = theme === 'system' ? systemTheme : theme;

  useThemeInitialization(defaultTheme, storageKey, setThemeState, setSystemTheme, setIsLoading);
  useSystemThemeListener(enableSystem, setSystemTheme);
  useThemeApplication(resolvedTheme, attribute, value, disableTransitionOnChange, isLoading);

  const setTheme = (newTheme: ThemeMode) => {
    try {
      setThemeState(newTheme);
      defaultThemeStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to storage:', error);
      setThemeState(newTheme);
    }
  };

  const toggleTheme = () => {
    if (theme === 'system') {
      setTheme(systemTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  const contextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    systemTheme,
    resolvedTheme,
    isLoading,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

/**
 * Theme Toggle Button Component
 * Pre-built component for theme switching with accessibility
 */
interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  showLabel?: boolean;
}

// Helper function to get theme toggle classes
function getThemeToggleClasses(size: 'sm' | 'md' | 'lg', variant: 'default' | 'outline' | 'ghost') {
  const sizeClasses = {
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
  };

  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    outline: 'border border-border hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };

  return { sizeClasses: sizeClasses[size], variantClasses: variantClasses[variant] };
}

// Helper function to render theme icon
function ThemeIcon({ isDark }: { isDark: boolean }) {
  const iconProps = {
    className: 'h-4 w-4',
    fill: 'none',
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
    'aria-hidden': 'true' as const,
  };

  if (isDark) {
    return (
      <svg {...iconProps}>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
        />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
      />
    </svg>
  );
}

export function ThemeToggle({
  className = '',
  size = 'md',
  variant = 'ghost',
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, toggleTheme, resolvedTheme, isLoading } = useThemeContext();
  const { sizeClasses, variantClasses } = getThemeToggleClasses(size, variant);

  if (isLoading) {
    return (
      <div
        className={`${sizeClasses} ${variantClasses} ${className} animate-pulse rounded-md`}
        aria-label='Loading theme toggle'
      />
    );
  }

  const isDark = resolvedTheme === 'dark';
  const label =
    theme === 'system' ? `System (${resolvedTheme})` : theme === 'dark' ? 'Dark' : 'Light';

  return (
    <button
      onClick={toggleTheme}
      className={` ${sizeClasses} ${variantClasses} ${className} focus-visible:ring-ring touch-target inline-flex items-center justify-center rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50`}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Current theme: ${label}`}
    >
      <ThemeIcon isDark={isDark} />
      {showLabel && <span className='ml-2 text-sm font-medium'>{label}</span>}
    </button>
  );
}

export default ThemeProvider;
