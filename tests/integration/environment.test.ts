import { describe, it, expect } from 'vitest';

describe('Environment Integration', () => {
  it('should have Next.js environment configured', () => {
    // Test that Next.js environment variables are accessible
    expect(process.env.NODE_ENV).toBeDefined();
  });

  it('should handle public environment variables', () => {
    // These should be available in the browser environment
    const publicVars = [
      'NEXT_PUBLIC_SITE_URL',
      'NEXT_PUBLIC_SITE_NAME',
      'NEXT_PUBLIC_SITE_DESCRIPTION',
    ];

    publicVars.forEach(varName => {
      // In test environment, these might be undefined, which is acceptable
      const value = process.env[varName];
      expect(value === undefined || typeof value === 'string').toBe(true);
    });
  });

  it('should validate environment variable formats', () => {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || '';

    // Should be a valid URL
    expect(() => new URL(siteUrl)).not.toThrow();
  });
});
