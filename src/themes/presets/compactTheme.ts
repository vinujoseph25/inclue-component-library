import { createCustomTheme } from '../muiTheme';
import { colors, spacing } from '../tokens';
import type { CustomThemeOptions } from '../../types/theme.types';

/**
 * Compact theme with reduced spacing for dense layouts
 */
export const compactTheme = createCustomTheme({
  mode: 'light',
  primaryColor: colors.primary[500],
  secondaryColor: colors.secondary[500],
  customOverrides: {
    spacing: {
      xs: '2px',
      sm: '4px',
      md: '8px',
      lg: '12px',
      xl: '16px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '48px',
      '5xl': '64px',
    },
    typography: {
      fontSize: 12,
      variants: {
        h1: {
          fontSize: '4rem',
          lineHeight: 1.1,
        },
        h2: {
          fontSize: '3rem',
          lineHeight: 1.15,
        },
        h3: {
          fontSize: '2.5rem',
          lineHeight: 1.2,
        },
        h4: {
          fontSize: '1.75rem',
          lineHeight: 1.25,
        },
        h5: {
          fontSize: '1.25rem',
          lineHeight: 1.3,
        },
        h6: {
          fontSize: '1rem',
          lineHeight: 1.4,
        },
        body1: {
          fontSize: '0.875rem',
          lineHeight: 1.4,
        },
        body2: {
          fontSize: '0.75rem',
          lineHeight: 1.35,
        },
        button: {
          fontSize: '0.75rem',
          lineHeight: 1.5,
        },
        caption: {
          fontSize: '0.625rem',
          lineHeight: 1.5,
        },
      },
    },
  },
} as CustomThemeOptions);
