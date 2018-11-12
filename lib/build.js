"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _ora = _interopRequireDefault(require("ora"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackProdConf = _interopRequireDefault(require("./webpack.prod.conf.js"));

// const webpackProdConf = require('./webpack.dev.conf.js')
var spinner = (0, _ora.default)('build for production... ');

var _default = function _default() {
  spinner.start();
  (0, _rimraf.default)(_path.default.join(process.cwd(), 'dist/static'), function (err) {
    if (err) throw err;
    (0, _webpack.default)(_webpackProdConf.default, function (err, stats) {
      spinner.stop();
      if (err) throw err;
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: true
      }) + '\n\n');
    });
  });
};

exports.default = _default;