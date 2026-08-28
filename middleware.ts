import { NextRequest, NextResponse } from 'next/server';

/**
 * Nonce-based CSP middleware for portfolio.naciri.me
 * Generates per-request nonce and sets strict CSP:
 * - script-src 'self' 'nonce-<random>' 'strict-dynamic' (removes unsafe-inline + unsafe-eval)
 * - style-src 'self' 'unsafe-inline' (Tailwind requires it)
 * - Hardened directives: object-src none, base-uri self, etc.
 * See: https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
 */
export function middleware(request: NextRequest) {
  // Generate cryptographically random nonce (32 hex chars)
  const nonce = crypto.randomUUID().replaceAll('-', '');

  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    'upgrade-insecure-requests',
  ].join('; ');

  // Propagate nonce to downstream (layout.tsx reads via headers())
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('x-csp-nonce', nonce);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  // Security headers (defence in depth - also set in next.config.ts for static assets)
  response.headers.set('Content-Security-Policy', csp);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.headers.set('x-nonce', nonce);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (handled separately)
     * - _next/static, _next/image, favicon.ico (static assets)
     * - files with extensions (images, etc)
     * Include prefetch headers exclusion per Next.js docs
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
