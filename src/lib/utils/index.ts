// Utility Functions Barrel Export
// This file exports all utility functions for easy importing

// Re-export all utility functions
export * from './date';
export * from './string';
export * from './validation';
export * from './formatting';

// Also re-export the cn utility function if it exists in utils.ts
// This maintains backward compatibility
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
