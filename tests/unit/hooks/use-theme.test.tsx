import { renderHook, act, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import {
  useTheme,
  useThemeColors,
  useIsDarkTheme,
  useThemeClasses,
  useThemeAnimations,
} from '@/hooks/use-theme';
import { ThemeProvider } from '@/components/layout/theme-provider';

describe('useTheme Hook - Context Mode', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock matchMedia
    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
    vi.mocked(window.localStorage.setItem).mockImplementation(() => {});
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  describe('with ThemeProvider context', () => {
    it('returns theme context values', async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.theme).toBe('system');
      expect(result.current.resolvedTheme).toBe('dark');
      expect(result.current.systemTheme).toBe('dark');
      expect(typeof result.current.setTheme).toBe('function');
      expect(typeof result.current.toggleTheme).toBe('function');
    });

    it('allows setting theme', async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.setTheme('light');
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
      expect(vi.mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
        'portfolio-theme',
        'light'
      );
    });

    it('allows toggling theme', async () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.toggleTheme();
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
    });
  });
});

describe('useTheme Hook - Standalone Mode', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock matchMedia
    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
    vi.mocked(window.localStorage.setItem).mockImplementation(() => {});
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  describe('standalone mode (without context)', () => {
    it('works without ThemeProvider', async () => {
      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.theme).toBe('system');
      expect(result.current.systemTheme).toBe('dark');
      expect(result.current.resolvedTheme).toBe('dark');
    });

    it('loads theme from localStorage in standalone mode', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('light');

      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.theme).toBe('light');
      expect(result.current.resolvedTheme).toBe('light');
      expect(vi.mocked(window.localStorage.getItem)).toHaveBeenCalledWith('portfolio-theme');
    });

    it('handles localStorage errors in standalone mode', async () => {
      vi.mocked(window.localStorage.getItem).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.theme).toBe('system');
      expect(consoleSpy).toHaveBeenCalledWith('Failed to initialize theme:', expect.any(Error));

      consoleSpy.mockRestore();
    });
  });
});

describe('useTheme Hook - System Changes', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock matchMedia
    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-color-scheme: dark)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });

    vi.mocked(window.localStorage.getItem).mockReturnValue(null);
    vi.mocked(window.localStorage.setItem).mockImplementation(() => {});
  });

  afterEach(() => {
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  describe('System Theme Detection', () => {
    it('detects system theme changes in standalone mode', async () => {
      let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

      mockMatchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn((event, listener) => {
          if (event === 'change') {
            mediaQueryListener = listener;
          }
        }),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.systemTheme).toBe('dark');

      // Simulate system theme change
      if (mediaQueryListener) {
        act(() => {
          mediaQueryListener({ matches: false } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(result.current.systemTheme).toBe('light');
      });
    });

    it('applies theme to document in standalone mode', async () => {
      const { result } = renderHook(() => useTheme());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.setTheme('light');
      });

      await waitFor(() => {
        expect(document.documentElement).toHaveClass('light');
        expect(document.documentElement).not.toHaveClass('dark');
      });
    });
  });
});

describe('useThemeColors Hook', () => {
  beforeEach(() => {
    // Mock getComputedStyle
    Object.defineProperty(window, 'getComputedStyle', {
      value: vi.fn(() => ({
        getPropertyValue: vi.fn((prop: string) => {
          const colorMap: Record<string, string> = {
            '--background': '0 0% 100%',
            '--foreground': '240 10% 3.9%',
            '--primary': '240 5.9% 10%',
            '--primary-foreground': '0 0% 98%',
          };
          return colorMap[prop] || '';
        }),
      })),
    });

    // Mock MutationObserver
    global.MutationObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
  });

  it('returns theme colors', async () => {
    const { result } = renderHook(() => useThemeColors());

    await waitFor(() => {
      expect(result.current.background).toBe('0 0% 100%');
      expect(result.current.foreground).toBe('240 10% 3.9%');
      expect(result.current.primary).toBe('240 5.9% 10%');
    });
  });
});

describe('useIsDarkTheme Hook', () => {
  it('returns true for dark theme', async () => {
    const { result } = renderHook(() => useIsDarkTheme(), {
      wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });

  it('returns false for light theme', async () => {
    const { result } = renderHook(() => useIsDarkTheme(), {
      wrapper: ({ children }) => <ThemeProvider defaultTheme='light'>{children}</ThemeProvider>,
    });

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });
});

describe('useThemeClasses Hook', () => {
  it('returns theme-aware CSS classes', () => {
    const { result } = renderHook(() => useThemeClasses());

    expect(result.current.background).toBe('bg-background');
    expect(result.current.surface).toBe('bg-surface');
    expect(result.current.textPrimary).toBe('text-hierarchy-primary');
    expect(result.current.border).toBe('border-border');
    expect(result.current.interactive).toBe('interactive-hover');
    expect(result.current.touchTarget).toBe('touch-target');
    expect(result.current.transition).toBe('theme-transition');
  });
});

describe('useThemeAnimations Hook', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  it('returns normal animation durations when motion is not reduced', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useThemeAnimations());

    expect(result.current.prefersReducedMotion).toBe(false);
    expect(result.current.duration.fast).toBe('150ms');
    expect(result.current.duration.normal).toBe('300ms');
    expect(result.current.duration.slow).toBe('500ms');
    expect(result.current.easing.bounce).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)');
  });
});

describe('useThemeAnimations Hook - Reduced Motion', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockMatchMedia = vi.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: mockMatchMedia,
    });
  });

  it('returns reduced animation durations when motion is reduced', () => {
    mockMatchMedia.mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useThemeAnimations());

    expect(result.current.prefersReducedMotion).toBe(true);
    expect(result.current.duration.fast).toBe('0ms');
    expect(result.current.duration.normal).toBe('0ms');
    expect(result.current.duration.slow).toBe('0ms');
    expect(result.current.easing.bounce).toBe('cubic-bezier(0.4, 0, 0.2, 1)');
  });

  it('listens for reduced motion preference changes', async () => {
    let mediaQueryListener: ((e: MediaQueryListEvent) => void) | null = null;

    mockMatchMedia.mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn((event, listener) => {
        if (event === 'change') {
          mediaQueryListener = listener;
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => useThemeAnimations());

    expect(result.current.prefersReducedMotion).toBe(false);

    // Simulate preference change
    if (mediaQueryListener) {
      act(() => {
        mediaQueryListener({ matches: true } as MediaQueryListEvent);
      });
    }

    await waitFor(() => {
      expect(result.current.prefersReducedMotion).toBe(true);
    });
  });
});
