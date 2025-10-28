import { render, screen } from '@testing-library/react';
import { Header } from '@/components/layout/header';
import { ThemeProvider } from '@/components/layout/theme-provider';

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

// Helper function to render with ThemeProvider
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider defaultTheme='dark' disableTransitionOnChange={true}>
      {component}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  it('renders header with correct structure', () => {
    renderWithTheme(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    expect(header).toHaveAttribute('aria-label', 'Site header');
  });

  it('renders logo with correct link', () => {
    renderWithTheme(<Header />);

    const logo = screen.getByLabelText('Portfolio - Go to homepage');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders navigation component', () => {
    renderWithTheme(<Header />);

    const navigation = screen.getByTestId('navigation');
    expect(navigation).toBeInTheDocument();
  });

  it('applies absolute positioning by default', () => {
    renderWithTheme(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('absolute', 'top-0');
  });

  it('applies relative positioning when not absolute', () => {
    renderWithTheme(<Header absolute={false} />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('relative');
    expect(header).not.toHaveClass('absolute');
  });

  it('applies background with backdrop blur by default', () => {
    renderWithTheme(<Header />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-background/95', 'backdrop-blur-md');
  });

  it('applies custom className', () => {
    renderWithTheme(<Header className='custom-class' />);

    const header = screen.getByRole('banner');
    expect(header).toHaveClass('custom-class');
  });
});
