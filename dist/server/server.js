'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _serveWebpackClient = require('serve-webpack-client');

var _serveWebpackClient2 = _interopRequireDefault(_serveWebpackClient);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var webpackConfig = require('../../webpack.config');
var compiler = (0, _webpack2.default)(webpackConfig);

app.use((0, _serveWebpackClient2.default)({
  distPath: _path2.default.resolve(__dirname, '../../dist/client'),
  indexFileName: 'index.html',
  webpackConfig: webpackConfig
}));

app.use((0, _webpackDevMiddleware2.default)(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

var port = process.env.PORT || 3000;
var server = app.listen(port);
console.log('Express server started on port ' + port);
//# sourceMappingURL=server.js.map