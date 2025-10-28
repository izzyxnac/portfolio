'use client';

import { useEffect, useState } from 'react';
import { useBreakpoints, useAccessibilityPreferences } from './use-media-query';

/**
 * Typography configuration interface
 */
interface TypographyConfig {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
}

/**
 * Typography scale definitions
 */
const TYPOGRAPHY_SCALES = {
  display: {
    '2xl': {
      mobile: { fontSize: '3rem', lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '700' },
      tablet: { fontSize: '3.75rem', lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '700' },
      desktop: { fontSize: '4.5rem', lineHeight: '1', letterSpacing: '-0.05em', fontWeight: '700' },
    },
    xl: {
      mobile: {
        fontSize: '2.25rem',
        lineHeight: '1.25',
        letterSpacing: '-0.05em',
        fontWeight: '700',
      },
      tablet: { fontSize: '3rem', lineHeight: '1.25', letterSpacing: '-0.05em', fontWeight: '700' },
      desktop: {
        fontSize: '3.75rem',
        lineHeight: '1.25',
        letterSpacing: '-0.05em',
        fontWeight: '700',
      },
    },
    lg: {
      mobile: {
        fontSize: '1.875rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
      tablet: {
        fontSize: '2.25rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
      desktop: {
        fontSize: '3rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
    },
    md: {
      mobile: {
        fontSize: '1.5rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
      tablet: {
        fontSize: '1.875rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
      desktop: {
        fontSize: '2.25rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
    },
    sm: {
      mobile: { fontSize: '1.25rem', lineHeight: '1.375', letterSpacing: '0em', fontWeight: '600' },
      tablet: { fontSize: '1.5rem', lineHeight: '1.375', letterSpacing: '0em', fontWeight: '600' },
      desktop: {
        fontSize: '1.875rem',
        lineHeight: '1.375',
        letterSpacing: '0em',
        fontWeight: '600',
      },
    },
  },
  heading: {
    h1: {
      mobile: {
        fontSize: '1.875rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
      tablet: {
        fontSize: '2.25rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
      desktop: {
        fontSize: '3rem',
        lineHeight: '1.25',
        letterSpacing: '-0.025em',
        fontWeight: '700',
      },
    },
    h2: {
      mobile: {
        fontSize: '1.5rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
      tablet: {
        fontSize: '1.875rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
      desktop: {
        fontSize: '2.25rem',
        lineHeight: '1.375',
        letterSpacing: '-0.025em',
        fontWeight: '600',
      },
    },
    h3: {
      mobile: { fontSize: '1.25rem', lineHeight: '1.375', letterSpacing: '0em', fontWeight: '600' },
      tablet: { fontSize: '1.5rem', lineHeight: '1.375', letterSpacing: '0em', fontWeight: '600' },
      desktop: {
        fontSize: '1.875rem',
        lineHeight: '1.375',
        letterSpacing: '0em',
        fontWeight: '600',
      },
    },
    h4: {
      mobile: { fontSize: '1.125rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
      tablet: { fontSize: '1.25rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
      desktop: { fontSize: '1.5rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
    },
    h5: {
      mobile: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
      tablet: { fontSize: '1.125rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
      desktop: { fontSize: '1.25rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '500' },
    },
    h6: {
      mobile: {
        fontSize: '0.875rem',
        lineHeight: '1.5',
        letterSpacing: '0.025em',
        fontWeight: '600',
      },
      tablet: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '600' },
      desktop: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0.025em', fontWeight: '600' },
    },
  },
  body: {
    lg: {
      mobile: { fontSize: '1rem', lineHeight: '1.625', letterSpacing: '0em', fontWeight: '400' },
      tablet: {
        fontSize: '1.125rem',
        lineHeight: '1.625',
        letterSpacing: '0em',
        fontWeight: '400',
      },
      desktop: {
        fontSize: '1.125rem',
        lineHeight: '1.625',
        letterSpacing: '0em',
        fontWeight: '400',
      },
    },
    base: {
      mobile: { fontSize: '0.875rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
      tablet: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
      desktop: { fontSize: '1rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
    },
    sm: {
      mobile: { fontSize: '0.75rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
      tablet: { fontSize: '0.875rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
      desktop: { fontSize: '0.875rem', lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' },
    },
  },
  caption: {
    base: {
      mobile: {
        fontSize: '0.75rem',
        lineHeight: '1.375',
        letterSpacing: '0.025em',
        fontWeight: '400',
      },
      tablet: {
        fontSize: '0.875rem',
        lineHeight: '1.375',
        letterSpacing: '0.025em',
        fontWeight: '400',
      },
      desktop: {
        fontSize: '0.875rem',
        lineHeight: '1.375',
        letterSpacing: '0.025em',
        fontWeight: '400',
      },
    },
    overline: {
      mobile: {
        fontSize: '0.625rem',
        lineHeight: '1.25',
        letterSpacing: '0.1em',
        fontWeight: '600',
      },
      tablet: {
        fontSize: '0.75rem',
        lineHeight: '1.25',
        letterSpacing: '0.1em',
        fontWeight: '600',
      },
      desktop: {
        fontSize: '0.75rem',
        lineHeight: '1.25',
        letterSpacing: '0.1em',
        fontWeight: '600',
      },
    },
  },
} as const;

/**
 * Hook for responsive typography
 */
// Helper function to get typography configuration for breakpoint
function getTypographyForBreakpoint(
  sizeConfig: { mobile: TypographyConfig; tablet: TypographyConfig; desktop: TypographyConfig },
  breakpoint: string,
  prefersHighContrast: boolean
): TypographyConfig {
  let config = sizeConfig.desktop;

  if (breakpoint === 'mobile') {
    config = sizeConfig.mobile;
  } else if (breakpoint === 'tablet') {
    config = sizeConfig.tablet;
  }

  if (prefersHighContrast) {
    return {
      ...config,
      fontWeight: config.fontWeight === '400' ? '500' : config.fontWeight,
    };
  }

  return config;
}

// Helper function to get typography class mappings
function getTypographyClassMappings() {
  const baseClasses = {
    display: 'font-bold tracking-tight',
    heading: 'font-semibold tracking-tight',
    body: 'font-normal',
    caption: 'text-sm text-muted-foreground',
  };

  const sizeClasses = {
    display: {
      '2xl': 'text-display-2xl',
      xl: 'text-display-xl',
      lg: 'text-display-lg',
      md: 'text-display-md',
      sm: 'text-display-sm',
    },
    heading: {
      h1: 'text-h1',
      h2: 'text-h2',
      h3: 'text-h3',
      h4: 'text-h4',
      h5: 'text-h5',
      h6: 'text-h6',
    },
    body: {
      lg: 'text-body-lg',
      base: 'text-body',
      sm: 'text-body-sm',
    },
    caption: {
      base: 'text-caption',
      overline: 'text-overline',
    },
  };

  return { baseClasses, sizeClasses };
}

export function useTypography() {
  const { current: breakpoint } = useBreakpoints();
  const { prefersHighContrast } = useAccessibilityPreferences();

  const getTypography = (
    variant: keyof typeof TYPOGRAPHY_SCALES,
    size: string
  ): TypographyConfig => {
    const scale = TYPOGRAPHY_SCALES[variant];
    const sizeConfig = scale?.[size as keyof typeof scale];

    if (!sizeConfig) {
      console.warn(`Typography size "${size}" not found for variant "${variant}"`);
      return TYPOGRAPHY_SCALES.body.base.desktop;
    }

    return getTypographyForBreakpoint(sizeConfig, breakpoint, prefersHighContrast);
  };

  const getTypographyStyles = (
    variant: keyof typeof TYPOGRAPHY_SCALES,
    size: string
  ): React.CSSProperties => {
    const config = getTypography(variant, size);

    return {
      fontSize: config.fontSize,
      lineHeight: config.lineHeight,
      letterSpacing: config.letterSpacing,
      fontWeight: config.fontWeight,
    };
  };

  const getTypographyClasses = (variant: keyof typeof TYPOGRAPHY_SCALES, size: string): string => {
    const { baseClasses, sizeClasses } = getTypographyClassMappings();
    const baseClass = baseClasses[variant] || '';
    const sizeClass =
      sizeClasses[variant]?.[size as keyof (typeof sizeClasses)[typeof variant]] || '';

    return `${baseClass} ${sizeClass}`.trim();
  };

  return {
    getTypography,
    getTypographyStyles,
    getTypographyClasses,
    breakpoint,
    prefersHighContrast,
  };
}

/**
 * Hook for reading width optimization
 */
export function useReadingWidth() {
  const [optimalWidth, setOptimalWidth] = useState<'narrow' | 'normal' | 'wide'>('normal');
  const { current: breakpoint } = useBreakpoints();

  useEffect(() => {
    // Adjust reading width based on viewport
    if (breakpoint === 'mobile') {
      setOptimalWidth('narrow');
    } else if (breakpoint === 'tablet') {
      setOptimalWidth('normal');
    } else {
      setOptimalWidth('wide');
    }
  }, [breakpoint]);

  const getReadingWidthClass = () => {
    switch (optimalWidth) {
      case 'narrow':
        return 'reading-width-narrow';
      case 'wide':
        return 'reading-width-wide';
      default:
        return 'reading-width';
    }
  };

  const getReadingWidthStyle = (): React.CSSProperties => {
    const widths = {
      narrow: '45ch',
      normal: '65ch',
      wide: '75ch',
    };

    return {
      maxWidth: widths[optimalWidth],
    };
  };

  return {
    optimalWidth,
    getReadingWidthClass,
    getReadingWidthStyle,
  };
}

/**
 * Hook for font loading optimization
 */
export function useFontLoading() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [fontLoadingError, setFontLoadingError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('fonts' in document)) {
      setFontsLoaded(true);
      return;
    }

    const checkFonts = async () => {
      try {
        await document.fonts.ready;
        setFontsLoaded(true);
      } catch (error) {
        console.warn('Font loading failed:', error);
        setFontLoadingError(error instanceof Error ? error.message : 'Unknown font loading error');
        // Still set to true to prevent blocking
        setFontsLoaded(true);
      }
    };

    checkFonts();
  }, []);

  return {
    fontsLoaded,
    fontLoadingError,
  };
}

/**
 * Hook for text measurement and optimization
 */
export function useTextMeasurement(text: string, element?: HTMLElement) {
  const [measurements, setMeasurements] = useState({
    width: 0,
    height: 0,
    lines: 1,
  });

  useEffect(() => {
    if (!text || typeof window === 'undefined') return;

    const measureText = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) return;

      // Get computed styles from element or use defaults
      const computedStyle = element
        ? window.getComputedStyle(element)
        : {
            fontSize: '16px',
            fontFamily: 'system-ui',
            fontWeight: '400',
            lineHeight: '1.5',
          };

      context.font = `${computedStyle.fontWeight} ${computedStyle.fontSize} ${computedStyle.fontFamily}`;

      const metrics = context.measureText(text);
      const width = metrics.width;
      const height = parseFloat(computedStyle.fontSize) * parseFloat(computedStyle.lineHeight);

      // Estimate number of lines (simplified)
      const containerWidth = element?.clientWidth || 300;
      const lines = Math.ceil(width / containerWidth);

      setMeasurements({
        width,
        height,
        lines,
      });
    };

    measureText();

    // Re-measure on resize
    const handleResize = () => measureText();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [text, element]);

  return measurements;
}

export default useTypography;
