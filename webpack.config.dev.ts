const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV;
const filePath = path.join(__dirname, './public/js/');
const fileName = 'bundle.js';

const PATHS = {
  src: path.join(__dirname, './src/'),
  dist: path.join(__dirname, 'public'),
};

module.exports = {
  mode: 'development',

  devtool: 'source-map',

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
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: '.eslintrc.js',
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
      {
        test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
        loader: 'file-loader?name=node_modules/@fortawesome/fontawesome-free/webfonts[name].[ext]',
      },
    ],
  },

  devServer: {
    contentBase: PATHS.dist,

    compress: false,

    historyApiFallback: true,

    hot: true,

    port: 3000,
  },

  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
};
