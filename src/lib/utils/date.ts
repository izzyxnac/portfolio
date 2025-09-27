// Date Utility Functions
// This file contains utility functions for date manipulation and formatting

/**
 * Format a date to a readable string
 * @param date - The date to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string | number,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Get relative time string (e.g., "2 days ago", "in 3 hours")
 * @param date - The date to compare
 * @param baseDate - The base date to compare against (defaults to now)
 * @returns Relative time string
 */
export function getRelativeTime(date: Date | string | number, baseDate: Date = new Date()): string {
  const dateObj = new Date(date);
  const diffInSeconds = Math.floor((baseDate.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

  if (Math.abs(diffInSeconds) < 60) {
    return rtf.format(-diffInSeconds, 'second');
  } else if (Math.abs(diffInSeconds) < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute');
  } else if (Math.abs(diffInSeconds) < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour');
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day');
  }
}

/**
 * Check if a date is today
 * @param date - The date to check
 * @returns True if the date is today
 */
export function isToday(date: Date | string | number): boolean {
  const dateObj = new Date(date);
  const today = new Date();

  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
}
