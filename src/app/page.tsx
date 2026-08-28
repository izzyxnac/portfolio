import type { Metadata } from 'next';
import { HomePage } from './HomePage';
import { config } from '@/lib/constants/config';

export const metadata: Metadata = {
  title: `${config.site.title}`,
  description: config.site.description,
  keywords: [...config.site.keywords],
  openGraph: {
    title: config.site.title,
    description: config.site.description,
    url: config.site.url,
    siteName: config.site.name,
    images: [
      {
        url: `${config.site.url}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: config.site.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.site.title,
    description: config.site.description,
    creator: '@izzyxnac',
  },
  alternates: {
    canonical: config.site.url,
  },
};

export default function Page() {
  return <HomePage />;
}
