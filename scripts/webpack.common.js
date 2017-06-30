const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const SupportedBrowsers = ['last 2 versions', 'safari >= 7', 'ie >= 10'];
const Config = require('../config.json');
const Package = require('../package.json');

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {
                  'targets': {
                    'browsers': SupportedBrowsers
                  }
                }]
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            { loader: 'css-loader' },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  require('autoprefixer')({
                    'browsers': SupportedBrowsers
                  })
                ]
              }
            },
            { loader: 'sass-loader' }
          ]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        // Assumes vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),

    // CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),

    // Generate HTML files
    new HtmlWebpackPlugin({
      filename: './index.html',
      title: `${Config.title} &mdash; ${Config.description}`,
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: './play/index.html',
      title: `Playing ${Config.title} &mdash; ${Config.description}`,
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: './win/index.html',
      title: `Victory! &mdash; ${Config.title} &mdash; ${Config.description}`,
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: './lose/index.html',
      title: `Game Over &mdash; ${Config.title} &mdash; ${Config.description}`,
      template: 'src/index.html'
    })
  ]
};
