// Localization files
import enTranslations from './en.json';
import esTranslations from './es.json';
import frTranslations from './fr.json';
import deTranslations from './de.json';
import ptTranslations from './pt.json';

// Export individual translation objects
export { default as en } from './en.json';
export { default as es } from './es.json';
export { default as fr } from './fr.json';
export { default as de } from './de.json';
export { default as pt } from './pt.json';

// Export translations with aliases for compatibility
export { enTranslations, esTranslations, frTranslations, deTranslations, ptTranslations };

// Define supported locales
export const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'de', 'pt'] as const;

// Default locale
export const DEFAULT_LOCALE = 'en';

// Type definitions for locales
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Locale configuration interface
export interface LocaleConfig {
  code: SupportedLocale;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  translations: Record<string, any>;
}

// Locale metadata
export const LOCALE_CONFIGS: Record<SupportedLocale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    translations: enTranslations,
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    translations: esTranslations,
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    translations: frTranslations,
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    translations: deTranslations,
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr',
    translations: ptTranslations,
  },
};

// Utility function to get locale configuration
export function getLocaleConfig(locale: string): LocaleConfig | null {
  if (SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
    return LOCALE_CONFIGS[locale as SupportedLocale];
  }
  return null;
}

// Utility function to get all available locales
export function getAvailableLocales(): LocaleConfig[] {
  return SUPPORTED_LOCALES.map(locale => LOCALE_CONFIGS[locale]);
}

// Utility function to check if locale is supported
export function isLocaleSupported(locale: string): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale);
}

// Utility function to get fallback locale
export function getFallbackLocale(): SupportedLocale {
  return DEFAULT_LOCALE;
}

// Combined translations object for easy access
export const ALL_TRANSLATIONS = {
  en: enTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations,
  pt: ptTranslations,
} as const;

// Type for the complete translation structure
export type TranslationKeys = typeof enTranslations;

// Helper function to get translations for a specific locale with fallback
export function getTranslations(locale: string): TranslationKeys {
  const supportedLocale = isLocaleSupported(locale) ? locale : DEFAULT_LOCALE;
  return ALL_TRANSLATIONS[supportedLocale];
}

// Export default as the main translations object
export default ALL_TRANSLATIONS;
