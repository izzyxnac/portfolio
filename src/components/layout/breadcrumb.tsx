import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { BaseComponentProps } from '@/lib/types/components';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export function Breadcrumb({ items, showHome = true, className = '', ...props }: BreadcrumbProps) {
  const allItems = showHome ? [{ label: 'Home', href: '/' }, ...items] : items;

  return (
    <nav aria-label='Breadcrumb' className={`${className}`} {...props}>
      <ol className='text-muted-foreground flex items-center space-x-2 text-sm'>
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isHome = showHome && index === 0;

          return (
            <li key={`${item.label}-${index}`} className='flex items-center'>
              {index > 0 && (
                <ChevronRight
                  size={16}
                  className='text-muted-foreground/60 mx-2'
                  aria-hidden='true'
                />
              )}

              {isLast || !item.href ? (
                <span
                  className='text-foreground font-medium'
                  aria-current={isLast ? 'page' : undefined}
                >
                  {isHome ? (
                    <span className='flex items-center'>
                      <Home size={16} className='mr-1' aria-hidden='true' />
                      <span className='sr-only'>{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className='hover:text-foreground focus:ring-ring rounded-sm px-1 py-0.5 transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none'
                >
                  {isHome ? (
                    <span className='flex items-center'>
                      <Home size={16} className='mr-1' aria-hidden='true' />
                      <span className='sr-only'>{item.label}</span>
                    </span>
                  ) : (
                    item.label
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
