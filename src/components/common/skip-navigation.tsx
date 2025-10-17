interface SkipNavigationProps {
  links?: Array<{
    href: string;
    label: string;
  }>;
}

const DEFAULT_SKIP_LINKS = [
  { href: '#main-content', label: 'Skip to main content' },
  { href: '#navigation', label: 'Skip to navigation' },
  { href: '#footer', label: 'Skip to footer' },
];

export function SkipNavigation({ links = DEFAULT_SKIP_LINKS }: SkipNavigationProps) {
  return (
    <div className='sr-only focus-within:not-sr-only'>
      <div className='bg-background border-border fixed top-0 left-0 z-[9999] rounded-br-md border p-2'>
        <ul className='flex flex-col gap-1'>
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className='bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90 focus:ring-ring inline-block rounded-md px-3 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
