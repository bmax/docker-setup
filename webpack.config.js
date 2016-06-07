var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    blocks: './src/client/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    publicPath: '/',
    filename: '[name].[hash].js',
    sourceMapFilename: '[name].[hash].js.map'
  },
  resolve: {
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
