import React from 'react';
import { ThemeProvider, ThemeProviderProps } from './ThemeProvider';
import { LocalizationProvider, LocalizationProviderProps } from './LocalizationProvider';

export interface CombinedProviderProps {
  children: React.ReactNode;
  theme?: ThemeProviderProps['theme'];
  themeMode?: ThemeProviderProps['mode'];
  enableModeToggle?: ThemeProviderProps['enableModeToggle'];
  onModeChange?: ThemeProviderProps['onModeChange'];
  themeStorageKey?: ThemeProviderProps['storageKey'];
  disableCssBaseline?: ThemeProviderProps['disableCssBaseline'];
  enableColorScheme?: ThemeProviderProps['enableColorScheme'];
  localizationConfig: LocalizationProviderProps['config'];
  availableLocales?: LocalizationProviderProps['availableLocales'];
  onLocaleChange?: LocalizationProviderProps['onLocaleChange'];
  localeStorageKey?: LocalizationProviderProps['storageKey'];
  enableLocalePersistence?: LocalizationProviderProps['enablePersistence'];
  loadingComponent?: LocalizationProviderProps['loadingComponent'];
  errorComponent?: LocalizationProviderProps['errorComponent'];
}

/**
 * Combined provider that wraps both Theme and Localization providers
 * This is the recommended way to setup the component library
 */
export const CombinedProvider: React.FC<CombinedProviderProps> = ({
  children,
  theme,
  themeMode,
  enableModeToggle,
  onModeChange,
  themeStorageKey,
  disableCssBaseline,
  enableColorScheme,
  localizationConfig,
  availableLocales,
  onLocaleChange,
  localeStorageKey,
  enableLocalePersistence,
  loadingComponent,
  errorComponent,
}) => {
  return (
    <ThemeProvider
      theme={theme}
      mode={themeMode}
      enableModeToggle={enableModeToggle}
      onModeChange={onModeChange}
      storageKey={themeStorageKey}
      disableCssBaseline={disableCssBaseline}
      enableColorScheme={enableColorScheme}
    >
      <LocalizationProvider
        config={localizationConfig}
        availableLocales={availableLocales}
        onLocaleChange={onLocaleChange}
        storageKey={localeStorageKey}
        enablePersistence={enableLocalePersistence}
        loadingComponent={loadingComponent}
        errorComponent={errorComponent}
      >
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
};

// Default export for convenience
export default CombinedProvider;

// ==========================================
// Example usage documentation
// ==========================================

/*
// Basic usage with CombinedProvider
import { CombinedProvider } from 'my-component-library';
import enTranslations from 'my-component-library/locales/en.json';

function App() {
  return (
    <CombinedProvider
      themeMode="light"
      enableModeToggle={true}
      localizationConfig={{
        locale: 'en',
        messages: enTranslations,
        fallbackLocale: 'en'
      }}
      availableLocales={['en', 'es', 'fr']}
    >
      <YourApp />
    </CombinedProvider>
  );
}

// Advanced usage with custom theme
import { CombinedProvider, createCustomTheme } from 'my-component-library';
import { colors } from 'my-component-library/themes';

const customTheme = createCustomTheme({
  primaryColor: colors.primary[600],
  customOverrides: {
    spacing: { md: '20px' }
  }
});

function App() {
  return (
    <CombinedProvider
      theme={customTheme}
      localizationConfig={{
        locale: 'en',
        messages: enTranslations
      }}
      onModeChange={(mode) => console.log('Theme mode changed:', mode)}
      onLocaleChange={(locale) => console.log('Locale changed:', locale)}
    >
      <YourApp />
    </CombinedProvider>
  );
}

// Using individual providers
import { ThemeProvider, LocalizationProvider } from 'my-component-library';

function App() {
  return (
    <ThemeProvider mode="dark" enableModeToggle>
      <LocalizationProvider 
        config={{ locale: 'en', messages: enTranslations }}
        availableLocales={['en', 'es']}
      >
        <YourApp />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

// Using hooks in components
import { useTheme, useLocalization } from 'my-component-library';

function MyComponent() {
  const { mode, toggleMode, theme } = useTheme();
  const { locale, setLocale, t } = useLocalization();

  return (
    <div>
      <button onClick={toggleMode}>
        Switch to {mode === 'light' ? 'dark' : 'light'} mode
      </button>
      <button onClick={() => setLocale(locale === 'en' ? 'es' : 'en')}>
        Switch language
      </button>
      <p>{t('welcome.message', { name: 'User' })}</p>
    </div>
  );
}
*/
