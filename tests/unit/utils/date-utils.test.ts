// Date Utilities Tests
// This file tests the date utility functions

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { formatDate, getRelativeTime, isToday } from '@/lib/utils/date';

const testFormatDate = () => {
  describe('formatDate', () => {
    it('should format date with default options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date);
      expect(formatted).toBe('January 15, 2024');
    });

    it('should format date with custom options', () => {
      const date = new Date('2024-01-15');
      const formatted = formatDate(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      expect(formatted).toBe('Jan 15, 2024');
    });

    it('should handle string dates', () => {
      const formatted = formatDate('2024-01-15');
      expect(formatted).toBe('January 15, 2024');
    });

    it('should handle timestamp numbers', () => {
      const timestamp = new Date('2024-01-15').getTime();
      const formatted = formatDate(timestamp);
      expect(formatted).toBe('January 15, 2024');
    });
  });
};

const testGetRelativeTime = () => {
  describe('getRelativeTime', () => {
    it('should return relative time for recent dates', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const fiveMinutesAgo = new Date('2024-01-15T11:55:00Z');

      const relative = getRelativeTime(fiveMinutesAgo, now);
      expect(relative).toBe('5 minutes ago');
    });

    it('should return relative time for future dates', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const inTwoHours = new Date('2024-01-15T14:00:00Z');

      const relative = getRelativeTime(inTwoHours, now);
      expect(relative).toBe('in 2 hours');
    });

    it('should handle seconds', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const thirtySecondsAgo = new Date('2024-01-15T11:59:30Z');

      const relative = getRelativeTime(thirtySecondsAgo, now);
      expect(relative).toBe('30 seconds ago');
    });

    it('should handle days', () => {
      const now = new Date('2024-01-15T12:00:00Z');
      const threeDaysAgo = new Date('2024-01-12T12:00:00Z');

      const relative = getRelativeTime(threeDaysAgo, now);
      expect(relative).toBe('3 days ago');
    });

    it('should use current time as default base', () => {
      // Mock current time
      const mockNow = new Date('2024-01-15T12:00:00Z');
      vi.setSystemTime(mockNow);

      const oneHourAgo = new Date('2024-01-15T11:00:00Z');
      const relative = getRelativeTime(oneHourAgo);
      expect(relative).toBe('1 hour ago');
    });
  });
};

const testIsToday = () => {
  describe('isToday', () => {
    it("should return true for today's date", () => {
      const today = new Date();
      expect(isToday(today)).toBe(true);
    });

    it('should return false for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      expect(isToday(yesterday)).toBe(false);
    });

    it('should return false for tomorrow', () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      expect(isToday(tomorrow)).toBe(false);
    });

    it('should handle string dates', () => {
      const todayString = new Date().toISOString().split('T')[0]!;
      expect(isToday(todayString)).toBe(true);
    });

    it('should handle different times on same day', () => {
      const now = new Date();
      const sameDay = new Date(now);
      sameDay.setHours(23, 59, 59, 999);

      expect(isToday(sameDay)).toBe(true);
    });
  });
};

describe('Date Utilities', () => {
  beforeEach(() => {
    // Reset any date mocks before each test
    vi.useRealTimers();
  });

  testFormatDate();
  testGetRelativeTime();
  testIsToday();
});
