const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const filePath = path.join(__dirname, './public/js/');
const fileName = 'main.min.js';
const PATHS = {
  src: path.join(__dirname, './src/'),
  dist: path.join(__dirname, './public/js/'),
};

module.exports = {
  mode: 'production',

  entry: {
    app: [path.join(__dirname, './src/App.jsx')],
  },

  output: {
    path: PATHS.dist,
    filename: fileName,
    publicPath: '/',
  },

  watch: false,

  watchOptions: {
    ignored: '/node_modules/',
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        sourceMap: false,
      }),
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            sourceMaps: false,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-transform-async-to-generator'],
              ['@babel/plugin-transform-runtime'],
            ],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'sass-loader', // compiles Sass to CSS
          },
        ],
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new Dotenv(),
  ],
}