'use client';

import { useState, useEffect, useCallback } from 'react';

interface UseScrollSpyOptions {
  sectionIds: string[];
  rootMargin?: string;
  threshold?: number;
}

export function useScrollSpy({
  sectionIds,
  rootMargin = '-20% 0px -80% 0px',
  threshold = 0.1,
}: UseScrollSpyOptions) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin,
        threshold,
      }
    );

    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
  }, [sectionIds, rootMargin, threshold]);

  return activeSection;
}

export function useSmootScroll() {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Account for fixed header
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return { scrollToSection, scrollToTop };
}
