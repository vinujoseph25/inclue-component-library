const path = require('path');

module.exports = {
  mode: 'production',
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
              compilerOptions: {
                declaration: true,
                declarationMap: true,
                emitDeclarationOnly: true,
                outDir: path.resolve(__dirname, 'dist/types'),
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  
  resolve: {
    extensions: ['.tsx', '.ts'],
  },
  
  output: {
    path: path.resolve(__dirname, 'dist/types'),
    clean: false,
  },
  
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
    '@mui/material': '@mui/material',
    '@emotion/react': '@emotion/react',
    '@emotion/styled': '@emotion/styled',
  },
};