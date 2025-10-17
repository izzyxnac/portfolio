// Route Constants
// This file contains all application route constants

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/[slug]',
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  CONTACT: '/contact',
  CONTACT_THANK_YOU: '/contact/thank-you',
} as const;

export const API_ROUTES = {
  CONTACT: '/api/contact',
  NEWSLETTER: '/api/subscribe',
  ANALYTICS: '/api/analytics',
  SEARCH: '/api/search',
} as const;

// Dynamic route helpers
export const getProjectUrl = (slug: string): string => `/projects/${slug}`;
export const getBlogPostUrl = (slug: string): string => `/blog/${slug}`;

// External routes
export const EXTERNAL_ROUTES = {
  GITHUB: 'https://github.com',
  LINKEDIN: 'https://linkedin.com/in',
  TWITTER: 'https://twitter.com',
  EMAIL: 'mailto:',
} as const;

// Navigation items for header
export const NAVIGATION_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    href: ROUTES.HOME,
    icon: 'Home',
  },
  {
    id: 'about',
    label: 'About',
    href: ROUTES.ABOUT,
    icon: 'User',
  },
  {
    id: 'projects',
    label: 'Projects',
    href: ROUTES.PROJECTS,
    icon: 'FolderOpen',
  },
  {
    id: 'blog',
    label: 'Blog',
    href: ROUTES.BLOG,
    icon: 'BookOpen',
  },
  {
    id: 'contact',
    label: 'Contact',
    href: ROUTES.CONTACT,
    icon: 'Mail',
  },
];

// Route metadata
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Home',
    description: 'AI/ML Engineer & Full Stack Developer Portfolio',
  },
  [ROUTES.ABOUT]: {
    title: 'About',
    description: 'Learn more about my background and experience',
  },
  [ROUTES.PROJECTS]: {
    title: 'Projects',
    description: 'Explore my portfolio of AI/ML and web development projects',
  },
  [ROUTES.BLOG]: {
    title: 'Blog',
    description: 'Articles about AI/ML, web development, and technology',
  },
  [ROUTES.CONTACT]: {
    title: 'Contact',
    description: 'Get in touch for collaboration opportunities',
  },
} as const;
