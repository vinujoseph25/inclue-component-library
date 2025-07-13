import { createCustomTheme } from '../muiTheme';
import { colors } from '../tokens';
import type { CustomThemeOptions } from '../../types/theme.types';

/**
 * Dark theme preset with optimized colors for dark backgrounds
 */
export const darkTheme = createCustomTheme({
  mode: 'dark',
  primaryColor: colors.primary[400], // Lighter primary for dark theme
  secondaryColor: colors.secondary[300], // Lighter secondary for dark theme
  customOverrides: {
    colors: {
      primary: {
        ...colors.primary,
        main: colors.primary[400],
        dark: colors.primary[600],
        light: colors.primary[300],
      },
      secondary: {
        ...colors.secondary,
        main: colors.secondary[300],
        dark: colors.secondary[500],
        light: colors.secondary[200],
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
      text: {
        primary: 'rgba(255, 255, 255, 0.87)',
        secondary: 'rgba(255, 255, 255, 0.6)',
        disabled: 'rgba(255, 255, 255, 0.38)',
        hint: 'rgba(255, 255, 255, 0.38)',
      },
      action: {
        active: 'rgba(255, 255, 255, 0.54)',
        hover: 'rgba(255, 255, 255, 0.04)',
        hoverOpacity: 0.04,
        selected: 'rgba(255, 255, 255, 0.08)',
        selectedOpacity: 0.08,
        disabled: 'rgba(255, 255, 255, 0.26)',
        disabledBackground: 'rgba(255, 255, 255, 0.12)',
        disabledOpacity: 0.38,
        focus: 'rgba(255, 255, 255, 0.12)',
        focusOpacity: 0.12,
        activatedOpacity: 0.12,
      },
    },
  },
} as CustomThemeOptions);
