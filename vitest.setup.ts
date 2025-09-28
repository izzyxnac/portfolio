import '@testing-library/jest-dom';
import { afterEach, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';

// Type declarations for global polyfills
declare global {
  interface GlobalThis {
    WeakMap?: typeof WeakMap;
    Symbol?: typeof Symbol;
    global?: typeof globalThis;
    globalThis?: typeof globalThis;
  }
}

// Enhanced polyfills for webidl-conversions and whatwg-url compatibility
beforeAll(() => {
  // Ensure globalThis is properly defined
  if (typeof globalThis === 'undefined') {
    (global as GlobalThis).globalThis = global;
  }

  // Ensure global is defined for Node.js compatibility
  if (typeof global === 'undefined') {
    (globalThis as GlobalThis).global = globalThis;
  }

  // Add WeakMap polyfill if missing (required by webidl-conversions)
  if (typeof WeakMap === 'undefined') {
    interface WeakMapItem {
      key: object;
      value: unknown;
    }

    class WeakMapPolyfill {
      private items: WeakMapItem[] = [];

      set(key: object, value: unknown): this {
        this.items.push({ key, value });
        return this;
      }

      get(key: object): unknown {
        const item = this.items.find(item => item.key === key);
        return item ? item.value : undefined;
      }

      has(key: object): boolean {
        return this.items.some(item => item.key === key);
      }

      delete(key: object): boolean {
        const index = this.items.findIndex(item => item.key === key);
        if (index !== -1) {
          this.items.splice(index, 1);
          return true;
        }
        return false;
      }
    }

    (globalThis as GlobalThis).WeakMap = WeakMapPolyfill as unknown as typeof WeakMap;
  }

  // Ensure Symbol is available
  if (typeof Symbol === 'undefined') {
    const SymbolPolyfill = {
      iterator: '@@iterator',
      toStringTag: '@@toStringTag',
      for: (key: string): string => `@@${key}`,
    };

    (globalThis as GlobalThis).Symbol = SymbolPolyfill as unknown as typeof Symbol;
  }
});

// Clean up after each test
afterEach(() => {
  cleanup();
});
