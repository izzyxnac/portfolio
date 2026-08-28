import type { Metadata } from 'next';
import { config } from '@/lib/constants/config';

export const metadata: Metadata = {
  title: `Security Policy | ${config.site.name}`,
  description: `Security policy for ${config.site.url} - responsible disclosure, contact, and scope.`,
  alternates: { canonical: `${config.site.url}/security` },
};

export default function SecurityPage() {
  return (
    <main className='container mx-auto max-w-3xl px-4 pt-32 pb-24'>
      <h1 className='text-4xl font-bold tracking-tight'>Security Policy</h1>
      <p className='text-muted-foreground mt-4 text-lg'>
        Responsible disclosure for {config.site.url}
      </p>

      <section className='prose prose-neutral dark:prose-invert mt-10 max-w-none'>
        <h2>Contact</h2>
        <p>
          Email: <a href='mailto:izzyxnac@gmail.com'>izzyxnac@gmail.com</a> (also listed in{' '}
          <a href='/.well-known/security.txt'>/.well-known/security.txt</a>)
        </p>
        <p>Expires: 2027-01-01T00:00:00.000Z</p>

        <h2>Scope</h2>
        <p>
          <code>https://portfolio.naciri.me</code> — static Next.js App Router portfolio behind nginx on
          Azure (20.250.161.13). No authentication, no uploads, no cookies. Security headers: HSTS
          (<code>max-age=63072000; preload</code>), <code>X-Frame-Options: DENY</code>,{' '}
          <code>X-Content-Type-Options: nosniff</code>, <code>Referrer-Policy: strict-origin-when-cross-origin</code>,{' '}
          <code>Permissions-Policy</code> (camera/mic/geo disabled), and per-request nonce CSP (
          <code>script-src &apos;self&apos; &apos;nonce-...&apos; &apos;strict-dynamic&apos;</code>).
        </p>

        <h2>Safe harbor</h2>
        <p>
          Good-faith research is welcomed. Do not exfiltrate, degrade, or access non-public data. Allow
          reasonable time to remediate before disclosure.
        </p>

        <h2>Out of scope</h2>
        <ul>
          <li>Clickjacking on static content (mitigated by <code>frame-ancestors &apos;none&apos;</code>)</li>
          <li>
            Missing <code>COOP</code>/<code>COEP</code>/<code>CORP</code> — not needed for static portfolio
          </li>
        </ul>

        <p className='text-muted-foreground text-sm'>
          Canonical: <a href={`${config.site.url}/.well-known/security.txt`}>{config.site.url}/.well-known/security.txt</a> · Hiring: <a href='/contact'>/contact</a>
        </p>
      </section>
    </main>
  );
}
