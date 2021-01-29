require('dotenv').config()
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const devMode = process.env.MODE !== 'production';

const plugins = [
  new CleanWebpackPlugin({
    cleanStaleWebpackAssets: false
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, './src', 'index.html'),
    filename: 'index.html',
    inject: 'body'
  }),
  // import automatically modules
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  }),
  new ImageMinimizerPlugin({
    minimizerOptions: {
      plugins: [
        ['gifsicle', {
          interlaced: true
        }],
        ['jpegtran', {
          progressive: true
        }],
        ['optipng', {
          optimizationLevel: 5
        }],
        [
          'svgo',
          {
            plugins: [{
              removeViewBox: false,
            }, ],
          },
        ],
      ],
    },
  })
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
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  mode: process.env.MODE,
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        use: [
          {
              loader: 'file-loader',
          }
        ]
      },
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