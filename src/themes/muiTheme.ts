import { createTheme, Theme } from '@mui/material/styles';
import { colors, typography, spacing, borderRadius, shadows, zIndex, transitions } from './tokens';
import type { CustomThemeOptions, Shadow } from '../types/theme.types';
import { breakpoints } from './breakpoints';

/**
 * Creates a custom Material-UI theme with our design tokens
 */
export const createCustomTheme = (options: CustomThemeOptions = {}): Theme => {
  const {
    mode = 'light',
    primaryColor = colors.primary[500],
    secondaryColor = colors.secondary[500],
    fontFamily = typography.fontFamily,
    customOverrides = {},
  } = options;

  // Merge custom overrides with default tokens
  const mergedColors = { ...colors, ...customOverrides.colors };
  const mergedTypography = { ...typography, ...customOverrides.typography };
  const mergedSpacing = { ...spacing, ...customOverrides.spacing };
  const mergedBorderRadius = { ...borderRadius, ...customOverrides.borderRadius };

  const baseTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        ...colors.primary,
      },
      secondary: {
        main: secondaryColor,
        ...colors.secondary,
      },
      error: colors.error,
      warning: colors.warning,
      info: colors.info,
      success: colors.success,
      grey: colors.grey,
      common: colors.common,
      text:
        mode === 'light'
          ? colors.text
          : {
              primary: 'rgba(255, 255, 255, 0.87)',
              secondary: 'rgba(255, 255, 255, 0.6)',
              disabled: 'rgba(255, 255, 255, 0.38)',
              hint: 'rgba(255, 255, 255, 0.38)',
            },
      background:
        mode === 'light'
          ? colors.background
          : {
              paper: '#1e1e1e',
              default: '#121212',
            },
      action:
        mode === 'light'
          ? colors.action
          : {
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
    typography: {
      fontFamily,
      fontSize: typography.fontSize,
      fontWeightLight: typography.fontWeightLight,
      fontWeightRegular: typography.fontWeightRegular,
      fontWeightMedium: typography.fontWeightMedium,
      fontWeightBold: typography.fontWeightBold,
      ...typography.variants,
    },
    shape: {
      borderRadius: 8,
    },
    shadows: (Array.isArray(shadows) && shadows.length === 25
      ? shadows
      : [
          ...(shadows as string[]),
          ...Array(25 - (shadows as string[]).length).fill('none'),
        ]) as Shadow,
    zIndex,
    transitions: {
      easing: transitions.easing,
      duration: transitions.duration,
      create: (props, options) => {
        const defaultOptions = {
          duration: transitions.duration.standard,
          easing: transitions.easing.easeInOut,
        };
        const mergedOptions = { ...defaultOptions, ...options };
        const propsArray = Array.isArray(props) ? props : [props];

        return propsArray
          .map(prop => `${prop} ${mergedOptions.duration}ms ${mergedOptions.easing}`)
          .join(',');
      },
      getAutoHeightDuration: height => {
        if (!height) return 0;
        const constant = height / 36;
        return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
      },
    },
    breakpoints: {
      values: breakpoints.values,
      up: key => `@media (min-width:${breakpoints.values[key]}px)`,
      down: key => {
        const value = breakpoints.values[key];
        return `@media (max-width:${value - 0.05}px)`;
      },
      between: (start, end) =>
        `@media (min-width:${breakpoints.values[start]}px) and (max-width:${breakpoints.values[end] - 0.05}px)`,
      only: key => {
        if (key === 'xl') {
          return `@media (min-width:${breakpoints.values[key]}px)`;
        }
        const keys = Object.keys(breakpoints.values) as Array<keyof typeof breakpoints.values>;
        const keyIndex = keys.indexOf(key);
        const nextKey = keys[keyIndex + 1];
        return `@media (min-width:${breakpoints.values[key]}px) and (max-width:${breakpoints.values[nextKey] - 0.05}px)`;
      },
      not: key => {
        const keys = Object.keys(breakpoints.values) as Array<keyof typeof breakpoints.values>;
        const keyIndex = keys.indexOf(key);

        if (keyIndex === 0) {
          return `@media (min-width:${breakpoints.values[keys[keyIndex + 1]]}px)`;
        }
        if (keyIndex === keys.length - 1) {
          return `@media (max-width:${breakpoints.values[key] - 0.05}px)`;
        }

        return `@media (max-width:${breakpoints.values[key] - 0.05}px), (min-width:${breakpoints.values[keys[keyIndex + 1]]}px)`;
      },
      keys: Object.keys(breakpoints.values) as Array<keyof typeof breakpoints.values>,
      unit: 'px',
    },
  });

  // Add custom properties to the theme
  const customTheme = createTheme(baseTheme, {
    customSpacing: mergedSpacing,
    customColors: mergedColors,
    customTypography: mergedTypography,
    customBorderRadius: mergedBorderRadius,
    customTransitions: transitions,
    customZIndex: zIndex,

    // Component overrides
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
            borderRadius: mergedBorderRadius.base,
          },
          contained: {
            boxShadow: baseTheme.shadows[2],
            '&:hover': {
              boxShadow: baseTheme.shadows[4],
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: mergedBorderRadius.base,
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: mergedBorderRadius.lg,
            boxShadow: baseTheme.shadows[1],
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: mergedBorderRadius.base,
          },
          rounded: {
            borderRadius: mergedBorderRadius.lg,
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: {
            borderRadius: mergedBorderRadius.xl,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: mergedBorderRadius.full,
          },
        },
      },
    },
  });

  return customTheme;
};
