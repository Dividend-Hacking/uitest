/**
 * Formatting Utilities
 *
 * These functions handle formatting of currency, dates, numbers, and
 * percentages throughout the dashboard. Consistent formatting improves
 * readability and user experience.
 */

/**
 * Formats a number as USD currency.
 * @param value - The numeric value to format
 * @param options - Optional Intl.NumberFormat options to override defaults
 * @returns Formatted currency string (e.g., "$1,234.56")
 */
export function formatCurrency(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(value);
}

/**
 * Formats a number with compact notation for large values.
 * @param value - The numeric value to format
 * @returns Compact formatted string (e.g., "1.2M", "45K")
 */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Formats a number with comma separators.
 * @param value - The numeric value to format
 * @returns Formatted string with commas (e.g., "1,234,567")
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Formats a number as a percentage.
 * @param value - The numeric value (e.g., 12.5 for 12.5%)
 * @param includeSign - Whether to include + sign for positive values
 * @returns Formatted percentage string (e.g., "+12.5%", "-3.2%")
 */
export function formatPercent(value: number, includeSign = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * Formats a date as a relative time string.
 * @param date - The date to format
 * @returns Relative time string (e.g., "2 hours ago", "Yesterday")
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return 'Just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return formatDate(date);
  }
}

/**
 * Formats a date in a readable format.
 * @param date - The date to format
 * @param options - Optional Intl.DateTimeFormat options
 * @returns Formatted date string (e.g., "Nov 25, 2024")
 */
export function formatDate(
  date: Date,
  options?: Intl.DateTimeFormatOptions
): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(date);
}

/**
 * Formats a date in short format for tables.
 * @param date - The date to format
 * @returns Short formatted date string (e.g., "11/25/24")
 */
export function formatDateShort(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit',
  }).format(date);
}

/**
 * Calculates and formats the percentage change between two values.
 * @param current - The current value
 * @param previous - The previous value for comparison
 * @returns Formatted percentage change string
 */
export function calculatePercentChange(current: number, previous: number): string {
  const change = ((current - previous) / previous) * 100;
  return formatPercent(change);
}

/**
 * Truncates text to a maximum length with ellipsis.
 * @param text - The text to truncate
 * @param maxLength - Maximum character length
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 3)}...`;
}
