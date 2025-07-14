import intl from 'react-intl-universal';

export interface LocalizationConfig {
  locale: string;
  messages: Record<string, any>;
  fallbackLocale?: string;
}

/**
 * Initialize react-intl-universal with the provided configuration
 */
export const initializeLocalization = async (config: LocalizationConfig): Promise<void> => {
  try {
    await intl.init({
      currentLocale: config.locale,
      locales: {
        [config.locale]: config.messages,
      },
      fallbackLocale: config.fallbackLocale || 'en',
      escapeHtml: false,
    });
  } catch (error) {
    console.error('Failed to initialize localization:', error);
    throw error;
  }
};

/**
 * Custom hook for component translations with namespace support
 */
export const useComponentTranslation = (namespace: string) => {
  return {
    t: (key: string, options?: any) => {
      const fullKey = `components.${namespace}.${key}`;
      return intl.get(fullKey, options);
    },
    // Use native Intl API instead of intl methods that don't exist
    formatMessage: (descriptor: any, values?: any) => {
      return intl.get(descriptor.id || descriptor.key, {
        ...values,
        defaultMessage: descriptor.defaultMessage,
      });
    },
    formatNumber: (value: number, options?: Intl.NumberFormatOptions) => {
      const locale = getCurrentLocale();
      return new Intl.NumberFormat(locale, options).format(value);
    },
    formatDate: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      const locale = getCurrentLocale();
      return new Intl.DateTimeFormat(locale, options).format(new Date(value));
    },
    formatTime: (value: Date | number, options?: Intl.DateTimeFormatOptions) => {
      const locale = getCurrentLocale();
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        ...options,
      }).format(new Date(value));
    },
    formatRelative: (value: Date | number) => {
      const locale = getCurrentLocale();
      const date = new Date(value);
      const now = new Date();
      const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000);
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

      const absDiff = Math.abs(diffInSeconds);
      if (absDiff < 60) return rtf.format(diffInSeconds, 'second');
      if (absDiff < 3600) return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
      if (absDiff < 86400) return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
      if (absDiff < 2592000) return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
      if (absDiff < 31536000) return rtf.format(Math.floor(diffInSeconds / 2592000), 'month');
      return rtf.format(Math.floor(diffInSeconds / 31536000), 'year');
    },
    formatPlural: (value: number, options: { one: string; other: string; zero?: string }) => {
      const locale = getCurrentLocale();
      const pr = new Intl.PluralRules(locale);
      const rule = pr.select(value);

      if (rule === 'zero' && options.zero) return options.zero;
      if (rule === 'one') return options.one;
      return options.other;
    },
    locale: getCurrentLocale(),
  };
};

/**
 * Get translation with namespace
 */
export const getTranslation = (key: string, options?: any): string => {
  return intl.get(key, options);
};

/**
 * Get current locale
 */
export const getCurrentLocale = (): string => {
  return intl.getInitOptions()?.currentLocale || 'en';
};

/**
 * Check if localization is initialized
 */
export const isLocalizationInitialized = (): boolean => {
  return intl.getInitOptions() !== null;
};

/**
 * Get available locales
 */
export const getAvailableLocales = (): string[] => {
  const options = intl.getInitOptions();
  return options ? Object.keys(options.locales || {}) : [];
};

/**
 * Switch locale dynamically
 */
export const switchLocale = async (
  locale: string,
  messages: Record<string, any>
): Promise<void> => {
  try {
    await intl.init({
      currentLocale: locale,
      locales: {
        [locale]: messages,
      },
      fallbackLocale: 'en',
      escapeHtml: false,
    });
  } catch (error) {
    console.error('Failed to switch locale:', error);
    throw error;
  }
};
