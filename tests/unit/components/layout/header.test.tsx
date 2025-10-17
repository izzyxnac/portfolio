import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';

// Mock the Navigation component
vi.mock('@/components/layout', () => ({
  Navigation: ({ items }: { items: Array<{ id: string; href: string; label: string }> }) => (
    <nav data-testid='navigation'>
      {items.map(item => (
        <a key={item.id} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>
  ),
}));

describe('Header Component', () => {
  it('renders header with correct structure', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('aria-label', 'Site header');
  });

  it('renders logo with correct link', () => {
    render(<Header />);

    const logo = screen.getByLabelText('Portfolio - Go to homepage');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders navigation component', () => {
    render(<Header />);

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('applies absolute positioning by default', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('absolute', 'top-0');
  });

  it('applies relative positioning when not absolute', () => {
    render(<Header absolute={false} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('relative');
    expect(header).not.toHaveClass('absolute');
  });

  it('applies transparent background by default', () => {
    render(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
  });

  it('applies custom className', () => {
    render(<Header className='custom-class' />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-class');
  });
});
