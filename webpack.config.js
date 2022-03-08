const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

const folder = isProd ? 'build' : 'dev_build';

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    vendor: './js/vendor.js',
  },
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, `${folder}/js`),
  },
  optimization: {
    minimize: !isDev,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new CircularDependencyPlugin(),
  ],
};
