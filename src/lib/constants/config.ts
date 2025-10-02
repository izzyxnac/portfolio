/**
 * Application Configuration Constants
 * Centralized configuration management with environment variable validation
 * This file contains all configuration constants for the application
 */

function getEnvNumber(key: string, fallback: number): number {
  const value = process.env[key];
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
}

function getEnvBoolean(key: string, fallback: boolean): boolean {
  const value = process.env[key];
  if (!value) return fallback;
  return value.toLowerCase() === 'true';
}

// Main application configuration object - single source of truth
export const config = {
  // Environment configuration
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
    IS_PRODUCTION: process.env.NODE_ENV === 'production',
    IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
    IS_TEST: process.env.NODE_ENV === 'test',
  },

  // Site configuration
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || '',
    title: process.env.NEXT_PUBLIC_SITE_TITLE || '',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || '',
    url: process.env.NEXT_PUBLIC_SITE_URL || '',
    author: {
      name: process.env.NEXT_PUBLIC_AUTHOR_NAME || '',
      email: process.env.NEXT_PUBLIC_AUTHOR_EMAIL || '',
      github: process.env.NEXT_PUBLIC_AUTHOR_GITHUB || '',
      linkedin: process.env.NEXT_PUBLIC_AUTHOR_LINKEDIN || '',
      twitter: process.env.NEXT_PUBLIC_AUTHOR_TWITTER || '',
      jobTitle: process.env.NEXT_PUBLIC_AUTHOR_JOB_TITLE || '',
    },
    keywords: [
      'AI',
      'ML',
      'Machine Learning',
      'Developer',
      'Portfolio',
      'Enterprise Solutions',
      'React',
      'Next.js',
      'TypeScript',
      'Python',
      'Data Science',
    ],
  },

  // SEO and Meta tags
  meta: {
    keywords: ['AI', 'ML', 'Machine Learning', 'Developer', 'Portfolio', 'Enterprise Solutions'],
    ogType: 'website' as const,
    twitterCard: 'summary_large_image' as const,
  },

  // Security headers configuration
  security: {
    contentTypeOptions: process.env.SECURITY_CONTENT_TYPE_OPTIONS || 'nosniff',
    frameOptions: process.env.SECURITY_FRAME_OPTIONS || 'DENY',
    xssProtection: process.env.SECURITY_XSS_PROTECTION || '1; mode=block',
  },

  // Responsive breakpoints
  breakpoints: {
    mobile: { width: 375, height: 667 },
    tablet: { width: 768, height: 1024 },
    desktop: { width: 1920, height: 1080 },
  },

  // API configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    timeout: getEnvNumber('API_TIMEOUT', 10000),
    retryAttempts: getEnvNumber('API_RETRY_ATTEMPTS', 3),
    retryDelay: getEnvNumber('API_RETRY_DELAY', 1000),
  },

  // Database configuration
  database: {
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
    },
  },

  // Analytics configuration
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
    vercelAnalyticsEnabled: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS || false,
    hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
    // Legacy support
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
  },

  // Email/SMTP configuration
  email: {
    smtp: {
      host: process.env.SMTP_HOST || '',
      port: process.env.SMTP_PORT || 587,
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || '',
    },
  },

  // Feature flags
  features: {
    blog: getEnvBoolean('NEXT_PUBLIC_ENABLE_BLOG', false),
    comments: getEnvBoolean('NEXT_PUBLIC_ENABLE_COMMENTS', false),
    newsletter: getEnvBoolean('NEXT_PUBLIC_ENABLE_NEWSLETTER', false),
    darkMode: getEnvBoolean('NEXT_PUBLIC_ENABLE_DARK_MODE', true),
    animations: getEnvBoolean('NEXT_PUBLIC_ENABLE_ANIMATIONS', true),
  },

  // UI configuration
  ui: {
    defaultTheme: 'dark' as const,
    animationDuration: getEnvNumber('UI_ANIMATION_DURATION', 300),
    debounceDelay: getEnvNumber('UI_DEBOUNCE_DELAY', 300),
    paginationLimit: getEnvNumber('UI_PAGINATION_LIMIT', 10),
    maxFileSize: getEnvNumber('UI_MAX_FILE_SIZE', 5 * 1024 * 1024),
    supportedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] as const,
  },

  // Validation configuration
  validation: {
    minPasswordLength: getEnvNumber('VALIDATION_MIN_PASSWORD_LENGTH', 8),
    maxMessageLength: getEnvNumber('VALIDATION_MAX_MESSAGE_LENGTH', 1000),
    maxSubjectLength: getEnvNumber('VALIDATION_MAX_SUBJECT_LENGTH', 100),
    maxNameLength: getEnvNumber('VALIDATION_MAX_NAME_LENGTH', 50),
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phoneRegex: /^\+?[\d\s\-\(\)]+$/,
  },

  // Cache configuration
  cache: {
    defaultTtl: getEnvNumber('CACHE_DEFAULT_TTL', 60 * 60),
    staticContentTtl: getEnvNumber('CACHE_STATIC_CONTENT_TTL', 24 * 60 * 60),
    apiCacheTtl: getEnvNumber('CACHE_API_TTL', 5 * 60),
    imageCacheTtl: getEnvNumber('CACHE_IMAGE_TTL', 7 * 24 * 60 * 60),
  },

  // Error handling and logging configuration
  error: {
    sentryDsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    logLevel: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
    enableErrorReporting: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING || false,
  },
} as const;

export const ERROR_CONFIG = {
  SENTRY_DSN: config.error.sentryDsn,
  LOG_LEVEL: config.error.logLevel,
  ENABLE_ERROR_REPORTING: config.error.enableErrorReporting,
} as const;

// Environment validation
export function validateEnvironment(): void {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_SITE_NAME',
    'NEXT_PUBLIC_SITE_TITLE',
    'NEXT_PUBLIC_SITE_DESCRIPTION',
    'NEXT_PUBLIC_AUTHOR_NAME',
    'NEXT_PUBLIC_AUTHOR_EMAIL',
    'NEXT_PUBLIC_AUTHOR_GITHUB',
    'NEXT_PUBLIC_AUTHOR_LINKEDIN',
    'NEXT_PUBLIC_AUTHOR_TWITTER',
    'NEXT_PUBLIC_API_URL',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'NEXT_PUBLIC_GA_ID',
    'NEXT_PUBLIC_VERCEL_ANALYTICS',
    'NEXT_PUBLIC_HOTJAR_ID',
    'NEXT_PUBLIC_ANALYTICS_ID',
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'NEXT_PUBLIC_SENTRY_DSN',
    'NEXT_PUBLIC_LOG_LEVEL',
    'NEXT_PUBLIC_ENABLE_ERROR_REPORTING',
    'VERCEL_PROTECTION_BYPASS',
    // Add other required environment variables here
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Configuration validation
export function validateConfig(): void {
  validateEnvironment();

  // Additional config validation can be added here
  if (config.site.url.includes('localhost') && config.env.IS_PRODUCTION) {
    console.warn('Warning: Using localhost URL in production environment');
  }
}

// Type exports for better TypeScript support
export type Config = typeof config;
export type SiteConfig = typeof config.site;
export type AnalyticsConfig = typeof config.analytics;
export type FeatureFlags = typeof config.features;
