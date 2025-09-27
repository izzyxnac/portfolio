/**
 * Application configuration
 * Centralized configuration management with environment variable validation
 */

function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key];
  
  if (!value || value.trim() === '') {
    if (fallback !== undefined) {
      return fallback;
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }
  
  return value.trim();
}

export const config = {
  site: {
    name: getEnvVar('NEXT_PUBLIC_SITE_NAME'),
    description: getEnvVar('NEXT_PUBLIC_SITE_DESCRIPTION'),
    url: getEnvVar('NEXT_PUBLIC_SITE_URL'),
  },
  analytics: {
    id: getEnvVar('NEXT_PUBLIC_ANALYTICS_ID', ''),
  },
  supabase: {
    url: getEnvVar('NEXT_PUBLIC_SUPABASE_URL', ''),
    anonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY', ''),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY', ''),
  },
  smtp: {
    host: getEnvVar('SMTP_HOST', ''),
    port: getEnvVar('SMTP_PORT', '587'),
    user: getEnvVar('SMTP_USER', ''),
    pass: getEnvVar('SMTP_PASS', ''),
  },
} as const;
