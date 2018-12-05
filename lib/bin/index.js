"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _commander = _interopRequireDefault(require("commander"));

_commander.default.version('0.0.1').usage('[options] <file ...>'); // require('../build/start')


_commander.default.command('start').alias('s').option('-s, --https', 'https server').option('-e, --env', 'environment variable').description('start the development server...').action(function (type, name) {
  global.env = type.env || 'dev';

  require('../start').default(type.https);
});

_commander.default.command('build').alias('b').description('build for production...').option('-e, --env', 'environment variable').action(function (type, name) {
  global.env = type.env || 'dev';

  require('../build').default();
});

_commander.default.parse(process.argv);