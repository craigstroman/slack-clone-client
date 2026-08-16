import path from 'path';
import webpack from 'webpack';
import ESLintPlugin from 'eslint-webpack-plugin';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ESLintOptions = {
  overrideConfigFile: path.resolve(__dirname, 'src/.eslintrc.ts'),
  context: path.resolve(__dirname, '/src'),
  extensions: ['js', 'jsx', 'ts', 'tsx'],
  exclude: ['/node_modules/'],
  emitError: true,
  emitWarning: true,
};

export default {
  mode: 'development',

  devtool: 'source-map',

  entry: {
    app: [path.join(__dirname, 'src/App.tsx')],
  },

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js',
  },

  watch: false,
  watchOptions: {
    ignored: '/node_modules/',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve(__dirname, '.babelrc'),
          },
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
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
            options: {
              sassOptions: {
                api: 'modern-compiler',
                quietDeps: true,
                quiet: true,
                silenceDeprecations: ['mixed-decls', 'import', 'color-functions', 'global-builtin'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
        ],
      },
    ],
  },
  devServer: {
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    historyApiFallback: true,
  },
  plugins: [
    new ESLintPlugin(ESLintOptions),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      sourceMap: true,
      devTool: 'source-map',
    }),
  ],
};
