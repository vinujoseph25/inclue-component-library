import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../docs/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  addons: [
    '@storybook/addon-actions', // Must come before interactions
    '@storybook/addon-essentials',
    '@storybook/addon-interactions', // Must come after actions
    '@storybook/addon-docs',
    '@storybook/addon-controls',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-toolbars',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
    '@storybook/addon-a11y',
  ],

  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
      compilerOptions: {
        allowSyntheticDefaultImports: false,
        esModuleInterop: false,
      },
    },
  },

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },

  // Valid features for Storybook 8.x/9.x
  features: {
    argTypeTargetsV7: true,
    legacyDecoratorFileOrder: false,
    disallowImplicitActionsInRenderV8: true,
    experimentalRSC: false,
    viewportStoryGlobals: true,
    backgroundsStoryGlobals: true,
  },

  core: {
    disableTelemetry: true,
  },

  async viteFinal(config, { configType }) {
    // Merge custom configuration into the default config
    return mergeConfig(config, {
      // Add dependencies to pre-optimization
      optimizeDeps: {
        include: [
          '@storybook/react',
          '@storybook/addon-essentials',
          '@mui/material',
          '@emotion/react',
          '@emotion/styled',
          'react-intl-universal',
        ],
      },

      // Define global constants
      define: {
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      },

      // Resolve aliases
      resolve: {
        alias: {
          '@': '/src',
        },
      },

      // Configure build options for production
      ...(configType === 'PRODUCTION' && {
        build: {
          sourcemap: false,
          minify: 'terser',
          rollupOptions: {
            output: {
              manualChunks: {
                vendor: ['react', 'react-dom'],
                mui: ['@mui/material', '@emotion/react', '@emotion/styled'],
                storybook: ['@storybook/react', '@storybook/addon-essentials'],
              },
            },
          },
        },
      }),
    });
  },

  // Remove or comment out staticDirs if you don't have a public directory
  // staticDirs: ['../public'],

  previewHead: head => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <style>
      * {
        box-sizing: border-box;
      }
      
      body {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
      }
      
      #storybook-root {
        padding: 1rem;
      }
      
      .sb-show-main.sb-main-padded {
        padding: 1rem;
      }
    </style>
  `,
};

export default config;
