// Early polyfills for webidl-conversions compatibility
// This file runs before any other imports to ensure global objects are available

// Type declarations for global polyfills
declare global {
  interface Global {
    globalThis?: typeof globalThis;
  }
  
  interface GlobalThis {
    global?: typeof globalThis;
    WeakMap?: typeof WeakMap;
    Symbol?: typeof Symbol;
    Map?: typeof Map;
  }
}

// Ensure globalThis is available
if (typeof globalThis === 'undefined') {
  // In Node.js environments where globalThis might not be defined
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
