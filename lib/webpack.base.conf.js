"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _utils = require("./utils");

var _options;

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf

var iwsConfig = require(_path.default.resolve(cwdPath, 'iws.config.js'));

var envData = iwsConfig[global.env];
var alias = iwsConfig.alias,
    externals = iwsConfig.externals;

var _ref = envData || {
  publicPath: '/'
},
    htmlOptionData = _ref.htmlOptionData,
    defineData = _ref.defineData,
    publicPath = _ref.publicPath;

var serviceWorkScript;

if (global.cmd === 'build') {
  var serviceWork = (0, _utils.loadMinified)(_path.default.resolve(__dirname, 'service-worker-script.js'));
  serviceWorkScript = {
    serviceWorkScript: new _handlebars.default.SafeString("<script>".concat((0, _utils.handleTemp)(serviceWork, {
      publicPath: publicPath
    }), "</script>"))
  };
}

var webpackConfig = {
  // alias,
  externals: externals,
  entry: {
    app: [_path.default.resolve(cwdPath, 'src/app.js')]
  },
  output: {
    path: _path.default.resolve(cwdPath, 'dist'),
    filename: 'static/js/[name].js'
  },
  resolve: {
    alias: (0, _objectSpread2.default)({}, alias),
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
          name: '/static/img/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.(woff|woff2|svg|ttf|eot)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: '/static/fonts/[name].[hash:8].[ext]',
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

    },
    chunksSortMode: 'dependency'
  }, serviceWorkScript, htmlOptionData)), new _webpack.default.DefinePlugin(defineData)]
};
var _default = webpackConfig;
exports.default = _default;