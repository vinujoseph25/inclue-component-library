import { create } from '@storybook/theming/create';

// Brand colors from your design system
const brandColors = {
  primary: '#2196f3',
  secondary: '#e91e63',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#f44336',
  info: '#03a9f4',
};

// Create custom Storybook theme
export const storybookTheme = create({
  base: 'light',
  
  // Brand information
  brandTitle: 'My Component Library',
  brandUrl: 'https://github.com/yourusername/my-component-library',
  brandImage: undefined, // Add your logo URL here
  brandTarget: '_self',
  
  // Color palette
  colorPrimary: brandColors.primary,
  colorSecondary: brandColors.secondary,
  
  // UI colors
  appBg: '#ffffff',
  appContentBg: '#ffffff',
  appBorderColor: '#e0e0e0',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#212121',
  textInverseColor: '#ffffff',
  textMutedColor: '#757575',
  
  // Toolbar colors
  barTextColor: '#757575',
  barSelectedColor: brandColors.primary,
  barBg: '#fafafa',
  
  // Form colors
  inputBg: '#ffffff',
  inputBorder: '#e0e0e0',
  inputTextColor: '#212121',
  inputBorderRadius: 4,
  
  // Button colors
  buttonBg: brandColors.primary,
  buttonBorder: brandColors.primary,
  booleanBg: '#e0e0e0',
  booleanSelectedBg: brandColors.primary,
  
  // Typography
  fontBase: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontCode: '"Roboto Mono", "Monaco", "Consolas", monospace',
  
  // Grid layout
  layoutMargin: 0,
  
  // Addon panel
  addonActionsTheme: {
    BASE_FONT_FAMILY: '"Roboto", "Helvetica", "Arial", sans-serif',
    BASE_FONT_SIZE: '13px',
    BASE_LINE_HEIGHT: 1.4,
    BASE_BACKGROUND_COLOR: '#ffffff',
    BASE_COLOR: '#212121',
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: brandColors.primary,
    OBJECT_VALUE_NULL_COLOR: '#757575',
    OBJECT_VALUE_UNDEFINED_COLOR: '#757575',
    OBJECT_VALUE_REGEXP_COLOR: brandColors.error,
    OBJECT_VALUE_STRING_COLOR: brandColors.success,
    OBJECT_VALUE_SYMBOL_COLOR: brandColors.info,
    OBJECT_VALUE_NUMBER_COLOR: brandColors.warning,
    OBJECT_VALUE_BOOLEAN_COLOR: brandColors.secondary,
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: '#757575',
  },
});

// Dark theme variant
export const storybookDarkTheme = create({
  base: 'dark',
  
  // Brand information
  brandTitle: 'My Component Library',
  brandUrl: 'https://github.com/yourusername/my-component-library',
  brandImage: undefined, // Add your logo URL here
  brandTarget: '_self',
  
  // Color palette
  colorPrimary: '#42a5f5',
  colorSecondary: '#f48fb1',
  
  // UI colors
  appBg: '#121212',
  appContentBg: '#1e1e1e',
  appBorderColor: '#424242',
  appBorderRadius: 8,
  
  // Text colors
  textColor: '#ffffff',
  textInverseColor: '#000000',
  textMutedColor: '#bdbdbd',
  
  // Toolbar colors
  barTextColor: '#bdbdbd',
  barSelectedColor: '#42a5f5',
  barBg: '#1e1e1e',
  
  // Form colors
  inputBg: '#2c2c2c',
  inputBorder: '#424242',
  inputTextColor: '#ffffff',
  inputBorderRadius: 4,
  
  // Button colors
  buttonBg: '#42a5f5',
  buttonBorder: '#42a5f5',
  booleanBg: '#424242',
  booleanSelectedBg: '#42a5f5',
  
  // Typography
  fontBase: '"Roboto", "Helvetica", "Arial", sans-serif',
  fontCode: '"Roboto Mono", "Monaco", "Consolas", monospace',
  
  // Grid layout
  layoutMargin: 0,
  
  // Addon panel
  addonActionsTheme: {
    BASE_FONT_FAMILY: '"Roboto", "Helvetica", "Arial", sans-serif',
    BASE_FONT_SIZE: '13px',
    BASE_LINE_HEIGHT: 1.4,
    BASE_BACKGROUND_COLOR: '#1e1e1e',
    BASE_COLOR: '#ffffff',
    OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
    OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
    OBJECT_NAME_COLOR: '#42a5f5',
    OBJECT_VALUE_NULL_COLOR: '#bdbdbd',
    OBJECT_VALUE_UNDEFINED_COLOR: '#bdbdbd',
    OBJECT_VALUE_REGEXP_COLOR: '#ef5350',
    OBJECT_VALUE_STRING_COLOR: '#66bb6a',
    OBJECT_VALUE_SYMBOL_COLOR: '#29b6f6',
    OBJECT_VALUE_NUMBER_COLOR: '#ffa726',
    OBJECT_VALUE_BOOLEAN_COLOR: '#f48fb1',
    OBJECT_VALUE_FUNCTION_PREFIX_COLOR: '#bdbdbd',
  },
});

// Theme configuration based on environment or user preference
export const getStorybookTheme = (isDark = false) => {
  return isDark ? storybookDarkTheme : storybookTheme;
};

// Custom CSS for enhanced styling
export const customStorybookStyles = `
  /* Global styles for Storybook */
  .sbdocs-wrapper {
    font-family: 'Roboto', sans-serif;
  }
  
  .sbdocs-h1 {
    color: ${brandColors.primary};
    border-bottom: 2px solid ${brandColors.primary};
    padding-bottom: 0.5rem;
  }
  
  .sbdocs-h2 {
    color: ${brandColors.secondary};
    margin-top: 2rem;
  }
  
  .sbdocs-code {
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-family: 'Roboto Mono', monospace;
    font-size: 0.875rem;
  }
  
  .sbdocs-pre {
    background: #f5f5f5;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 1rem;
    overflow-x: auto;
  }
  
  .sbdocs-table {
    border-collapse: collapse;
    width: 100%;
    margin: 1rem 0;
  }
  
  .sbdocs-table th,
  .sbdocs-table td {
    border: 1px solid #e0e0e0;
    padding: 0.75rem;
    text-align: left;
  }
  
  .sbdocs-table th {
    background: #f5f5f5;
    font-weight: 500;
    color: ${brandColors.primary};
  }
  
  /* Story block styling */
  .sbdocs-story {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    margin: 1rem 0;
    overflow: hidden;
  }
  
  .sbdocs-story-header {
    background: #f5f5f5;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #e0e0e0;
    font-weight: 500;
  }
  
  .sbdocs-story-content {
    padding: 1rem;
  }
  
  /* Controls panel styling */
  .docblock-argstable {
    font-family: 'Roboto', sans-serif;
  }
  
  .docblock-argstable-head {
    background: ${brandColors.primary};
    color: white;
  }
  
  .docblock-argstable-body .docblock-argstable-row:nth-child(even) {
    background: #f9f9f9;
  }
  
  /* Syntax highlighting */
  .prismjs {
    border-radius: 8px;
    font-size: 0.875rem;
  }
  
  .token.keyword {
    color: ${brandColors.primary};
  }
  
  .token.string {
    color: ${brandColors.success};
  }
  
  .token.number {
    color: ${brandColors.warning};
  }
  
  .token.boolean {
    color: ${brandColors.secondary};
  }
  
  .token.comment {
    color: #757575;
    font-style: italic;
  }
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    .sbdocs-wrapper {
      padding: 1rem;
    }
    
    .sbdocs-table {
      font-size: 0.875rem;
    }
    
    .sbdocs-table th,
    .sbdocs-table td {
      padding: 0.5rem;
    }
  }
`;

// Export theme for use in manager
export default storybookTheme;