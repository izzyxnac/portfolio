import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import '@/styles/globals/typography.css';
import { config } from '@/lib/constants/config';
import { Header } from '@/components/layout';
import { SkipNavigation } from '@/components/common';
import { ThemeProvider } from '@/components/layout/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: config.site.title,
  description: config.site.description,
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    type: 'website',
  },
  metadataBase: new URL(config.site.url),
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: config.site.author.name,
  url: config.site.url,
  jobTitle: config.site.author.jobTitle,
  email: config.site.author.email,
  sameAs: [config.site.author.github, config.site.author.linkedin],
  description: config.site.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce') ?? headersList.get('x-csp-nonce') ?? undefined;

  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider
          defaultTheme='system'
          storageKey='portfolio-theme'
          enableSystem
          disableTransitionOnChange={false}
          attribute='class'
        >
          <SkipNavigation />
          <Header />
          <main id='main-content'>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
