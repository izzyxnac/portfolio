'use client';

import Link from 'next/link';
import { HeaderProps } from '@/lib/types/components';
import { Navigation } from '.';
import { NAVIGATION_ITEMS } from '@/lib/constants/routes';
import { ThemeToggle } from './theme-provider';
import { useBreakpoints } from '@/hooks/use-media-query';
import { useThemeAnimations } from '@/hooks/use-theme';

export function Header({ absolute = true, className = '', ...props }: HeaderProps) {
  const { isMobile, isTablet } = useBreakpoints();
  const { easing } = useThemeAnimations();

  const baseClasses = [
    'w-full z-50 theme-transition',
    absolute ? 'absolute top-0' : 'relative',
    'bg-background/95 backdrop-blur-md border-b border-border/20',
    'supports-[backdrop-filter]:bg-background/80',
    'shadow-sm',
  ]
    .filter(Boolean)
    .join(' ');

  const headerClasses = `${baseClasses} ${className}`;

  // Responsive height based on breakpoint
  const headerHeight = isMobile ? 'h-14' : isTablet ? 'h-16' : 'h-20';

  // Interactive element height (for navigation and theme toggle)
  const interactiveHeight = isMobile ? 'h-8' : 'h-10';

  return (
    <header
      className={headerClasses}
      role='banner'
      aria-label='Site header'
      style={{
        transitionTimingFunction: easing.easeInOut,
      }}
      {...props}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className={`flex items-center justify-between ${headerHeight} min-h-[4rem]`}>
          {/* Logo/Brand - Left */}
          <div className='flex items-center'>
            <Link
              href='/'
              className={`text-hierarchy-primary theme-transition hover:text-primary focus-visible:ring-ring rounded-lg px-2 py-1 font-bold no-underline focus-visible:ring-2 focus-visible:outline-none ${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-2xl'}`}
              aria-label='Portfolio - Go to homepage'
              tabIndex={0}
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              Portfolio
            </Link>
          </div>

          {/* Navigation - Center (Desktop) / Menu Button (Mobile) - Right */}
          <div className={`flex items-center ${headerHeight}`}>
            <Navigation
              items={NAVIGATION_ITEMS}
              className={`flex items-center justify-center ${interactiveHeight}`}
              height={interactiveHeight}
            />
            {/* Theme Toggle - Always at the end */}
            <div className={`ml-4 flex items-center justify-center ${interactiveHeight}`}>
              <ThemeToggle size={isMobile ? 'sm' : 'md'} variant='ghost' />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
