// SEO Constants
// This file contains SEO-related constants and configurations

import { SITE_CONFIG } from './config';

// Default SEO configuration
export const DEFAULT_SEO = {
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  keywords: SITE_CONFIG.keywords,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: `${SITE_CONFIG.url}/images/og-default.jpg`,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.title,
      },
    ],
  },
  twitter: {
    handle: '@yourusername',
    site: '@yourusername',
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
    title: `${SITE_CONFIG.title} | Portfolio`,
    description:
      'Experienced AI/ML Engineer and Full Stack Developer specializing in intelligent web applications and data-driven solutions.',
    keywords: [...SITE_CONFIG.keywords, 'portfolio', 'hire', 'freelance'],
  },
  about: {
    title: `About | ${SITE_CONFIG.name}`,
    description:
      'Learn about my journey in AI/ML and web development, my technical expertise, and professional experience.',
    keywords: [...SITE_CONFIG.keywords, 'about', 'experience', 'skills', 'background'],
  },
  projects: {
    title: `Projects | ${SITE_CONFIG.name}`,
    description:
      'Explore my portfolio of AI/ML projects, web applications, and technical solutions that solve real-world problems.',
    keywords: [...SITE_CONFIG.keywords, 'projects', 'portfolio', 'case studies', 'work'],
  },
  blog: {
    title: `Blog | ${SITE_CONFIG.name}`,
    description:
      'Technical articles, tutorials, and insights about AI/ML, web development, and emerging technologies.',
    keywords: [...SITE_CONFIG.keywords, 'blog', 'articles', 'tutorials', 'insights'],
  },
  contact: {
    title: `Contact | ${SITE_CONFIG.name}`,
    description:
      'Get in touch for collaboration opportunities, project inquiries, or technical consulting.',
    keywords: [...SITE_CONFIG.keywords, 'contact', 'hire', 'collaboration', 'consulting'],
  },
} as const;

// Structured data schemas
export const STRUCTURED_DATA = {
  person: {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author.name,
    url: SITE_CONFIG.url,
    email: SITE_CONFIG.author.email,
    jobTitle: 'AI/ML Engineer & Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.linkedin, SITE_CONFIG.author.twitter],
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
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    author: {
      '@type': 'Person',
      name: SITE_CONFIG.author.name,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.author.email,
      contactType: 'customer service',
    },
    sameAs: [SITE_CONFIG.author.github, SITE_CONFIG.author.linkedin, SITE_CONFIG.author.twitter],
  },
} as const;

// SEO utility functions
export const generatePageTitle = (pageTitle?: string): string => {
  if (!pageTitle) return SITE_CONFIG.title;
  return `${pageTitle} | ${SITE_CONFIG.name}`;
};

export const generatePageDescription = (pageDescription?: string): string => {
  return pageDescription || SITE_CONFIG.description;
};

export const generateCanonicalUrl = (path: string): string => {
  return `${SITE_CONFIG.url}${path}`;
};

export const generateOGImage = (title?: string, description?: string): string => {
  const params = new URLSearchParams();
  if (title) params.set('title', title);
  if (description) params.set('description', description);

  return `${SITE_CONFIG.url}/api/og?${params.toString()}`;
};
