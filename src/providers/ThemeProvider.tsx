import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  Theme,
  StyledEngineProvider,
  createTheme,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createCustomTheme } from '../themes/muiTheme';
import { lightTheme, darkTheme } from '../themes/presets';
import type { CustomThemeOptions } from '../types/theme.types';

export interface ThemeContextValue {
  theme: Theme;
  mode: 'light' | 'dark';
  toggleMode: () => void;
  setMode: (mode: 'light' | 'dark') => void;
  updateTheme: (options: Partial<CustomThemeOptions>) => void;
  resetTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: Theme | CustomThemeOptions;
  mode?: 'light' | 'dark';
  enableModeToggle?: boolean;
  onModeChange?: (mode: 'light' | 'dark') => void;
  storageKey?: string;
  disableCssBaseline?: boolean;
  enableColorScheme?: boolean;
}

// Create theme context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Custom hook to access theme context
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

/**
 * Enhanced Theme Provider with mode switching and persistence
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  theme: initialTheme,
  mode: initialMode = 'light',
  enableModeToggle = true,
  onModeChange,
  storageKey = 'component-library-theme-mode',
  disableCssBaseline = false,
  enableColorScheme = true,
}) => {
  // Initialize mode from localStorage or prop
  const [mode, setModeState] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && enableModeToggle) {
      const savedMode = localStorage.getItem(storageKey);
      if (savedMode === 'light' || savedMode === 'dark') {
        return savedMode;
      }
    }
    return initialMode;
  });

  // Store custom theme options for updates
  const [customThemeOptions, setCustomThemeOptions] = useState<Partial<CustomThemeOptions>>({});

  // Create theme based on mode and custom options
  const theme = useMemo(() => {
    if (initialTheme) {
      // If a complete theme is provided, use it
      if ('palette' in initialTheme) {
        return initialTheme as Theme;
      } else {
        // If theme options are provided, create theme
        return createCustomTheme({
          mode,
          ...(initialTheme as CustomThemeOptions),
          ...customThemeOptions,
        });
      }
    }

    // Use preset themes
    const baseTheme = mode === 'dark' ? darkTheme : lightTheme;

    if (Object.keys(customThemeOptions).length > 0) {
      return createCustomTheme({
        mode,
        ...customThemeOptions,
      });
    }

    return baseTheme;
  }, [mode, initialTheme, customThemeOptions]);

  // Apply color scheme to document
  React.useEffect(() => {
    if (enableColorScheme && typeof document !== 'undefined') {
      document.documentElement.style.colorScheme = mode;
    }
  }, [mode, enableColorScheme]);

  // Toggle theme mode
  const toggleMode = useCallback(() => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setModeState(newMode);

    // Persist to localStorage
    if (typeof window !== 'undefined' && enableModeToggle) {
      localStorage.setItem(storageKey, newMode);
    }

    // Call external handler
    onModeChange?.(newMode);
  }, [mode, onModeChange, storageKey, enableModeToggle]);

  // Set specific mode
  const setMode = useCallback(
    (newMode: 'light' | 'dark') => {
      setModeState(newMode);

      // Persist to localStorage
      if (typeof window !== 'undefined' && enableModeToggle) {
        localStorage.setItem(storageKey, newMode);
      }

      // Call external handler
      onModeChange?.(newMode);
    },
    [onModeChange, storageKey, enableModeToggle]
  );

  // Update theme with new options
  const updateTheme = useCallback((options: Partial<CustomThemeOptions>) => {
    setCustomThemeOptions(prev => ({
      ...prev,
      ...options,
    }));
  }, []);

  // Reset theme to default
  const resetTheme = useCallback(() => {
    setCustomThemeOptions({});
  }, []);

  // Context value
  const contextValue: ThemeContextValue = {
    theme,
    mode,
    toggleMode,
    setMode,
    updateTheme,
    resetTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledEngineProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          {!disableCssBaseline && <CssBaseline />}
          {children}
        </MuiThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};
