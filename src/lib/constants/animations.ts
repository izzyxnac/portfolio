// Animation Constants
// This file contains animation configurations and constants

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  EXTRA_SLOW: 1000,
} as const;

// Animation delays (in milliseconds)
export const ANIMATION_DELAY = {
  NONE: 0,
  SHORT: 100,
  MEDIUM: 200,
  LONG: 500,
} as const;

// Easing functions
export const ANIMATION_EASING = {
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  EASE_IN_OUT: 'ease-in-out',
  BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  SMOOTH: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;

// Framer Motion variants
export const FADE_IN_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const SLIDE_IN_VARIANTS = {
  up: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
};

export const SCALE_IN_VARIANTS = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

export const STAGGER_CONTAINER_VARIANTS = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const STAGGER_ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Page transition variants
export const PAGE_TRANSITION_VARIANTS = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

// Hero section animation variants
export const HERO_VARIANTS = {
  title: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: ANIMATION_EASING.SMOOTH,
      },
    },
  },
  subtitle: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: ANIMATION_EASING.SMOOTH,
      },
    },
  },
  description: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: ANIMATION_EASING.SMOOTH,
      },
    },
  },
  cta: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        ease: ANIMATION_EASING.BOUNCE,
      },
    },
  },
};

// Card animation variants
export const CARD_VARIANTS = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: ANIMATION_EASING.SMOOTH,
    },
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: ANIMATION_EASING.SMOOTH,
    },
  },
};

// Button animation variants
export const BUTTON_VARIANTS = {
  initial: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: ANIMATION_EASING.SMOOTH,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1,
      ease: ANIMATION_EASING.SMOOTH,
    },
  },
};

// Loading animation variants
export const LOADING_VARIANTS = {
  spin: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: ANIMATION_EASING.LINEAR,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: ANIMATION_EASING.EASE_IN_OUT,
    },
  },
  bounce: {
    y: [0, -10, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: ANIMATION_EASING.EASE_IN_OUT,
    },
  },
};

// Scroll-triggered animation configurations
export const SCROLL_ANIMATION_CONFIG = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '0px 0px -100px 0px',
};

// Reduced motion preferences
export const REDUCED_MOTION_CONFIG = {
  duration: 0.01,
  ease: ANIMATION_EASING.LINEAR,
  scale: 1,
  opacity: 1,
  x: 0,
  y: 0,
};
