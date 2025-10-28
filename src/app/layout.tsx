import type { Metadata } from 'next';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
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
