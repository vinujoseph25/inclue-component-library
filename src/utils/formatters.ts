import intl from 'react-intl-universal';

/**
 * Format currency value
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  locale?: string
): string => {
  try {
    // Use native Intl API for currency formatting
    return new Intl.NumberFormat(locale || getCurrentLocale() || 'en-US', {
      style: 'currency',
      currency,
    }).format(value);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return value.toString();
  }
};

/**
 * Format percentage value
 */
export const formatPercentage = (value: number, decimals: number = 2, locale?: string): string => {
  try {
    return new Intl.NumberFormat(locale || getCurrentLocale() || 'en-US', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  } catch (error) {
    console.error('Error formatting percentage:', error);
    return `${value}%`;
  }
};

/**
 * Format number with locale-specific formatting
 */
export const formatNumber = (
  value: number,
  options?: Intl.NumberFormatOptions,
  locale?: string
): string => {
  try {
    return new Intl.NumberFormat(locale || getCurrentLocale() || 'en-US', options).format(value);
  } catch (error) {
    console.error('Error formatting number:', error);
    return value.toString();
  }
};

/**
 * Format date with locale-specific formatting
 */
export const formatDate = (
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat(locale || getCurrentLocale() || 'en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return new Date(value).toLocaleDateString();
  }
};

/**
 * Format time with locale-specific formatting
 */
export const formatTime = (
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions,
  locale?: string
): string => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat(locale || getCurrentLocale() || 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
      ...options,
    }).format(date);
  } catch (error) {
    console.error('Error formatting time:', error);
    return new Date(value).toLocaleTimeString();
  }
};

/**
 * Format relative time (e.g., "2 hours ago", "in 3 days")
 */
export const formatRelativeTime = (value: Date | number, locale?: string): string => {
  try {
    const date = new Date(value);
    const now = new Date();
    const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);

    // Use Intl.RelativeTimeFormat for relative time formatting
    const rtf = new Intl.RelativeTimeFormat(locale || getCurrentLocale() || 'en-US', {
      numeric: 'auto',
    });

    const absDiff = Math.abs(diffInSeconds);

    if (absDiff < 60) {
      return rtf.format(diffInSeconds, 'second');
    } else if (absDiff < 3600) {
      return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
    } else if (absDiff < 86400) {
      return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
    } else if (absDiff < 2592000) {
      return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
    } else if (absDiff < 31536000) {
      return rtf.format(Math.floor(diffInSeconds / 2592000), 'month');
    } else {
      return rtf.format(Math.floor(diffInSeconds / 31536000), 'year');
    }
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return new Date(value).toLocaleDateString();
  }
};

/**
 * Get current locale from react-intl-universal
 */
const getCurrentLocale = (): string | undefined => {
  try {
    const options = intl.getInitOptions();
    return options?.currentLocale;
  } catch (error) {
    return undefined;
  }
};

/**
 * Format file size in human-readable format
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Format duration in human-readable format
 */
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  } else {
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number, suffix: string = '...'): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - suffix.length) + suffix;
};

/**
 * Capitalize first letter
 */
export const capitalize = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Title case formatting
 */
export const toTitleCase = (text: string): string => {
  return text.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
};
