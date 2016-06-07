import path from 'path';
import express from 'express';
import serveWebpackClient from 'serve-webpack-client';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';

const app = express(); 
const webpackConfig = require('../../webpack.config');
const compiler = webpack(webpackConfig);

app.use(serveWebpackClient({
  distPath: path.resolve(__dirname, '../../dist/client'),
  indexFileName: 'index.html',
  webpackConfig: webpackConfig
}));

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

const port = process.env.PORT || 3000;
const server = app.listen(port);
console.log('Express server started on port ' + port);