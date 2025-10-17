import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipNavigation } from '@/components/common/skip-navigation';

describe('SkipNavigation Component', () => {
  it('renders default skip links', () => {
    render(<SkipNavigation />);

    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
    expect(screen.getByText('Skip to navigation')).toBeInTheDocument();
    expect(screen.getByText('Skip to footer')).toBeInTheDocument();
  });

  it('renders custom skip links', () => {
    const customLinks = [{ href: '#custom-section', label: 'Skip to custom section' }];

    render(<SkipNavigation links={customLinks} />);

    expect(screen.getByText('Skip to custom section')).toBeInTheDocument();
  });

  it('has correct href attributes', () => {
    render(<SkipNavigation />);

    const mainContentLink = screen.getByText('Skip to main content');
    expect(mainContentLink).toHaveAttribute('href', '#main-content');

    const navigationLink = screen.getByText('Skip to navigation');
    expect(navigationLink).toHaveAttribute('href', '#navigation');

    const footerLink = screen.getByText('Skip to footer');
    expect(footerLink).toHaveAttribute('href', '#footer');
  });

  it('is initially hidden but visible on focus', () => {
    render(<SkipNavigation />);

    // The outermost div has the sr-only classes
    const container = screen.getByText('Skip to main content').closest('div')?.parentElement;
    expect(container).toHaveClass('sr-only', 'focus-within:not-sr-only');
  });

  it('has proper focus styles', () => {
    render(<SkipNavigation />);

    const link = screen.getByText('Skip to main content');
    expect(link).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-2'
    );
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    render(<SkipNavigation />);

    // Tab to first skip link
    await user.tab();

    const firstLink = screen.getByText('Skip to main content');
    expect(firstLink).toHaveFocus();

    // Tab to second skip link
    await user.tab();

    const secondLink = screen.getByText('Skip to navigation');
    expect(secondLink).toHaveFocus();
  });

  it('has correct ARIA and accessibility attributes', () => {
    render(<SkipNavigation />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveClass('rounded-md');
      expect(link).toHaveAttribute('href');
    });
  });
});
