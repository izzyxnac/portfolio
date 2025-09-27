// String Utility Functions
// This file contains utility functions for string manipulation and formatting

/**
 * Convert string to slug format (lowercase, hyphenated)
 * @param text - The text to convert
 * @returns Slugified string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s_/]+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalize the first letter of a string
 * @param text - The text to capitalize
 * @returns Capitalized string
 */
export function capitalize(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Convert string to title case
 * @param text - The text to convert
 * @returns Title case string
 */
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(/(\s+|\/+)/)
    .map(part => {
      if (/\s|\//.test(part)) return part;
      return capitalize(part);
    })
    .join('');
}

/**
 * Truncate text to specified length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length before truncation
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string
 */
export function truncate(text: string, maxLength: number, suffix = '...'): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - suffix.length) + suffix;
}

/**
 * Extract reading time estimate from text
 * @param text - The text to analyze
 * @param wordsPerMinute - Average reading speed (default: 200)
 * @returns Reading time in minutes
 */
export function getReadingTime(text: string, wordsPerMinute = 200): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
