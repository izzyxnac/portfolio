/**
 * Enhanced Animation System with Reduced Motion Support
 *
 * Provides comprehensive animation variants that respect user preferences
 * and optimize for battery efficiency on mobile devices
 */

// Animation duration constants with reduced motion variants
export const ANIMATION_DURATIONS = {
  instant: 0,
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  // Reduced motion durations
  reducedFast: 0.05,
  reducedNormal: 0.1,
} as const;

// Animation easing functions with reduced motion alternatives
export const ANIMATION_EASINGS = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  // Reduced motion easings
  linear: [0, 0, 1, 1],
  gentle: [0.25, 0.46, 0.45, 0.94],
} as const;

// Motion preference types
export type MotionPreference = 'no-preference' | 'reduce' | 'none';

// Animation variant interface
export interface AnimationVariant {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  whileHover?: Record<string, unknown>;
  whileTap?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

// Animation configuration with motion variants
export interface AnimationConfig {
  normal: AnimationVariant;
  reduced: AnimationVariant;
  none: AnimationVariant;
}

// Common animation variants for Framer Motion
export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION_DURATIONS.normal },
  },
};

export const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
};

export const SCALE_IN_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
};

export const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
};

// Page transition variants
export const PAGE_TRANSITION_VARIANTS = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeIn,
    },
  },
};

// Hover and interaction animations
export const HOVER_SCALE_VARIANTS = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
};

export const BUTTON_TAP_VARIANTS = {
  tap: {
    scale: 0.95,
    transition: {
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut,
    },
  },
};

/**
 * Enhanced animation configurations with reduced motion support
 */
export const ENHANCED_ANIMATIONS: Record<string, AnimationConfig> = {
  staggerContainer: {
    normal: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
      exit: { opacity: 0 },
    },
    reduced: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: {
          staggerChildren: 0.05,
          delayChildren: 0,
        },
      },
      exit: { opacity: 0 },
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
  },

  fadeIn: {
    normal: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: ANIMATION_DURATIONS.normal, ease: ANIMATION_EASINGS.easeOut },
    },
    reduced: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: ANIMATION_DURATIONS.reducedNormal, ease: ANIMATION_EASINGS.linear },
    },
    none: {
      initial: { opacity: 1 },
      animate: { opacity: 1 },
      exit: { opacity: 1 },
      transition: { duration: 0 },
    },
  },

  slideUp: {
    normal: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 20 },
      transition: { duration: ANIMATION_DURATIONS.normal, ease: ANIMATION_EASINGS.easeOut },
    },
    reduced: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: ANIMATION_DURATIONS.reducedNormal, ease: ANIMATION_EASINGS.linear },
    },
    none: {
      initial: { opacity: 1, y: 0 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 1, y: 0 },
      transition: { duration: 0 },
    },
  },

  scaleIn: {
    normal: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: ANIMATION_DURATIONS.fast, ease: ANIMATION_EASINGS.easeOut },
    },
    reduced: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: ANIMATION_DURATIONS.reducedFast, ease: ANIMATION_EASINGS.linear },
    },
    none: {
      initial: { opacity: 1, scale: 1 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 1, scale: 1 },
      transition: { duration: 0 },
    },
  },
};

/**
 * Utility function to get animation variant based on motion preference
 */
export function getAnimationVariant(
  animationName: keyof typeof ENHANCED_ANIMATIONS,
  motionPreference: MotionPreference = 'no-preference'
): AnimationVariant {
  const animation = ENHANCED_ANIMATIONS[animationName];

  if (!animation) {
    console.warn(`Animation "${animationName}" not found`);
    return ENHANCED_ANIMATIONS.fadeIn.none;
  }

  switch (motionPreference) {
    case 'reduce':
      return animation.reduced;
    case 'none':
      return animation.none;
    default:
      return animation.normal;
  }
}

/**
 * Battery-efficient animation presets for mobile devices
 */
export const BATTERY_EFFICIENT_PRESETS = {
  fadeOnly: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: ANIMATION_DURATIONS.reducedFast },
  },

  subtleHover: {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: ANIMATION_DURATIONS.instant },
  },
} as const;
