import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Polyfill for webidl-conversions compatibility
Object.defineProperty(globalThis, 'globalThis', {
  value: globalThis,
  writable: true,
  enumerable: true,
  configurable: true,
});

// Ensure global is defined for Node.js compatibility
if (typeof global === 'undefined') {
  (globalThis as typeof globalThis & { global: typeof globalThis }).global = globalThis;
}

// Clean up after each test
afterEach(() => {
  cleanup();
});
