/**
 * Node.js globals polyfills for webidl-conversions compatibility
 * Based on Apollo Client's approach for JSDOM testing
 * These polyfills must be in exact order for proper dependency resolution
 */

// Type declarations for global polyfills
declare global {
  interface Global {
    globalThis?: typeof globalThis;
    TextEncoder?: typeof TextEncoder;
    TextDecoder?: typeof TextDecoder;
    performance?: typeof performance;
  }

  interface GlobalThis {
    global?: typeof globalThis;
    WeakMap?: typeof WeakMap;
    Symbol?: typeof Symbol;
    Map?: typeof Map;
    TextEncoder?: typeof TextEncoder;
    TextDecoder?: typeof TextDecoder;
    performance?: typeof performance;
  }
}

// Polyfill Node.js globals required for webidl-conversions
// Order is critical - TextEncoder/TextDecoder must come first
if (typeof TextEncoder === 'undefined') {
  // Fallback TextEncoder/TextDecoder implementation
  (globalThis as GlobalThis).TextEncoder = class TextEncoder {
    encode(input = ''): Uint8Array {
      const bytes = new Uint8Array(input.length);
      for (let i = 0; i < input.length; i++) {
        bytes[i] = input.charCodeAt(i);
      }
      return bytes;
    }
  } as typeof TextEncoder;

  (globalThis as GlobalThis).TextDecoder = class TextDecoder {
    decode(input?: BufferSource): string {
      if (!input) return '';
      const bytes = new Uint8Array(input as ArrayBuffer);
      return String.fromCharCode(...bytes);
    }
  } as typeof TextDecoder;
}

// Polyfill performance if missing
if (typeof performance === 'undefined') {
  // Fallback performance implementation
  (globalThis as GlobalThis).performance = {
    now: () => Date.now(),
  } as typeof performance;
}

// Ensure globalThis is available
if (typeof globalThis === 'undefined') {
  (global as Global).globalThis = global;
}

// Ensure global is available
if (typeof global === 'undefined') {
  (globalThis as GlobalThis).global = globalThis;
}

// WeakMap polyfill - critical for webidl-conversions
if (typeof WeakMap === 'undefined') {
  interface WeakMapItem {
    key: object;
    value: unknown;
  }

  class WeakMapPolyfill {
    private items: WeakMapItem[] = [];

    set(key: object, value: unknown): this {
      // Remove existing entry if it exists
      const existingIndex = this.items.findIndex(item => item.key === key);
      if (existingIndex !== -1) {
        const existingItem = this.items[existingIndex];
        if (existingItem) {
          existingItem.value = value;
        }
      } else {
        this.items.push({ key, value });
      }
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

// Symbol polyfill
if (typeof Symbol === 'undefined') {
  const SymbolPolyfill = {
    iterator: '@@iterator',
    toStringTag: '@@toStringTag',
    for: (key: string): string => `@@${key}`,
    keyFor: (sym: string | symbol): string | undefined => {
      if (typeof sym === 'string' && sym.startsWith('@@')) {
        return sym.slice(2);
      }
      return undefined;
    },
  };

  (globalThis as GlobalThis).Symbol = SymbolPolyfill as unknown as typeof Symbol;
}

// Ensure Map is available (sometimes needed alongside WeakMap)
if (typeof Map === 'undefined') {
  class MapPolyfill<K = unknown, V = unknown> {
    private items: Array<[K, V]> = [];

    set(key: K, value: V): this {
      const existingIndex = this.items.findIndex(([k]) => k === key);
      if (existingIndex !== -1) {
        const existingItem = this.items[existingIndex];
        if (existingItem) {
          existingItem[1] = value;
        }
      } else {
        this.items.push([key, value]);
      }
      return this;
    }

    get(key: K): V | undefined {
      const item = this.items.find(([k]) => k === key);
      return item ? item[1] : undefined;
    }

    has(key: K): boolean {
      return this.items.some(([k]) => k === key);
    }

    delete(key: K): boolean {
      const index = this.items.findIndex(([k]) => k === key);
      if (index !== -1) {
        this.items.splice(index, 1);
        return true;
      }
      return false;
    }

    clear(): void {
      this.items = [];
    }

    get size(): number {
      return this.items.length;
    }
  }

  (globalThis as GlobalThis).Map = MapPolyfill as unknown as typeof Map;
}

// Export empty object to make this a module
export {};
