import type { Preview } from '@storybook/react';
import React from 'react';
import { ThemeProvider } from '../src/providers/ThemeProvider';
import { LocalizationProvider } from '../src/providers/LocalizationProvider';
import { lightTheme, darkTheme } from '../src/themes/presets';
import enTranslations from '../src/locales/en.json';
import esTranslations from '../src/locales/es.json';
import frTranslations from '../src/locales/fr.json';
import deTranslations from '../src/locales/de.json';

// Import Material-UI CSS baseline
import CssBaseline from '@mui/material/CssBaseline';

// Global decorators
// const withThemeProvider = (Story: any, context: any) => {
//   const { theme: themeName } = context.globals;

//   let theme;
//   switch (themeName) {
//     case 'dark':
//       theme = darkTheme;
//       break;
//     case 'light':
//     default:
//       theme = lightTheme;
//       break;
//   }

//   return (
//     <ThemeProvider
//       theme={theme}
//       disableCssBaseline={false}
//       enableModeToggle={false} // Disable mode toggle in Storybook, use toolbar instead
//     >
//       <CssBaseline />
//       <Story />
//     </ThemeProvider>
//   );
// };

// const withLocalizationProvider = (Story: any, context: any) => {
//   const { locale } = context.globals;

//   const translations = {
//     en: enTranslations,
//     es: esTranslations,
//     fr: frTranslations,
//     de: deTranslations,
//   };

//   const selectedTranslations = translations[locale as keyof typeof translations] || enTranslations;

//   return (
//     <LocalizationProvider
//       config={{
//         locale: locale || 'en',
//         messages: selectedTranslations,
//         fallbackLocale: 'en'
//       }}
//       enablePersistence={false} // Disable persistence in Storybook
//       loadingComponent={<div>Loading translations...</div>}
//       errorComponent={<div>Error loading translations</div>}
//     >
//       <Story />
//     </LocalizationProvider>
//   );
// };

const preview: Preview = {
  // Global decorators applied to all stories
  decorators: [
    // withLocalizationProvider,
    // withThemeProvider,
  ],

  // Global parameters
  parameters: {
    // Actions configuration
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },

    // Controls configuration
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      hideNoControlsWarning: true,
    },

    // Docs configuration
    docs: {
      theme: undefined, // Will be set by theme.js
      source: {
        type: 'dynamic',
        language: 'tsx',
      },
      canvas: {
        sourceState: 'shown',
      },
    },

    // Viewport configuration
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        wide: {
          name: 'Wide',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
      defaultViewport: 'desktop',
    },

    // Background configuration
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#121212',
        },
        {
          name: 'gray',
          value: '#f5f5f5',
        },
      ],
    },

    // Layout configuration
    layout: 'centered',

    // Options configuration
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Design System',
          ['Colors', 'Typography', 'Spacing', 'Shadows'],
          'Components',
          [
            'Basic',
            ['Button', 'Input', 'Typography'],
            'Form',
            ['Form', 'FormField', 'FormGroup'],
            'Layout',
            ['Container', 'Grid', 'Stack', 'Box'],
            'Navigation',
            ['Tabs', 'Breadcrumbs', 'Menu'],
            'Feedback',
            ['Alert', 'Snackbar', 'Progress', 'Skeleton'],
            'Data Display',
            ['Table', 'List', 'Avatar', 'Badge', 'Chip'],
          ],
          'Examples',
          'Changelog',
        ],
      },
    },

    // Accessibility configuration
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-order-semantics',
            enabled: true,
          },
          {
            id: 'landmark-unique',
            enabled: true,
          },
        ],
      },
      options: {
        checks: { 'color-contrast': { options: { noScroll: true } } },
        restoreScroll: true,
      },
    },
  },

  // Global arguments
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'Light Theme' },
          { value: 'dark', icon: 'circle', title: 'Dark Theme' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en', right: '🇺🇸', title: 'English' },
          { value: 'es', right: '🇪🇸', title: 'Español' },
          { value: 'fr', right: '🇫🇷', title: 'Français' },
          { value: 'de', right: '🇩🇪', title: 'Deutsch' },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
    density: {
      name: 'Density',
      description: 'Component density',
      defaultValue: 'medium',
      toolbar: {
        icon: 'component',
        items: [
          { value: 'compact', title: 'Compact' },
          { value: 'medium', title: 'Medium' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
        showName: true,
      },
    },
  },

  // Initial global arguments
  args: {},

  // Global arg types
  argTypes: {
    // Common props that should be available across components
    className: {
      control: 'text',
      description: 'Additional CSS class names',
      table: {
        category: 'Common',
        type: { summary: 'string' },
      },
    },
    'data-testid': {
      control: 'text',
      description: 'Test identifier for automated testing',
      table: {
        category: 'Testing',
        type: { summary: 'string' },
      },
    },
  },

  // Tags configuration
  //   tags: ['autodocs'],
};

export default preview;
