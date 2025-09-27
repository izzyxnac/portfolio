// String Utilities Tests
// This file tests the string utility functions

import { describe, it, expect } from 'vitest';
import { slugify, capitalize, toTitleCase, truncate, getReadingTime } from '@/lib/utils/string';

describe('String Utilities', () => {
  describe('slugify', () => {
    it('should convert text to slug format', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('AI/ML Engineer')).toBe('ai-ml-engineer');
      expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces');
      expect(slugify('Special!@#$%Characters')).toBe('specialcharacters');
    });

    it('should handle empty strings', () => {
      expect(slugify('')).toBe('');
    });

    it('should remove leading and trailing hyphens', () => {
      expect(slugify('-leading-trailing-')).toBe('leading-trailing');
    });
  });

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
      expect(capitalize('mIxEd CaSe')).toBe('Mixed case');
    });

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('');
    });

    it('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('toTitleCase', () => {
    it('should convert to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World');
      expect(toTitleCase('ai/ml engineer')).toBe('Ai/Ml Engineer');
      expect(toTitleCase('UPPERCASE TEXT')).toBe('Uppercase Text');
    });

    it('should handle empty strings', () => {
      expect(toTitleCase('')).toBe('');
    });
  });

  describe('truncate', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated';
      // For maxLength 20 with '...' (3 chars), we get 17 chars + '...' = 20 total
      expect(truncate(longText, 20)).toBe('This is a very lo...');
      // For maxLength 20 with '---' (3 chars), we get 17 chars + '---' = 20 total
      expect(truncate(longText, 20, '---')).toBe('This is a very lo---');
    });

    it('should not truncate short text', () => {
      const shortText = 'Short text';
      expect(truncate(shortText, 20)).toBe('Short text');
    });

    it('should handle exact length', () => {
      const text = 'Exactly twenty chars';
      expect(truncate(text, 20)).toBe('Exactly twenty chars');
    });
  });

  describe('getReadingTime', () => {
    it('should calculate reading time', () => {
      const shortText = 'This is a short text with ten words total.';
      const longText = Array(200).fill('word').join(' ');

      expect(getReadingTime(shortText)).toBe(1);
      expect(getReadingTime(longText)).toBe(1);
      expect(getReadingTime(longText + ' ' + longText)).toBe(2);
    });

    it('should handle empty text', () => {
      expect(getReadingTime('')).toBe(1);
    });

    it('should use custom words per minute', () => {
      const text = Array(100).fill('word').join(' ');
      expect(getReadingTime(text, 100)).toBe(1);
      expect(getReadingTime(text, 50)).toBe(2);
    });
  });
});
