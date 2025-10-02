// SEO Constants
// This file contains SEO-related constants and configurations

import { config } from '@/lib/constants/config';

// Default SEO configuration
export const DEFAULT_SEO = {
  title: config.site.title,
  description: config.site.description,
  keywords: config.site.keywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: config.site.url,
    siteName: config.site.name,
    title: config.site.title,
    description: config.site.description,
    images: [
      {
        url: `${config.site.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: config.site.title,
      },
    ],
  },
  twitter: {
    handle: config.site.author.twitter,
    site: config.site.author.twitter,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'theme-color',
      content: '#000000',
    },
    {
      name: 'msapplication-TileColor',
      content: '#000000',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
} as const;

// Page-specific SEO configurations
export const PAGE_SEO = {
  home: {
    title: `${config.site.title} | Portfolio`,
    description: config.site.description,
    keywords: [...config.site.keywords, 'portfolio', 'hire', 'freelance'],
  },
  about: {
    title: `About | ${config.site.name}`,
    description: config.site.description,
    keywords: [...config.site.keywords, 'about', 'experience', 'skills', 'background'],
  },
  projects: {
    title: `Projects | ${config.site.name}`,
    description: config.site.description,
    keywords: [...config.site.keywords, 'projects', 'portfolio', 'case studies', 'work'],
  },
  blog: {
    title: `Blog | ${config.site.name}`,
    description: config.site.description,
    keywords: [...config.site.keywords, 'blog', 'articles', 'tutorials', 'insights'],
  },
  contact: {
    title: `Contact | ${config.site.name}`,
    description: config.site.description,
    keywords: [...config.site.keywords, 'contact', 'hire', 'collaboration', 'consulting'],
  },
} as const;

// Structured data schemas
export const STRUCTURED_DATA = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.site.author.name,
    url: config.site.url,
    email: config.site.author.email,
    jobTitle: config.site.author.jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [config.site.author.github, config.site.author.linkedin, config.site.author.twitter],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Web Development',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Data Science',
    ],
  },
  website: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.site.name,
    url: config.site.url,
    description: config.site.description,
    author: {
      '@type': 'Person',
      name: config.site.author.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${config.site.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.site.name,
    url: config.site.url,
    logo: `${config.site.url}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: config.site.author.email,
      contactType: 'customer service',
    },
    sameAs: [config.site.author.github, config.site.author.linkedin, config.site.author.twitter],
  },
} as const;

// SEO utility functions
export const generatePageTitle = (pageTitle?: string): string => {
  if (!pageTitle) return config.site.title;
  return `${pageTitle} | ${config.site.name}`;
};

export const generatePageDescription = (pageDescription?: string): string => {
  return pageDescription || config.site.description;
};

export const generateCanonicalUrl = (path: string): string => {
  return `${config.site.url}${path}`;
};

export const generateOGImage = (title?: string, description?: string): string => {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (description) params.set('description', description);

  return `${config.site.url}/api/og?${params.toString()}`;
};
