'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, User, FolderOpen, BookOpen, Mail } from 'lucide-react';
import { NavigationProps, MobileMenuProps, NavigationItem } from '@/lib/types/components';
import { useScrollSpy, useSmootScroll } from '@/hooks';

// Icon mapping function
function getIcon(iconName?: string, size: number = 20, className: string = 'mr-3 flex-shrink-0') {
  const icons = {
    Home,
    User,
    FolderOpen,
    BookOpen,
    Mail,
  };

  if (!iconName || !(iconName in icons)) return null;
  const IconComponent = icons[iconName as keyof typeof icons];
  return <IconComponent size={size} className={className} />;
}

// Hook for managing mobile menu body scroll and escape key
function useMobileMenuEffects(isOpen: boolean, onToggle: () => void) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onToggle();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onToggle]);
}

// Mobile Menu Overlay Component
function MobileMenuOverlay({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onToggle();
  };

  return (
    <div
      className='fixed inset-0 z-[999] bg-black/70 backdrop-blur-md lg:hidden'
      onClick={handleOverlayClick}
      aria-hidden='true'
      data-testid='mobile-menu-overlay'
      style={{
        pointerEvents: 'auto',
        height: '100vh',
        width: '100vw',
        top: 0,
        left: 0,
        position: 'fixed',
      }}
    />
  );
}

// Mobile Menu Panel Component
function MobileMenuPanel({
  isOpen,
  onToggle,
  items,
  className,
  getIsActive,
}: {
  isOpen: boolean;
  onToggle: () => void;
  items: NavigationItem[];
  className: string;
  getIsActive: (item: NavigationItem) => boolean;
}) {
  const handleItemClick = () => {
    onToggle();
  };

  return (
    <div
      id='mobile-menu'
      className={`bg-background border-border fixed top-0 right-0 z-[1000] flex w-80 max-w-[85vw] transform flex-col border-l shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'} ${className} `}
      style={{
        height: '100vh',
        minHeight: '100vh',
      }}
    >
      {/* Header */}
      <div className='border-border bg-card flex flex-shrink-0 items-center justify-between border-b p-6'>
        <div className='flex items-center space-x-3'>
          <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg'>
            <span className='text-lg font-bold text-white'>P</span>
          </div>
          <span className='text-foreground text-xl font-bold'>Portfolio</span>
        </div>
        <button
          onClick={onToggle}
          className='hover:bg-muted rounded-full p-2.5 transition-all duration-200 hover:scale-110 hover:rotate-90'
          aria-label='Close menu'
        >
          <X size={24} className='text-muted-foreground hover:text-foreground' />
        </button>
      </div>

      {/* Navigation Content */}
      <nav
        className='bg-card flex-1 overflow-y-auto p-6 pt-6'
        role='navigation'
        aria-label='Mobile navigation'
      >
        <div className='mb-6'>
          <p className='text-muted-foreground mb-4 text-xs font-medium tracking-wider uppercase'>
            Navigation
          </p>
        </div>
        <ul className='space-y-2'>
          {items.map((item, index) => (
            <li
              key={item.id}
              style={{ animationDelay: `${index * 50}ms` }}
              className='animate-in slide-in-from-right-4 fade-in duration-300'
            >
              <MobileNavItem item={item} onClick={handleItemClick} isActive={getIsActive(item)} />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer - Always at bottom */}
      <div className='border-border bg-card flex-shrink-0 border-t p-6 pt-4'>
        <p className='text-muted-foreground text-center text-xs'>
          © {new Date().getFullYear()} Portfolio
        </p>
      </div>
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({
  isOpen,
  onToggle,
  items,
  className = '',
  getIsActive,
}: MobileMenuProps & { getIsActive: (item: NavigationItem) => boolean }) {
  useMobileMenuEffects(isOpen, onToggle);

  return (
    <>
      <MobileMenuPanel
        isOpen={isOpen}
        onToggle={onToggle}
        items={items}
        className={className}
        getIsActive={getIsActive}
      />
      <MobileMenuOverlay isOpen={isOpen} onToggle={onToggle} />
    </>
  );
}

// Mobile Navigation Item Component
function MobileNavItem({
  item,
  onClick,
  isActive = false,
}: {
  item: NavigationItem;
  onClick: () => void;
  isActive?: boolean;
}) {
  const { scrollToSection } = useSmootScroll();

  const linkClasses = `
    group flex items-center px-4 py-4 rounded-2xl text-base font-medium theme-transition
    relative overflow-hidden touch-target-recommended no-underline
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    ${
      isActive
        ? 'text-primary/80 bg-accent/20 shadow-sm'
        : 'text-hierarchy-secondary hover:text-hierarchy-primary hover:bg-accent/20 hover:scale-105'
    }
  `.trim();

  const handleClick = (e: React.MouseEvent) => {
    onClick();

    if (item.href.startsWith('#')) {
      e.preventDefault();
      const sectionId = item.href.substring(1);
      scrollToSection(sectionId);
      return;
    }
  };

  if (item.external) {
    return (
      <a
        href={item.href}
        className={linkClasses}
        target='_blank'
        rel='noopener noreferrer'
        onClick={onClick}
      >
        {getIcon(item.icon)}
        <span className='flex-1'>{item.label}</span>
      </a>
    );
  }

  return (
    <Link href={item.href} className={linkClasses} onClick={handleClick}>
      {getIcon(item.icon)}
      <span className='flex-1'>{item.label}</span>
      {isActive && <div className='ml-2 h-2 w-2 animate-pulse rounded-full bg-white' />}
    </Link>
  );
}

// Desktop Navigation Item Component
function DesktopNavItem({ item, isActive = false }: { item: NavigationItem; isActive?: boolean }) {
  const { scrollToSection } = useSmootScroll();

  const linkClasses = `
    inline-flex items-center justify-center px-4 h-full rounded-xl text-sm font-medium theme-transition
    no-underline
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
    ${
      isActive
        ? 'text-primary/80 bg-accent/20 shadow-sm'
        : 'text-hierarchy-secondary hover:text-hierarchy-primary hover:bg-accent/10 hover:scale-105'
    }
  `.trim();

  const handleClick = (e: React.MouseEvent) => {
    if (item.href.startsWith('#')) {
      e.preventDefault();
      const sectionId = item.href.substring(1);
      scrollToSection(sectionId);
      return;
    }
  };

  if (item.external) {
    return (
      <a href={item.href} className={linkClasses} target='_blank' rel='noopener noreferrer'>
        {getIcon(item.icon, 16, 'mr-2 flex-shrink-0')}
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={linkClasses} onClick={handleClick}>
      {getIcon(item.icon, 16, 'mr-2 flex-shrink-0')}
      {item.label}
      {isActive && <div className='bg-primary ml-2 h-1.5 w-1.5 animate-pulse rounded-full' />}
    </Link>
  );
}

// Main Navigation Component
export function Navigation({ items, className = '', height = 'h-10', ...props }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Extract section IDs from navigation items for scroll spy
  const sectionIds = items
    .filter(item => item.href.startsWith('#'))
    .map(item => item.href.substring(1));

  const activeSection = useScrollSpy({ sectionIds });

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getIsActive = (item: NavigationItem): boolean => {
    if (item.href.startsWith('#')) {
      return activeSection === item.href.substring(1);
    }
    return pathname === item.href;
  };

  return (
    <div className={`flex items-center justify-center ${height} ${className}`} {...props}>
      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:flex lg:items-center lg:justify-center ${height}`}
        role='navigation'
        aria-label='Main navigation'
      >
        <div className={`flex h-full items-center justify-center space-x-1`}>
          {items.map(item => (
            <DesktopNavItem key={item.id} item={item} isActive={getIsActive(item)} />
          ))}
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className='hover:bg-accent/10 theme-transition touch-target-recommended focus-visible:ring-ring rounded-xl p-2.5 hover:scale-105 focus-visible:ring-2 focus-visible:outline-none lg:hidden'
        aria-label='Open menu'
        aria-expanded={mobileMenuOpen}
        aria-controls='mobile-menu'
      >
        <Menu
          size={22}
          className='text-hierarchy-secondary hover:text-hierarchy-primary theme-transition'
        />
      </button>

      {/* Mobile Menu - Only render when open */}
      {mobileMenuOpen && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onToggle={toggleMobileMenu}
          items={items}
          getIsActive={getIsActive}
        />
      )}
    </div>
  );
}
