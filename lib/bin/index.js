"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

var _start = _interopRequireDefault(require("../start"));

var _build = _interopRequireDefault(require("../build"));

_commander.default.version('0.0.1').usage('[options] <file ...>'); // require('../build/start')


_commander.default.command('start').alias('s').option('-s, --https', 'https server').description('start the development server...').action(function (type, name) {
  process.env.NODE_ENV = 'development';
  (0, _start.default)(type.https);
});

_commander.default.command('build').alias('b').description('build for production...').action(function (type, name) {
  process.env.NODE_ENV = 'production';
  (0, _build.default)();
});

_commander.default.parse(process.argv);