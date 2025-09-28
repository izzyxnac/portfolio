/**
 * Minimal fetch polyfill for Vitest in Node 18 + JSDOM
 *
 * Uses undici for consistency, but types are bridged to DOM lib
 */
import {
  fetch as undiciFetch,
  Headers as UndiciHeaders,
  Request as UndiciRequest,
  Response as UndiciResponse,
} from 'undici';

declare global {
  interface Window {
    fetch: typeof fetch;
    Headers: typeof Headers;
    Request: typeof Request;
    Response: typeof Response;
  }
}

if (!globalThis.fetch) {
  globalThis.fetch = undiciFetch as unknown as typeof fetch;
  globalThis.Headers = UndiciHeaders as unknown as typeof Headers;
  globalThis.Request = UndiciRequest as unknown as typeof Request;
  globalThis.Response = UndiciResponse as unknown as typeof Response;
}

export {};
