/**
 * Animation configurations for consistent motion design
 * Based on Framer Motion and Tailwind CSS animations
 */

// Animation duration constants
export const ANIMATION_DURATIONS = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const;

// Animation easing functions
export const ANIMATION_EASINGS = {
  easeInOut: [0.4, 0, 0.2, 1],
  easeOut: [0, 0, 0.2, 1],
  easeIn: [0.4, 0, 1, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Common animation variants for Framer Motion
export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: ANIMATION_DURATIONS.normal }
  }
};

export const SLIDE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut
    }
  }
};

export const SCALE_IN_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut
    }
  }
};

export const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut
    }
  }
};

// Page transition variants
export const PAGE_TRANSITION_VARIANTS = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: ANIMATION_DURATIONS.normal,
      ease: ANIMATION_EASINGS.easeOut
    }
  },
  exit: { 
    opacity: 0, 
    x: 20,
    transition: { 
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeIn
    }
  }
};

// Hover and interaction animations
export const HOVER_SCALE_VARIANTS = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { 
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut
    }
  }
};

export const BUTTON_TAP_VARIANTS = {
  tap: { 
    scale: 0.95,
    transition: { 
      duration: ANIMATION_DURATIONS.fast,
      ease: ANIMATION_EASINGS.easeOut
    }
  }
};
