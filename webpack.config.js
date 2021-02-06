const path = require('path');
const webpack = require('webpack');
require('dotenv').config({
  path: path.resolve(__dirname, 'config')
});
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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
        from: path.resolve(__dirname, "src", "css", "index.css"),
        to: path.resolve(__dirname, "public/css")
      },
      {
        from: path.resolve(__dirname, "src", "css", "tippy-template.css"),
        to: path.resolve(__dirname, "public/css")
      },
      {
        from: path.resolve(__dirname, "src", "css", "font-face.css"),
        to: path.resolve(__dirname, "public/css")
      }
    ],
  }),
];




module.exports = {
  entry: {
    index: './src/js/index.js',
    index2: './src/js/2.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    publicPath: ''
  },
  mode: 'production',
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
  // complete SourceMap is emitted in dev mode
  //devtool: 'eval-source-map',
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