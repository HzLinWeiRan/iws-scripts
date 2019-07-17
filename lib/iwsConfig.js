"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _path = _interopRequireDefault(require("path"));

var cwdPath = process.cwd();

var iwsConfig = require(_path.default.resolve(cwdPath, 'iws.config.js'));

var envData = iwsConfig[global.env];
var defaultData = iwsConfig['default'] || {};

var _default = (0, _objectSpread2.default)({}, defaultData, envData);

exports.default = _default;