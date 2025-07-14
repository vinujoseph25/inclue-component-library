import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },

  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],

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

  webpackFinal: async (config, { configType }) => {
    // Ensure config.resolve exists
    if (!config.resolve) {
      config.resolve = {};
    }

    // Add custom resolve aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '..', 'src'),
    };

    // Ensure extensions are set
    config.resolve.extensions = [...(config.resolve.extensions || []), '.ts', '.tsx'];

    // Add TypeScript rule if not present
    const tsRule = {
      test: /\.tsx?$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve(__dirname, '..', 'tsconfig.json'),
          },
        },
      ],
      exclude: /node_modules/,
    };

    // Check if TypeScript rule already exists
    const hasTypescriptRule = config.module?.rules?.some((rule: any) =>
      rule?.test?.toString().includes('tsx?')
    );

    if (!hasTypescriptRule && config.module?.rules) {
      config.module.rules.push(tsRule);
    }

    // Add CSS support
    config.module?.rules?.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    // Configure optimization for production builds
    if (configType === 'PRODUCTION') {
      if (!config.optimization) {
        config.optimization = {};
      }

      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          mui: {
            test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
            name: 'mui',
            chunks: 'all',
          },
        },
      };
    }

    // Define global constants
    if (!config.plugins) {
      config.plugins = [];
    }

    const webpack = require('webpack');
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    );

    return config;
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
