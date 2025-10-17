import Link from 'next/link';
import { HeaderProps } from '@/lib/types/components';
import { Navigation } from '.';
import { NAVIGATION_ITEMS } from '@/lib/constants/routes';

export function Header({ absolute = true, className = '', ...props }: HeaderProps) {
  const baseClasses = [
    'w-full z-50 transition-all duration-300',
    absolute ? 'absolute top-0' : 'relative',
    'bg-transparent',
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = `${baseClasses} ${className}`;

  return (
    <header className={headerClasses} role='banner' aria-label='Site header' {...props}>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between md:h-20'>
          {/* Logo/Brand */}
          <div className='flex-shrink-0'>
            <Link
              href='/'
              className='rounded-md px-2 py-1 text-xl font-bold text-white transition-colors hover:text-blue-400 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none md:text-2xl'
              aria-label='Portfolio - Go to homepage'
              tabIndex={0}
            >
              Portfolio
            </Link>
          </div>

          {/* Navigation */}
          <div id='navigation'>
            <Navigation items={NAVIGATION_ITEMS} className='flex-1 justify-end' />
          </div>
        </div>
      </div>
    </header>
  );
}
