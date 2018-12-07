"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpackMerge = _interopRequireDefault(require("webpack-merge"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _swPrecacheWebpackPlugin = _interopRequireDefault(require("sw-precache-webpack-plugin"));

var _webpackBaseConf = _interopRequireDefault(require("./webpack.base.conf.js"));

var cwdPath = process.cwd();

var iwsConfig = require(_path.default.resolve(cwdPath, 'iws.config.js'));

var envData = iwsConfig[global.env];

var _ref = envData || {
  publicPath: '/'
},
    publicPath = _ref.publicPath;

var webpackConfig = (0, _webpackMerge.default)(_webpackBaseConf.default, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: publicPath
  },
  module: {
    rules: [{
      test: /\.s?css$/,
      use: [_miniCssExtractPlugin.default.loader, 'css-loader', 'sass-loader', 'postcss-loader']
    }]
  },
  plugins: [new _miniCssExtractPlugin.default({
    filename: 'static/css/[name].[contenthash:8].css',
    chunkFilename: 'static/css/[name].[contenthash:8].css'
  }), new _swPrecacheWebpackPlugin.default({
    cacheId: 'iws-app',
    filename: 'service-worker.js',
    // 注册pwa的静态资源文件类型
    staticFileGlobs: ["".concat(_path.default.resolve(cwdPath, 'dist'), "/**/*.{js,css}")],
    minify: true,
    navigateFallback: "".concat(publicPath, "index.html"),
    stripPrefix: _path.default.resolve(cwdPath, 'dist')
  })],
  optimization: {
    noEmitOnErrors: true,
    namedModules: true,
    moduleIds: 'hashed',
    nodeEnv: 'production',
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: "manifest"
    }
  }
});
var _default = webpackConfig;
exports.default = _default;