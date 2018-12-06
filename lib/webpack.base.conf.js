"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _options;

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf

var iwsConfig = require(_path.default.resolve(cwdPath, 'iws.config.js'));

var webpackConfig = {
  entry: {
    app: [_path.default.resolve(cwdPath, 'src/app.js')]
  },
  output: {
    path: _path.default.resolve(cwdPath, 'dist'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', {
        loader: 'eslint-loader',
        options: (_options = {
          formatter: require("eslint/lib/formatters/stylish")
        }, (0, _defineProperty2.default)(_options, "formatter", require('eslint-friendly-formatter')), (0, _defineProperty2.default)(_options, "emitWarning", true), (0, _defineProperty2.default)(_options, "failOnError", false), _options)
      }]
    }, {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/assets/',
          limit: 1024
        }
      }]
    }, {
      test: /\.(woff|woff2|svg|ttf|eot)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '[name].[hash:8].[ext]',
          outputPath: 'static/assets/',
          limit: 1024
        }
      }]
    }, {
      test: /\.hbs$/,
      use: 'handlebars-loader'
    }]
  },
  plugins: [new _htmlWebpackPlugin.default((0, _objectSpread2.default)({
    // filename: conf.index,
    template: 'index.hbs',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference

    }
  }, iwsConfig.htmlOptionData[global.env])), new _webpack.default.DefinePlugin(iwsConfig.defineData[global.env])]
};
var _default = webpackConfig;
exports.default = _default;