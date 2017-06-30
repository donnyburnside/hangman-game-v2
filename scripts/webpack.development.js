const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const commonCfg = require('./webpack.common');

module.exports = merge(commonCfg, {
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    port: 1337
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
     minimize: false,
     debug: true
   })
  ]
});
