import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Home from '@/app/page';
import { heroData } from '@/data';

// Mock window.matchMedia for testing environment
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    // Deprecated methods for older browser support
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: React.ComponentProps<'section'>) => (
      <section {...props}>{children}</section>
    ),
    p: ({ children, ...props }: React.ComponentProps<'p'>) => <p {...props}>{children}</p>,
    canvas: ({ children, ...props }: React.ComponentProps<'canvas'>) => (
      <canvas {...props}>{children}</canvas>
    ),
    span: ({ children, ...props }: React.ComponentProps<'span'>) => (
      <span {...props}>{children}</span>
    ),
  },
}));

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...props} />
  ),
}));

// Mock the particle background component
vi.mock('@/components/sections/hero/particles', () => ({
  ParticleBackground: () => <div data-testid='particle-background' />,
}));

// Mock the typing animation component
vi.mock('@/components/sections/hero/animations', () => ({
  TypingAnimation: ({ skills }: { skills: string[] }) => (
    <div data-testid='typing-animation'>{skills.join(' • ')}</div>
  ),
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the hero section', () => {
    render(<Home />);

    const heroSection = screen.getByLabelText('Hero section');
    expect(heroSection).toBeInTheDocument();
  });

  it('renders the developer name', () => {
    render(<Home />);

    const name = screen.getByText(heroData.name);
    expect(name).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<Home />);

    const tagline = screen.getByText(heroData.tagline);
    expect(tagline).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(<Home />);

    const viewProjectsButton = screen.getByText('View Projects');
    const getInTouchButton = screen.getByText('Get In Touch');

    expect(viewProjectsButton).toBeInTheDocument();
    expect(getInTouchButton).toBeInTheDocument();
  });
});
