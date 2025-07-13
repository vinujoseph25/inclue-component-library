import type { Theme as MuiTheme, PaletteColor, PaletteColorOptions } from '@mui/material/styles';

/**
 * Extended theme interface that includes custom properties
 */
declare module '@mui/material/styles' {
  interface Theme {
    customSpacing: typeof import('../themes/tokens').spacing;
    customColors: typeof import('../themes/tokens').colors;
    customTypography: typeof import('../themes/tokens').typography;
    customBorderRadius: typeof import('../themes/tokens').borderRadius;
    customTransitions: typeof import('../themes/tokens').transitions;
    customZIndex: typeof import('../themes/tokens').zIndex;
  }

  interface ThemeOptions {
    customSpacing?: typeof import('../themes/tokens').spacing;
    customColors?: typeof import('../themes/tokens').colors;
    customTypography?: typeof import('../themes/tokens').typography;
    customBorderRadius?: typeof import('../themes/tokens').borderRadius;
    customTransitions?: typeof import('../themes/tokens').transitions;
    customZIndex?: typeof import('../themes/tokens').zIndex;
  }

  interface Palette {
    tertiary?: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }
}

export interface CustomThemeOptions {
  mode?: 'light' | 'dark';
  primaryColor?: string;
  secondaryColor?: string;
  fontFamily?: string;
  borderRadius?: number;
  spacing?: number;
  customOverrides?: {
    colors?: Partial<typeof import('../themes/tokens').colors>;
    typography?: Partial<typeof import('../themes/tokens').typography>;
    spacing?: Partial<typeof import('../themes/tokens').spacing>;
    borderRadius?: Partial<typeof import('../themes/tokens').borderRadius>;
  };
}

export type Shadow = [
  'none',
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export type CustomTheme = MuiTheme;
