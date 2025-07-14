const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const isProduction = process.env.NODE_ENV === 'production';
const isAnalyze = process.env.ANALYZE === 'true';

const baseConfig = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.ts',
  
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.build.json'),
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM',
    },
    '@mui/material': {
      commonjs: '@mui/material',
      commonjs2: '@mui/material',
      amd: '@mui/material',
      root: 'MaterialUI',
    },
    '@emotion/react': {
      commonjs: '@emotion/react',
      commonjs2: '@emotion/react',
      amd: '@emotion/react',
      root: 'EmotionReact',
    },
    '@emotion/styled': {
      commonjs: '@emotion/styled',
      commonjs2: '@emotion/styled',
      amd: '@emotion/styled',
      root: 'EmotionStyled',
    },
  },
  
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: isProduction,
          },
          mangle: true,
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  
  plugins: [
    ...(isAnalyze ? [new BundleAnalyzerPlugin()] : []),
  ],
  
  devtool: isProduction ? 'source-map' : 'eval-source-map',
};

// CommonJS build
const cjsConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: {
      type: 'commonjs2',
    },
    clean: true,
  },
  target: 'node',
};

// ES Module build
const esmConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.esm.js',
    library: {
      type: 'module',
    },
    environment: {
      module: true,
    },
    clean: false,
  },
  experiments: {
    outputModule: true,
  },
  target: 'es2015',
};

// UMD build for browser
const umdConfig = {
  ...baseConfig,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.umd.js',
    library: {
      name: 'InclueComponentLibrary',
      type: 'umd',
    },
    globalObject: 'this',
    clean: false,
  },
  target: 'web',
};

module.exports = [cjsConfig, esmConfig, umdConfig];