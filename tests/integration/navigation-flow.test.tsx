import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/header';

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

// Mock custom hooks
vi.mock('@/hooks', () => ({
  useScrollSpy: vi.fn(() => ''),
  useSmootScroll: vi.fn(() => ({
    scrollToSection: vi.fn(),
  })),
}));

describe('Navigation Flow Integration', () => {
  it('renders complete header with navigation', () => {
    render(<Header />);

    // Check header structure
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByLabelText('Portfolio - Go to homepage')).toBeInTheDocument();

    // Check navigation items
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('supports complete mobile navigation flow', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Open mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Verify mobile menu is open
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Navigate to a page in mobile menu
    // Mobile menu version
    const aboutLink = screen.getAllByText('About')[1];
    await user.click(aboutLink);

    // Verify menu closes after navigation
    await waitFor(() => {
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('maintains accessibility throughout navigation', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Test keyboard navigation
    // Focus logo
    await user.tab();
    expect(screen.getByLabelText('Portfolio - Go to homepage')).toHaveFocus();

    // Focus first nav item or mobile menu button
    await user.tab();
    const focusedElement = document.activeElement;
    expect(focusedElement).toBeInTheDocument();

    // Test mobile menu accessibility
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Verify ARIA attributes
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');

    // Test close button and close menu
    await user.click(screen.getByLabelText('Close menu'));
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('handles responsive behavior correctly', () => {
    render(<Header />);

    // Desktop navigation should be present
    const desktopNav = screen.getByLabelText('Main navigation');
    expect(desktopNav).toHaveClass('hidden', 'lg:flex');

    // Mobile menu button should be present
    const mobileButton = screen.getByLabelText('Open menu');
    expect(mobileButton).toHaveClass('lg:hidden');
  });

  it('supports proper focus management', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Open mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Focus should be manageable within the menu
    await user.tab();

    // Should be able to navigate to menu items
    const menuItems = screen.getAllByRole('link');
    const mobileMenuItems = menuItems.filter(item => item.closest('#mobile-menu'));

    expect(mobileMenuItems.length).toBeGreaterThan(0);
  });

  it('prevents body scroll when mobile menu is open', async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Initially body should be scrollable
    expect(document.body.style.overflow).toBe('');

    // Open mobile menu
    const menuButton = screen.getByLabelText('Open menu');
    await user.click(menuButton);

    // Body scroll should be prevented
    expect(document.body.style.overflow).toBe('hidden');

    // Close mobile menu
    const closeButton = screen.getByLabelText('Close menu');
    await user.click(closeButton);

    // Body scroll should be restored
    expect(document.body.style.overflow).toBe('unset');
  });
});
