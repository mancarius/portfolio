const path = require('path');
const webpack = require('webpack');
require('dotenv').config({
  path: path.resolve(__dirname, 'config')
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const devMode = process.env.MODE !== 'production';

const plugins = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false
  }),
  // import automatically modules
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new CopyPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/css", "index.css"),
        to: path.resolve(__dirname, "public/css")
      },
      {
        from: path.resolve(__dirname, "src/css", "index.css.map"),
        to: path.resolve(__dirname, "public/css")
      },
    ],
  }),
];


if (!devMode) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "[name].css",
    chunkFilename: "[id].css"
  }));
}

module.exports = {
  entry: {
    index: './src/js/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: ''
  },
  mode: process.env.WEBPACK_MODE,
  plugins,
  optimization: {
    splitChunks: { chunks: "all" }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  devServer: {
    contentBase: './dist',
    writeToDisk: true
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        resolve: {
          extensions: [".js", ".jsx"]
        },
        exclude: /node_modules/
      },
    ],
  },
};