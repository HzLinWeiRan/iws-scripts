"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _webpack = _interopRequireDefault(require("webpack"));

var _koa = _interopRequireDefault(require("koa"));

var _koaWebpack = _interopRequireDefault(require("koa-webpack"));

var _opn = _interopRequireDefault(require("opn"));

var _output = _interopRequireDefault(require("friendly-errors-webpack-plugin/src/output"));

var _port = _interopRequireDefault(require("./port.js"));

var _webpackDevConf = _interopRequireDefault(require("./webpack.dev.conf.js"));

var app = new _koa.default();
var compiler = (0, _webpack.default)(_webpackDevConf.default); // const spinner = ora('Server Starting... ');
// spinner.start();

var _default =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(isHttps) {
    var port, url, middleware, https, enforceHttps, privateKey, certificate, credentials;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _port.default)(3000);

          case 2:
            port = _context.sent;
            url = "http".concat(isHttps ? 's' : '', "://localhost:").concat(port);

            _output.default.clearConsole();

            _output.default.title('info', 'WAIT', 'Start the development server...'); // handle fallback for HTML5 history API


            app.use(require('koa-connect-history-api-fallback')()); // app.use(async (ctx, next) => {
            //     if (!ctx.request.url.startsWith('/js') && !ctx.request.url.startsWith('/css') && !ctx.request.url.startsWith('/assets')) {
            //         console.log('404')
            //         console.log(ctx.request.url)
            //         ctx.request.url = '/index.html'
            //     }
            //     await next()
            // })

            _context.next = 9;
            return (0, _koaWebpack.default)({
              compiler: compiler,
              // overlay: true,
              devMiddleware: {
                quiet: true,
                // log: false,
                logLevel: 'silent',
                publicPath: url
              },
              hotClient: {
                logLevel: 'silent' // overlay: true

              }
            });

          case 9:
            middleware = _context.sent;
            app.use(middleware);

            if (isHttps) {
              https = require('https');
              enforceHttps = require('koa-sslify');
              app.use(enforceHttps());
              privateKey = fs.readFileSync(path.join(__dirname, './keys/private.pem'), 'utf8');
              certificate = fs.readFileSync(path.join(__dirname, './keys/file.crt'), 'utf8');
              credentials = {
                key: privateKey,
                cert: certificate
              };
              https.createServer(credentials, app.callback()).listen(port, function () {
                (0, _opn.default)(url, {
                  app: ['google chrome', '--incognito']
                });
              });
            } else {
              app.listen(port, function () {
                (0, _opn.default)(url, {
                  app: ['google chrome', '--incognito']
                });
              });
            } // app.listen(port, () => {
            // })


          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = _default;