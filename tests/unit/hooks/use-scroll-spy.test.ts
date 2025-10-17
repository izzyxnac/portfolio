import { renderHook } from '@testing-library/react';
import { useScrollSpy, useSmootScroll } from '@/hooks/use-scroll-spy';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});

// Mock window.scrollTo
const mockScrollTo = vi.fn();

beforeAll(() => {
  window.IntersectionObserver = mockIntersectionObserver;
  window.scrollTo = mockScrollTo;
});

describe('useScrollSpy Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock DOM elements
    document.getElementById = vi.fn(id => {
      const mockElement = {
        id,
        offsetTop: id === 'section1' ? 100 : 200,
      } as HTMLElement;
      return mockElement;
    });
  });

  it('initializes with empty active section', () => {
    const { result } = renderHook(() => useScrollSpy({ sectionIds: ['section1', 'section2'] }));

    expect(result.current).toBe('');
  });

  it('creates IntersectionObserver with correct options', () => {
    renderHook(() =>
      useScrollSpy({
        sectionIds: ['section1', 'section2'],
        rootMargin: '-10% 0px -90% 0px',
        threshold: 0.5,
      })
    );

    expect(mockIntersectionObserver).toHaveBeenCalledWith(expect.any(Function), {
      rootMargin: '-10% 0px -90% 0px',
      threshold: 0.5,
    });
  });

  it('observes all section elements', () => {
    const mockObserve = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });

    renderHook(() => useScrollSpy({ sectionIds: ['section1', 'section2'] }));

    expect(mockObserve).toHaveBeenCalledTimes(2);
  });

  it('handles non-existent elements gracefully', () => {
    document.getElementById = vi.fn(() => null);

    const mockObserve = vi.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: mockObserve,
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    });

    renderHook(() => useScrollSpy({ sectionIds: ['nonexistent'] }));

    expect(mockObserve).not.toHaveBeenCalled();
  });
});

describe('useSmootScroll Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    document.getElementById = vi.fn(
      id =>
        ({
          id,
          offsetTop: id === 'section1' ? 100 : 200,
        }) as HTMLElement
    );
  });

  it('scrolls to section with header offset', () => {
    const { result } = renderHook(() => useSmootScroll());

    result.current.scrollToSection('section1');

    // 100 - 80 (header height)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 20,
      behavior: 'smooth',
    });
  });

  it('scrolls to top', () => {
    const { result } = renderHook(() => useSmootScroll());

    result.current.scrollToTop();

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('handles non-existent section gracefully', () => {
    document.getElementById = vi.fn(() => null);

    const { result } = renderHook(() => useSmootScroll());

    result.current.scrollToSection('nonexistent');

    expect(mockScrollTo).not.toHaveBeenCalled();
  });

  it('calculates correct position for different sections', () => {
    const { result } = renderHook(() => useSmootScroll());

    result.current.scrollToSection('section2');

    // 200 - 80 (header height)
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 120,
      behavior: 'smooth',
    });
  });
});
