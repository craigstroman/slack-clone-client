const path = require('path');
const webpack = require('webpack');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'main.min.js';

module.exports = {
  mode: 'production',

  entry: {
    app: [path.join(__dirname, 'src/App.tsx')],
  },

  output: {
    publicPath: '/static/js/',
    path: filePath,
    filename: fileName,
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  optimization: {
    minimize: true,
  },

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.m?js$/,
        include: /node_modules[\\/](graphql|@urql)/,
        resolve: {
          fullySpecified: false, // allow extension-less ESM imports (e.g., 'graphql/language/kinds')
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
};
