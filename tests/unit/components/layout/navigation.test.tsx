import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/components/layout/navigation';

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

// Mock custom hooks
vi.mock('@/hooks', () => ({
  useScrollSpy: vi.fn(() => 'home'),
  useSmootScroll: vi.fn(() => ({
    scrollToSection: vi.fn(),
  })),
}));

const mockItems = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'about', label: 'About', href: '/about' },
  { id: 'projects', label: 'Projects', href: '/projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

// Helper function to setup navigation test
function setupNavigationTest(pathname = '/') {
  const mockUsePathname = usePathname as ReturnType<typeof vi.fn>;
  mockUsePathname.mockReturnValue(pathname);
  return mockUsePathname;
}

describe('Navigation Component - Desktop', () => {
  beforeEach(() => {
    setupNavigationTest();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders desktop navigation', () => {
    render(<Navigation items={mockItems} />);

    const nav = screen.getByLabelText('Main navigation');
    expect(nav).toBeInTheDocument();

    // Check that each navigation item exists in the desktop navigation
    mockItems.forEach(item => {
      const link = nav.querySelector(`a[href="${item.href}"]`);
      expect(link).toBeInTheDocument();
      expect(link).toHaveTextContent(item.label);
    });
  });

  it('highlights active navigation item', () => {
    setupNavigationTest('/about');
    render(<Navigation items={mockItems} />);

    // Get the About link from desktop navigation specifically
    const desktopNav = screen.getByLabelText('Main navigation');
    const aboutLink = desktopNav.querySelector('a[href="/about"]');
    expect(aboutLink).toHaveClass('text-blue-400', 'bg-white/10');
  });

  it('handles external links correctly', () => {
    const externalItems = [
      { id: 'github', label: 'GitHub', href: 'https://github.com', external: true },
    ];

    render(<Navigation items={externalItems} />);

    // Get the GitHub link from desktop navigation specifically
    const desktopNav = screen.getByLabelText('Main navigation');
    const githubLink = desktopNav.querySelector('a[href="https://github.com"]');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    // Get the first link in the desktop navigation specifically
    const desktopNav = screen.getByLabelText('Main navigation');
    const firstLink = desktopNav.querySelector('a[href="/"]');

    await user.tab();

    expect(firstLink).toHaveFocus();
  });
});

describe('Navigation Component - Mobile Menu', () => {
  beforeEach(() => {
    setupNavigationTest();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders mobile menu button', () => {
    render(<Navigation items={mockItems} />);

    const menuButton = screen.getByLabelText('Open menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens mobile menu when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Navigation')).toBeInTheDocument();
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    // Open menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Close menu
    const closeButton = screen.getByLabelText('Close menu');
    await user.click(closeButton);

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes mobile menu when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    // Open menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Click overlay
    const overlay = screen.getByTestId('mobile-menu-overlay');
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      fireEvent.click(overlay);
    }

    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });
});

describe('Navigation Component - Body Scroll', () => {
  beforeEach(() => {
    setupNavigationTest();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('prevents body scroll when mobile menu is open', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when mobile menu is closed', async () => {
    const user = userEvent.setup();
    render(<Navigation items={mockItems} />);

    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    const closeButton = screen.getByLabelText('Close menu');
    await user.click(closeButton);

    expect(document.body.style.overflow).toBe('unset');
  });
});
