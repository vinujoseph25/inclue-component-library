import { createCustomTheme } from '../muiTheme';
import { colors } from '../tokens';
import type { CustomThemeOptions } from '../../types/theme.types';

/**
 * Light theme preset with optimized colors for light backgrounds
 */
export const lightTheme = createCustomTheme({
  mode: 'light',
  primaryColor: colors.primary[500],
  secondaryColor: colors.secondary[500],
  customOverrides: {
    colors: {
      primary: {
        ...colors.primary,
        main: colors.primary[600], // Slightly darker for better contrast
      },
      background: {
        default: '#fafafa',
        paper: '#ffffff',
      },
      text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
      },
    },
  },
} as CustomThemeOptions);
