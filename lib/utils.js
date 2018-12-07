"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTemp = exports.loadMinified = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _uglifyEs = _interopRequireDefault(require("uglify-es"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var loadMinified = function loadMinified(filePath) {
  var code = _fs.default.readFileSync(filePath, 'utf-8');

  var result = _uglifyEs.default.minify(code);

  if (result.error) return '';
  return result.code;
};

exports.loadMinified = loadMinified;

var handleTemp = function handleTemp(source, data) {
  var template = _handlebars.default.compile(source);

  return template(data);
};

exports.handleTemp = handleTemp;