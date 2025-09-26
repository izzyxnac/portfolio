import { describe, it, expect } from 'vitest';
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASINGS,
  FADE_IN_VARIANTS,
  SLIDE_UP_VARIANTS,
  SCALE_IN_VARIANTS,
  STAGGER_CONTAINER_VARIANTS,
  STAGGER_ITEM_VARIANTS,
  PAGE_TRANSITION_VARIANTS,
  HOVER_SCALE_VARIANTS,
  BUTTON_TAP_VARIANTS,
} from '@/styles/themes/animations';

describe('Animation Configurations', () => {
  describe('ANIMATION_DURATIONS', () => {
    it('should have all required duration constants', () => {
      expect(ANIMATION_DURATIONS).toHaveProperty('fast');
      expect(ANIMATION_DURATIONS).toHaveProperty('normal');
      expect(ANIMATION_DURATIONS).toHaveProperty('slow');
      expect(ANIMATION_DURATIONS).toHaveProperty('slower');
    });

    it('should have numeric values in ascending order', () => {
      expect(typeof ANIMATION_DURATIONS.fast).toBe('number');
      expect(typeof ANIMATION_DURATIONS.normal).toBe('number');
      expect(typeof ANIMATION_DURATIONS.slow).toBe('number');
      expect(typeof ANIMATION_DURATIONS.slower).toBe('number');

      expect(ANIMATION_DURATIONS.fast).toBeLessThan(ANIMATION_DURATIONS.normal);
      expect(ANIMATION_DURATIONS.normal).toBeLessThan(ANIMATION_DURATIONS.slow);
      expect(ANIMATION_DURATIONS.slow).toBeLessThan(ANIMATION_DURATIONS.slower);
    });
  });

  describe('ANIMATION_EASINGS', () => {
    it('should have all required easing functions', () => {
      expect(ANIMATION_EASINGS).toHaveProperty('easeInOut');
      expect(ANIMATION_EASINGS).toHaveProperty('easeOut');
      expect(ANIMATION_EASINGS).toHaveProperty('easeIn');
      expect(ANIMATION_EASINGS).toHaveProperty('bounce');
    });

    it('should have cubic-bezier arrays with 4 values', () => {
      Object.values(ANIMATION_EASINGS).forEach(easing => {
        expect(Array.isArray(easing)).toBe(true);
        expect(easing).toHaveLength(4);
        easing.forEach(value => {
          expect(typeof value).toBe('number');
        });
      });
    });
  });

  describe('FADE_IN_VARIANTS', () => {
    it('should have hidden and visible states', () => {
      expect(FADE_IN_VARIANTS).toHaveProperty('hidden');
      expect(FADE_IN_VARIANTS).toHaveProperty('visible');
    });

    it('should have correct opacity values', () => {
      expect(FADE_IN_VARIANTS.hidden.opacity).toBe(0);
      expect(FADE_IN_VARIANTS.visible.opacity).toBe(1);
    });

    it('should have transition configuration', () => {
      expect(FADE_IN_VARIANTS.visible).toHaveProperty('transition');
      expect(FADE_IN_VARIANTS.visible.transition).toHaveProperty('duration');
    });
  });

  describe('SLIDE_UP_VARIANTS', () => {
    it('should have hidden and visible states', () => {
      expect(SLIDE_UP_VARIANTS).toHaveProperty('hidden');
      expect(SLIDE_UP_VARIANTS).toHaveProperty('visible');
    });

    it('should animate opacity and y position', () => {
      expect(SLIDE_UP_VARIANTS.hidden).toHaveProperty('opacity', 0);
      expect(SLIDE_UP_VARIANTS.hidden).toHaveProperty('y', 20);
      expect(SLIDE_UP_VARIANTS.visible).toHaveProperty('opacity', 1);
      expect(SLIDE_UP_VARIANTS.visible).toHaveProperty('y', 0);
    });
  });

  describe('SCALE_IN_VARIANTS', () => {
    it('should animate scale and opacity', () => {
      expect(SCALE_IN_VARIANTS.hidden).toHaveProperty('opacity', 0);
      expect(SCALE_IN_VARIANTS.hidden).toHaveProperty('scale', 0.95);
      expect(SCALE_IN_VARIANTS.visible).toHaveProperty('opacity', 1);
      expect(SCALE_IN_VARIANTS.visible).toHaveProperty('scale', 1);
    });
  });

  describe('STAGGER_CONTAINER_VARIANTS', () => {
    it('should have stagger configuration', () => {
      expect(STAGGER_CONTAINER_VARIANTS.visible.transition).toHaveProperty('staggerChildren');
      expect(STAGGER_CONTAINER_VARIANTS.visible.transition).toHaveProperty('delayChildren');
    });

    it('should have numeric stagger values', () => {
      const transition = STAGGER_CONTAINER_VARIANTS.visible.transition;
      expect(typeof transition.staggerChildren).toBe('number');
      expect(typeof transition.delayChildren).toBe('number');
    });
  });

  describe('STAGGER_ITEM_VARIANTS', () => {
    it('should have hidden and visible states', () => {
      expect(STAGGER_ITEM_VARIANTS).toHaveProperty('hidden');
      expect(STAGGER_ITEM_VARIANTS).toHaveProperty('visible');
    });

    it('should animate opacity and y position for stagger items', () => {
      expect(STAGGER_ITEM_VARIANTS.hidden).toHaveProperty('opacity', 0);
      expect(STAGGER_ITEM_VARIANTS.hidden).toHaveProperty('y', 20);
      expect(STAGGER_ITEM_VARIANTS.visible).toHaveProperty('opacity', 1);
      expect(STAGGER_ITEM_VARIANTS.visible).toHaveProperty('y', 0);
    });
  });

  describe('PAGE_TRANSITION_VARIANTS', () => {
    it('should have initial, animate, and exit states', () => {
      expect(PAGE_TRANSITION_VARIANTS).toHaveProperty('initial');
      expect(PAGE_TRANSITION_VARIANTS).toHaveProperty('animate');
      expect(PAGE_TRANSITION_VARIANTS).toHaveProperty('exit');
    });

    it('should animate x position for page transitions', () => {
      expect(PAGE_TRANSITION_VARIANTS.initial).toHaveProperty('x', -20);
      expect(PAGE_TRANSITION_VARIANTS.animate).toHaveProperty('x', 0);
      expect(PAGE_TRANSITION_VARIANTS.exit).toHaveProperty('x', 20);
    });
  });

  describe('HOVER_SCALE_VARIANTS', () => {
    it('should have rest and hover states', () => {
      expect(HOVER_SCALE_VARIANTS).toHaveProperty('rest');
      expect(HOVER_SCALE_VARIANTS).toHaveProperty('hover');
    });

    it('should scale up on hover', () => {
      expect(HOVER_SCALE_VARIANTS.rest.scale).toBe(1);
      expect(HOVER_SCALE_VARIANTS.hover.scale).toBeGreaterThan(1);
    });
  });

  describe('BUTTON_TAP_VARIANTS', () => {
    it('should have tap state', () => {
      expect(BUTTON_TAP_VARIANTS).toHaveProperty('tap');
    });

    it('should scale down on tap', () => {
      expect(BUTTON_TAP_VARIANTS.tap.scale).toBeLessThan(1);
    });
  });
});
