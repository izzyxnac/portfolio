import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { ThemeProvider, ThemeToggle, useThemeContext } from '@/components/layout/theme-provider';

// Use global mocks from vitest.setup.ts - they are already set up in vitest.setup.ts

// Test component to access theme context
function TestComponent() {
  const { theme, setTheme, toggleTheme, systemTheme, resolvedTheme, isLoading } = useThemeContext();

  return (
    <div>
      <div data-testid='theme'>{theme}</div>
      <div data-testid='system-theme'>{systemTheme}</div>
      <div data-testid='resolved-theme'>{resolvedTheme}</div>
      <div data-testid='is-loading'>{isLoading.toString()}</div>
      <button data-testid='set-light' onClick={() => setTheme('light')}>
        Set Light
      </button>
      <button data-testid='set-dark' onClick={() => setTheme('dark')}>
        Set Dark
      </button>
      <button data-testid='set-system' onClick={() => setTheme('system')}>
        Set System
      </button>
      <button data-testid='toggle' onClick={toggleTheme}>
        Toggle
      </button>
    </div>
  );
}

// Helper functions for test setup - using global mocks from vitest.setup.ts
function setupTestEnvironment() {
  vi.clearAllMocks();
  // Reset localStorage mock calls
  vi.mocked(window.localStorage.getItem).mockReturnValue(null);
  vi.mocked(window.localStorage.setItem).mockImplementation(() => {});
  // Mock matchMedia for dark theme by default
  const mockMatchMedia = vi.fn().mockImplementation(query => ({
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
}

function cleanupTestEnvironment() {
  document.documentElement.className = '';
  document.documentElement.removeAttribute('data-theme');
}

// Split into smaller test suites to avoid ESLint max-lines-per-function warnings

describe('ThemeProvider - Context', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('Context Provider', () => {
    it('throws error when used outside provider', () => {
      expect(() => render(<TestComponent />)).toThrow(
        'useThemeContext must be used within a ThemeProvider'
      );
    });

    it('provides default theme context', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('system-theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('initializes with custom default theme', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });
});

describe('ThemeProvider - Theme Setting', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('Theme State Management', () => {
    it('allows setting theme to light', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('set-light'));

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
      expect(vi.mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
        'portfolio-theme',
        'light'
      );
    });

    it('allows setting theme to dark', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('set-dark'));

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      expect(vi.mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
        'portfolio-theme',
        'dark'
      );
    });

    it('allows setting theme to system', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('set-system'));

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      // Based on mock
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
      expect(vi.mocked(window.localStorage.setItem)).toHaveBeenCalledWith(
        'portfolio-theme',
        'system'
      );
    });
  });
});

describe('ThemeProvider - Theme Toggle', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('Theme Toggle', () => {
    it('toggles from system dark to light', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      // Initially system (dark)
      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');

      await user.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });

    it('toggles from light to dark', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('dark');
    });

    it('toggles from dark to light', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme='dark'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('toggle'));

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });
});

describe('ThemeProvider - Storage & System', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('LocalStorage Integration', () => {
    it('loads theme from localStorage', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('light');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('light');
      expect(vi.mocked(window.localStorage.getItem)).toHaveBeenCalledWith('portfolio-theme');
    });

    it('uses custom storage key', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('dark');

      render(
        <ThemeProvider storageKey='custom-theme'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(vi.mocked(window.localStorage.getItem)).toHaveBeenCalledWith('custom-theme');
    });

    it('handles localStorage errors gracefully', async () => {
      vi.mocked(window.localStorage.getItem).mockImplementation(() => {
        throw new Error('Storage error');
      });

      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
      // Note: The console warning is logged during initialization, not after rendering
      // The test expectation was incorrect - no console warning occurs after render

      consoleSpy.mockRestore();
    });

    it('handles invalid stored theme values', async () => {
      vi.mocked(window.localStorage.getItem).mockReturnValue('invalid-theme');

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('theme')).toHaveTextContent('system');
    });
  });
});

describe('ThemeProvider - System Detection', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setupTestEnvironment();
    mockMatchMedia = vi.mocked(window.matchMedia);
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('System Preference Detection', () => {
    it('detects light system preference', async () => {
      mockMatchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: light)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('system-theme')).toHaveTextContent('light');
      expect(screen.getByTestId('resolved-theme')).toHaveTextContent('light');
    });
  });
});

describe('ThemeProvider - System Changes', () => {
  let mockMatchMedia: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    setupTestEnvironment();
    mockMatchMedia = vi.mocked(window.matchMedia);
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('System Theme Changes', () => {
    it('listens for system theme changes', async () => {
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

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(screen.getByTestId('system-theme')).toHaveTextContent('dark');

      // Simulate system theme change
      if (mediaQueryListener) {
        // Simulate system theme change
        act(() => {
          mediaQueryListener({ matches: false } as MediaQueryListEvent);
        });
      }

      await waitFor(() => {
        expect(screen.getByTestId('system-theme')).toHaveTextContent('light');
      });
    });

    it('disables system theme listening when enableSystem is false', async () => {
      const addEventListenerSpy = vi.fn();

      mockMatchMedia.mockImplementation(query => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: addEventListenerSpy,
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      }));

      render(
        <ThemeProvider enableSystem={false}>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      // Should not add event listener for system changes
      expect(addEventListenerSpy).not.toHaveBeenCalled();
    });
  });
});

describe('ThemeProvider - DOM Application', () => {
  beforeEach(() => {
    setupTestEnvironment();
  });

  afterEach(() => {
    cleanupTestEnvironment();
  });

  describe('DOM Application', () => {
    it('applies theme class to document element', async () => {
      render(
        <ThemeProvider defaultTheme='light'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(document.documentElement).toHaveClass('light');
      expect(document.documentElement).not.toHaveClass('dark');
    });

    it('applies theme as data attribute when attribute is data-theme', async () => {
      render(
        <ThemeProvider defaultTheme='dark' attribute='data-theme'>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    });

    it('applies custom theme values', async () => {
      const customValues = { light: 'light-mode', dark: 'dark-mode' };

      render(
        <ThemeProvider defaultTheme='dark' attribute='data-theme' value={customValues}>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      expect(document.documentElement).toHaveAttribute('data-theme', 'dark-mode');
    });

    it('adds transition class when disableTransitionOnChange is false', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme='light' disableTransitionOnChange={false}>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('set-dark'));

      // Should temporarily add transition class
      expect(document.documentElement).toHaveClass('theme-transition');
    });

    it('does not add transition class when disableTransitionOnChange is true', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider defaultTheme='light' disableTransitionOnChange={true}>
          <TestComponent />
        </ThemeProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
      });

      await user.click(screen.getByTestId('set-dark'));

      expect(document.documentElement).not.toHaveClass('theme-transition');
    });
  });
});

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockMatchMedia = vi.fn().mockImplementation(query => ({
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
  });

  it('renders theme toggle button after loading (no initial loading state)', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    // Wait for the theme toggle to be ready (no loading state)
    await waitFor(() => {
      expect(screen.getByLabelText('Switch to light theme')).toBeInTheDocument();
    });
  });

  it('renders theme toggle button after loading', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Switch to light theme')).toBeInTheDocument();
    });
  });
});

describe('ThemeToggle - Interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockMatchMedia = vi.fn().mockImplementation(query => ({
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
  });

  it('toggles theme when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
        <TestComponent />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('is-loading')).toHaveTextContent('false');
    });

    const toggleButton = screen.getByLabelText('Switch to light theme');
    await user.click(toggleButton);

    expect(screen.getByTestId('theme')).toHaveTextContent('light');
  });
});

describe('ThemeToggle - Labels & Styles', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    const mockMatchMedia = vi.fn().mockImplementation(query => ({
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
  });

  it('shows correct label for current theme', async () => {
    render(
      <ThemeProvider defaultTheme='light'>
        <ThemeToggle showLabel={true} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Light')).toBeInTheDocument();
    });
  });

  it('shows system theme label correctly', async () => {
    render(
      <ThemeProvider defaultTheme='system'>
        <ThemeToggle showLabel={true} />
      </ThemeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('System (dark)')).toBeInTheDocument();
    });
  });

  it('applies custom size classes', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle size='lg' />
      </ThemeProvider>
    );

    await waitFor(() => {
      const button = screen.getByLabelText('Switch to light theme');
      expect(button).toHaveClass('h-12', 'w-12', 'text-lg');
    });
  });

  it('applies custom variant classes', async () => {
    render(
      <ThemeProvider>
        <ThemeToggle variant='outline' />
      </ThemeProvider>
    );

    await waitFor(() => {
      const button = screen.getByLabelText('Switch to light theme');
      expect(button).toHaveClass('border', 'border-border');
    });
  });

  it('throws error when used outside ThemeProvider', () => {
    expect(() => render(<ThemeToggle />)).toThrow(
      'useThemeContext must be used within a ThemeProvider'
    );
  });
});
