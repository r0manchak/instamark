const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcDir = path.join(__dirname, '../src');
const distDir = path.join(__dirname, '../dist');

module.exports = {
  entry: {
    popup: path.join(srcDir, 'popup.ts'),
    background: path.join(srcDir, 'background.ts')
  },
  output: {
    path: distDir,
    filename: 'js/[name].js'
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  plugins: [
    // new CleanWebpackPlugin(['dist'], {
    //   root: path.join(distDir, '..'),
    //   exclude: ['manifest.json']
    // }),

    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    }),

    new CopyWebpackPlugin([
      {from: './manifest.json', to: 'manifest.json'}
    ]),

    new HtmlWebpackPlugin({
      chunks: ['popup'],
      template: path.join(srcDir, 'popup.html'),
      filename: 'popup.html'
    })
  ]
};
