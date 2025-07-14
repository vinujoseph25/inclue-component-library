import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import intl from 'react-intl-universal';

export interface LocalizationConfig {
  locale: string;
  messages: Record<string, any>;
  fallbackLocale?: string;
}

export interface LocalizationContextValue {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string, options?: any) => string;
  formatMessage: (descriptor: any, values?: any) => string;
  formatNumber: (value: number, options?: any) => string;
  formatDate: (value: Date | number, options?: any) => string;
  formatTime: (value: Date | number, options?: any) => string;
  formatRelative: (value: Date | number, options?: any) => string;
  formatPlural: (value: number, options?: any) => string;
  isInitialized: boolean;
  availableLocales: string[];
}

export interface LocalizationProviderProps {
  children: React.ReactNode;
  config: LocalizationConfig;
  availableLocales?: string[];
  onLocaleChange?: (locale: string) => void;
  storageKey?: string;
  enablePersistence?: boolean;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

// Create localization context
const LocalizationContext = createContext<LocalizationContextValue | undefined>(undefined);

/**
 * Custom hook to access localization context
 */
export const useLocalization = (): LocalizationContextValue => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};

/**
 * Localization Provider with react-intl-universal integration
 */
export const LocalizationProvider: React.FC<LocalizationProviderProps> = ({
  children,
  config,
  availableLocales = ['en'],
  onLocaleChange,
  storageKey = 'component-library-locale',
  enablePersistence = true,
  loadingComponent = <div>Loading localization...</div>,
  errorComponent = <div>Error loading localization</div>,
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(config.locale);

  // Initialize react-intl-universal
  const initializeIntl = useCallback(
    async (locale: string, messages: Record<string, any>) => {
      try {
        setHasError(false);

        await intl.init({
          currentLocale: locale,
          locales: {
            [locale]: messages,
          },
          fallbackLocale: config.fallbackLocale || 'en',
          escapeHtml: false,
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize localization:', error);
        setHasError(true);
      }
    },
    [config.fallbackLocale]
  );

  // Initialize on mount and when config changes
  useEffect(() => {
    // Check for persisted locale
    let initialLocale = config.locale;

    if (enablePersistence && typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(storageKey);
      if (savedLocale && availableLocales.includes(savedLocale)) {
        initialLocale = savedLocale;
      }
    }

    setCurrentLocale(initialLocale);
    initializeIntl(initialLocale, config.messages);
  }, [config, initializeIntl, availableLocales, enablePersistence, storageKey]);

  // Change locale
  const setLocale = useCallback(
    async (newLocale: string) => {
      if (!availableLocales.includes(newLocale)) {
        console.warn(
          `Locale "${newLocale}" is not available. Available locales: ${availableLocales.join(', ')}`
        );
        return;
      }

      try {
        setCurrentLocale(newLocale);

        // Persist to localStorage
        if (enablePersistence && typeof window !== 'undefined') {
          localStorage.setItem(storageKey, newLocale);
        }

        // Update react-intl-universal
        await intl.init({
          currentLocale: newLocale,
          locales: {
            [newLocale]: config.messages,
          },
          fallbackLocale: config.fallbackLocale || 'en',
          escapeHtml: false,
        });

        // Call external handler
        onLocaleChange?.(newLocale);
      } catch (error) {
        console.error('Failed to change locale:', error);
        setHasError(true);
      }
    },
    [
      availableLocales,
      config.messages,
      config.fallbackLocale,
      onLocaleChange,
      enablePersistence,
      storageKey,
    ]
  );

  // Translation functions
  const t = useCallback(
    (key: string, options?: any) => {
      if (!isInitialized) return key;
      return intl.get(key, options);
    },
    [isInitialized]
  );

  const formatMessage = useCallback(
    (descriptor: any, values?: any) => {
      if (!isInitialized) return descriptor.defaultMessage || descriptor.id || '';
      return intl.formatMessage(descriptor, values);
    },
    [isInitialized]
  );

  const formatNumber = useCallback(
    (value: number, options?: any) => {
      if (!isInitialized) return value.toString();
      // Fallback to Intl.NumberFormat since react-intl-universal does not provide formatNumber
      try {
        return new Intl.NumberFormat(currentLocale, options).format(value);
      } catch {
        return value.toString();
      }
    },
    [isInitialized, currentLocale]
  );

  const formatDate = useCallback(
    (value: Date | number, options?: any) => {
      if (!isInitialized) return new Date(value).toLocaleDateString();
      try {
        return new Intl.DateTimeFormat(currentLocale, options).format(value);
      } catch {
        return new Date(value).toLocaleDateString();
      }
    },
    [isInitialized, currentLocale]
  );

  const formatTime = useCallback(
    (value: Date | number, options?: any) => {
      if (!isInitialized) return new Date(value).toLocaleTimeString();
      try {
        return new Intl.DateTimeFormat(currentLocale, {
          ...options,
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        }).format(value);
      } catch {
        return new Date(value).toLocaleTimeString();
      }
    },
    [isInitialized, currentLocale]
  );

  const formatRelative = useCallback(
    (value: Date | number, options?: any) => {
      if (!isInitialized) return new Date(value).toLocaleDateString();
      // Calculate the difference in seconds
      const now = Date.now();
      const date = typeof value === 'number' ? value : value.getTime();
      const diff = Math.round((date - now) / 1000);

      const rtf = new (Intl as any).RelativeTimeFormat(currentLocale, options);

      const divisions = [
        { amount: 60, name: 'seconds' },
        { amount: 60, name: 'minutes' },
        { amount: 24, name: 'hours' },
        { amount: 7, name: 'days' },
        { amount: 4.34524, name: 'weeks' },
        { amount: 12, name: 'months' },
        { amount: Number.POSITIVE_INFINITY, name: 'years' },
      ];

      let duration = diff;
      let unit = 'seconds';

      for (let i = 0; i < divisions.length; i++) {
        if (Math.abs(duration) < divisions[i].amount) {
          unit = divisions[i].name;
          break;
        }
        duration /= divisions[i].amount;
      }

      return rtf.format(Math.round(duration), unit as Intl.RelativeTimeFormatUnit);
    },
    [isInitialized, currentLocale]
  );

  const formatPlural = useCallback(
    (value: number, options?: any) => {
      if (!isInitialized) return value.toString();
      try {
        const pluralRules = new Intl.PluralRules(currentLocale, options);
        return pluralRules.select(value);
      } catch {
        return value.toString();
      }
    },
    [isInitialized, currentLocale]
  );

  // Context value
  const contextValue: LocalizationContextValue = {
    locale: currentLocale,
    setLocale,
    t,
    formatMessage,
    formatNumber,
    formatDate,
    formatTime,
    formatRelative,
    formatPlural,
    isInitialized,
    availableLocales,
  };

  // Show error state
  if (hasError) {
    return <>{errorComponent}</>;
  }

  // Show loading state
  if (!isInitialized) {
    return <>{loadingComponent}</>;
  }

  return (
    <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>
  );
};
