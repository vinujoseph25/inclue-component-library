import { Theme } from '@mui/material/styles';
import { colors } from './tokens';

/**
 * Utility functions for working with themes
 */

/**
 * Get contrasting text color for a given background color
 */
export const getContrastText = (backgroundColor: string): string => {
  // Simple contrast calculation - in production, you might want a more sophisticated algorithm
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 128 ? colors.common.black : colors.common.white;
};

/**
 * Lighten a color by a percentage
 */
export const lighten = (color: string, amount: number): string => {
  const hex = color.replace('#', '');
  const num = parseInt(hex, 16);
  const red = (num >> 16) + amount;
  const blue = ((num >> 8) & 0x00ff) + amount;
  const green = (num & 0x0000ff) + amount;

  return (
    '#' +
    (
      0x1000000 +
      (red < 255 ? (red < 1 ? 0 : red) : 255) * 0x10000 +
      (blue < 255 ? (blue < 1 ? 0 : blue) : 255) * 0x100 +
      (green < 255 ? (green < 1 ? 0 : green) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/**
 * Darken a color by a percentage
 */
export const darken = (color: string, amount: number): string => {
  return lighten(color, -amount);
};

/**
 * Add alpha transparency to a color
 */
export const alpha = (color: string, alphaValue: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
};

/**
 * Check if the current theme is dark mode
 */
export const isDarkMode = (theme: Theme): boolean => {
  return theme.palette.mode === 'dark';
};

/**
 * Get responsive spacing based on breakpoint
 */
export const getResponsiveSpacing = (theme: Theme, base: number) => ({
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(base * 0.5),
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(base * 0.75),
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(base),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(base * 1.25),
  },
});

/**
 * Create a gradient background
 */
export const createGradient = (
  startColor: string,
  endColor: string,
  direction: string = 'to right'
): string => {
  return `linear-gradient(${direction}, ${startColor}, ${endColor})`;
};

/**
 * Get theme-aware border color
 */
export const getBorderColor = (theme: Theme, opacity: number = 0.12): string => {
  return alpha(theme.palette.text.primary, opacity);
};

/**
 * Create consistent focus styles
 */
export const getFocusStyles = (theme: Theme) => ({
  outline: 'none',
  boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  borderColor: theme.palette.primary.main,
});

/**
 * Get elevation styles without using shadows (for performance)
 */
export const getElevationStyles = (elevation: number) => {
  const elevations: Record<number, any> = {
    0: {
      boxShadow: 'none',
    },
    1: {
      boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    },
    2: {
      boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    },
    3: {
      boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    },
    4: {
      boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
    },
    5: {
      boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)',
    },
  };

  return elevations[elevation] || elevations[1];
};
