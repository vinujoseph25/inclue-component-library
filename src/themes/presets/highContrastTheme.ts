import { createCustomTheme } from '../muiTheme';
import { colors } from '../tokens';
import type { CustomThemeOptions } from '../../types/theme.types';

/**
 * High contrast theme for better accessibility
 */
export const highContrastTheme = createCustomTheme({
  mode: 'light',
  primaryColor: '#000000',
  secondaryColor: '#ffffff',
  customOverrides: {
    colors: {
      primary: {
        ...colors.primary,
        main: '#000000',
        dark: '#000000',
        light: '#333333',
        contrastText: '#ffffff',
      },
      secondary: {
        ...colors.secondary,
        main: '#ffffff',
        dark: '#f5f5f5',
        light: '#ffffff',
        contrastText: '#000000',
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#000000',
        secondary: '#000000',
        disabled: '#666666',
        hint: '#666666',
      },
      error: {
        ...colors.error,
        main: '#d32f2f',
        dark: '#c62828',
        light: '#ef5350',
      },
      warning: {
        ...colors.warning,
        main: '#f57c00',
        dark: '#ef6c00',
        light: '#ff9800',
      },
      success: {
        ...colors.success,
        main: '#2e7d32',
        dark: '#1b5e20',
        light: '#4caf50',
      },
    },
  },
} as CustomThemeOptions);
