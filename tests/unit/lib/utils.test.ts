import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn function', () => {
    it('should combine class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', true && 'conditional', false && 'hidden');
      expect(result).toBe('base conditional');
    });

    it('should merge Tailwind classes correctly', () => {
      // twMerge should handle conflicting Tailwind classes
      const result = cn('p-4', 'p-6');
      expect(result).toBe('p-6'); // Later class should override
    });

    it('should handle arrays of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toBe('class1 class2 class3');
    });

    it('should handle objects with conditional classes', () => {
      const result = cn({
        'base-class': true,
        'conditional-class': true,
        'hidden-class': false,
      });
      expect(result).toBe('base-class conditional-class');
    });

    it('should handle undefined and null values', () => {
      const result = cn('class1', undefined, null, 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle empty strings', () => {
      const result = cn('class1', '', 'class2');
      expect(result).toBe('class1 class2');
    });

    it('should handle complex Tailwind merging scenarios', () => {
      // Test common Tailwind conflicts
      const result1 = cn('bg-red-500', 'bg-blue-500');
      expect(result1).toBe('bg-blue-500');

      const result2 = cn('text-sm', 'text-lg');
      expect(result2).toBe('text-lg');

      const result3 = cn('p-2', 'px-4');
      expect(result3).toBe('p-2 px-4'); // px-4 should override x-axis padding
    });

    it('should preserve non-conflicting classes', () => {
      const result = cn('bg-red-500', 'text-white', 'bg-blue-500', 'font-bold');
      expect(result).toBe('text-white bg-blue-500 font-bold');
    });
  });
});
