var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    client: './src/client/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    publicPath: '/build/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map'
  },
  resolve: {
    alias: {
      'shared': path.join(__dirname, 'src/shared'),
      'client': path.join(__dirname, 'src/client'),
      'server': path.join(__dirname, 'src/server'),
      'assets': path.join(__dirname, 'assets')
    },
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'src/client/index.html'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.js?$/, loader: 'source-map' }
    ],
    loaders: [
      { test: /\.js?$/, loader: 'babel?cacheDirectory',
        exclude: /(node_modules)/
      },
      { test: /\.css$/, loader: "style-loader!css-loader"},
      { test: /\.json$/, loader: 'json' },
      { test: /\.(png|jpg)$/, loader: 'url?limit=25000'}
    ]
  }
}
