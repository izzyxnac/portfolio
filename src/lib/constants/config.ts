// Application Configuration Constants
// This file contains configuration constants for the application

// Site configuration
export const SITE_CONFIG = {
  name: 'AI/ML Portfolio',
  title: 'AI/ML Engineer & Full Stack Developer',
  description: 'Portfolio showcasing AI/ML projects, web development work, and technical expertise',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  author: {
    name: 'Your Name',
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
  },
  keywords: [
    'AI',
    'Machine Learning',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Data Science',
  ],
} as const;

// Environment configuration
export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_TEST: process.env.NODE_ENV === 'test',
} as const;

// API configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Database configuration (if using client-side database operations)
export const DB_CONFIG = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
} as const;

// Analytics configuration
export const ANALYTICS_CONFIG = {
  GOOGLE_ANALYTICS_ID: process.env.NEXT_PUBLIC_GA_ID,
  VERCEL_ANALYTICS_ENABLED: process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === 'true',
  HOTJAR_ID: process.env.NEXT_PUBLIC_HOTJAR_ID,
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_BLOG: process.env.NEXT_PUBLIC_ENABLE_BLOG === 'true',
  ENABLE_COMMENTS: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',
  ENABLE_NEWSLETTER: process.env.NEXT_PUBLIC_ENABLE_NEWSLETTER === 'true',
  ENABLE_DARK_MODE: process.env.NEXT_PUBLIC_ENABLE_DARK_MODE !== 'false',
  ENABLE_ANIMATIONS: process.env.NEXT_PUBLIC_ENABLE_ANIMATIONS !== 'false',
} as const;

// UI configuration
export const UI_CONFIG = {
  DEFAULT_THEME: 'light' as const,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  PAGINATION_LIMIT: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024,
  SUPPORTED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
} as const;

// Validation configuration
export const VALIDATION_CONFIG = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 1000,
  MAX_SUBJECT_LENGTH: 100,
  MAX_NAME_LENGTH: 50,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]+$/,
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  DEFAULT_TTL: 60 * 60,
  STATIC_CONTENT_TTL: 24 * 60 * 60,
  API_CACHE_TTL: 5 * 60,
  IMAGE_CACHE_TTL: 7 * 24 * 60 * 60,
} as const;

// Error configuration
export const ERROR_CONFIG = {
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  ENABLE_ERROR_REPORTING: process.env.NEXT_PUBLIC_ENABLE_ERROR_REPORTING === 'true',
} as const;

// Validate required environment variables
export function validateEnvironment(): void {
  const requiredEnvVars = ['NEXT_PUBLIC_SITE_URL'];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}
