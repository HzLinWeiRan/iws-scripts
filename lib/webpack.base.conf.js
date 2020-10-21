"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _path = _interopRequireDefault(require("path"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _webpack = _interopRequireDefault(require("webpack"));

var _iwsConfig = _interopRequireDefault(require("./iwsConfig.js"));

var _options;

var cwdPath = process.cwd(); // const { rootPath, assetsRoot } = conf
// const iwsConfig = require(path.resolve(cwdPath, 'iws.config.js'))
// const envData = iwsConfig[global.env]
// const defaultData = iwsConfig['default'] || {}

// const { alias, externals, isEslint } = iwsConfig
var _iwsConfig$htmlOption = _iwsConfig.default.htmlOptionData,
    htmlOptionData = _iwsConfig$htmlOption === void 0 ? {} : _iwsConfig$htmlOption,
    _iwsConfig$defineData = _iwsConfig.default.defineData,
    defineData = _iwsConfig$defineData === void 0 ? {} : _iwsConfig$defineData,
    _iwsConfig$provideDat = _iwsConfig.default.provideData,
    provideData = _iwsConfig$provideDat === void 0 ? {} : _iwsConfig$provideDat,
    _iwsConfig$pluginsDat = _iwsConfig.default.pluginsData,
    pluginsData = _iwsConfig$pluginsDat === void 0 ? [] : _iwsConfig$pluginsDat,
    _iwsConfig$publicPath = _iwsConfig.default.publicPath,
    publicPath = _iwsConfig$publicPath === void 0 ? '/' : _iwsConfig$publicPath,
    _iwsConfig$alias = _iwsConfig.default.alias,
    alias = _iwsConfig$alias === void 0 ? {} : _iwsConfig$alias,
    _iwsConfig$externals = _iwsConfig.default.externals,
    externals = _iwsConfig$externals === void 0 ? {} : _iwsConfig$externals,
    _iwsConfig$rules = _iwsConfig.default.rules,
    rules = _iwsConfig$rules === void 0 ? [] : _iwsConfig$rules,
    _iwsConfig$isEslint = _iwsConfig.default.isEslint,
    isEslint = _iwsConfig$isEslint === void 0 ? false : _iwsConfig$isEslint,
    entry = _iwsConfig.default.entry,
    _iwsConfig$svgExclude = _iwsConfig.default.svgExcludePath,
    svgExcludePath = _iwsConfig$svgExclude === void 0 ? undefined : _iwsConfig$svgExclude,
    serviceWorkFile = _iwsConfig.default.serviceWorkFile;
var eslintLoader = isEslint ? [{
  loader: 'eslint-loader',
  options: (_options = {
    formatter: require("eslint/lib/formatters/stylish")
  }, (0, _defineProperty2.default)(_options, "formatter", require('eslint-friendly-formatter')), (0, _defineProperty2.default)(_options, "fix", true), (0, _defineProperty2.default)(_options, "emitWarning", true), (0, _defineProperty2.default)(_options, "failOnError", false), _options)
}] : [];
var serviceWorkScript = [];

if (global.cmd === 'build') {
  if (serviceWorkFile) {
    serviceWorkScript = [_path.default.resolve(cwdPath, serviceWorkFile)];
  } else {
    serviceWorkScript = [_path.default.resolve(__dirname, 'service-worker-register.js')];
  }
}

var webpackConfig = {
  // alias,
  externals: externals,
  entry: {
    app: (0, _toConsumableArray2.default)(serviceWorkScript).concat([_path.default.resolve(cwdPath, entry || 'src/app.js')])
  },
  output: {
    path: _path.default.resolve(cwdPath, 'dist'),
    filename: 'static/js/[name].js',
    publicPath: publicPath
  },
  resolve: {
    alias: alias,
    extensions: ['.js', '.jsx', '.ts', 'tsx', '.json']
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      include: /src/,
      use: ['babel-loader'].concat(eslintLoader)
    }, {
      test: /\.(jpe?g|png|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'static/img/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.(woff|woff2|ttf|eot|mp3)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.svg$/,
      exclude: svgExcludePath,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'static/fonts/[name].[hash:8].[ext]',
          limit: 1024
        }
      }]
    }, {
      test: /\.hbs$/,
      use: 'handlebars-loader'
    }].concat((0, _toConsumableArray2.default)(rules))
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
  }, htmlOptionData)), new _webpack.default.ProvidePlugin(provideData), new _webpack.default.DefinePlugin((0, _objectSpread2.default)({
    publicPath: JSON.stringify(publicPath)
  }, defineData))].concat((0, _toConsumableArray2.default)(pluginsData))
};
var _default = webpackConfig;
exports.default = _default;