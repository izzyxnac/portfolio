import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { HeroSection } from '@/components/sections/hero';

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

const mockProps = {
  name: 'John Doe',
  tagline: 'AI/ML Developer',
  description: 'Building the future with AI and machine learning',
  skills: ['AI/ML', 'Python', 'React'],
  profileImage: '/test-image.jpg',
  profileImageAlt: 'John Doe profile',
  onViewProjects: vi.fn(),
  onGetInTouch: vi.fn(),
};

describe('HeroSection', () => {
  it('renders the hero section with correct content', () => {
    render(<HeroSection {...mockProps} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('AI/ML Developer')).toBeInTheDocument();
    expect(
      screen.getByText('Building the future with AI and machine learning')
    ).toBeInTheDocument();
  });

  it('renders the profile image with correct attributes', () => {
    render(<HeroSection {...mockProps} />);

    const image = screen.getByAltText('John Doe profile');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('renders call-to-action buttons', () => {
    render(<HeroSection {...mockProps} />);

    expect(screen.getByText('View Projects')).toBeInTheDocument();
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
  });

  it('calls onViewProjects when View Projects button is clicked', () => {
    render(<HeroSection {...mockProps} />);

    const viewProjectsButton = screen.getByText('View Projects');
    fireEvent.click(viewProjectsButton);

    expect(mockProps.onViewProjects).toHaveBeenCalledTimes(1);
  });

  it('calls onGetInTouch when Get In Touch button is clicked', () => {
    render(<HeroSection {...mockProps} />);

    const getInTouchButton = screen.getByText('Get In Touch');
    fireEvent.click(getInTouchButton);

    expect(mockProps.onGetInTouch).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<HeroSection {...mockProps} />);

    const section = screen.getByLabelText('Hero section');
    expect(section).toBeInTheDocument();

    const viewProjectsButton = screen.getByLabelText('View my projects');
    expect(viewProjectsButton).toBeInTheDocument();

    const getInTouchButton = screen.getByLabelText('Get in touch with me');
    expect(getInTouchButton).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-hero-class';
    render(<HeroSection {...mockProps} className={customClass} />);

    const section = screen.getByLabelText('Hero section');
    expect(section).toHaveClass(customClass);
  });
});
