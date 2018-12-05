import webpack from 'webpack'
import Koa from 'koa'
import koaWebpack from 'koa-webpack'
import opn from 'opn'
import output from 'friendly-errors-webpack-plugin/src/output'

import comparePort from './port.js'
import webpackDevConfig from './webpack.dev.conf.js'
const app = new Koa()
const compiler = webpack(webpackDevConfig);
// const spinner = ora('Server Starting... ');
// spinner.start();
export default async () => {
    const port = await comparePort(3000)
    const url = `http${global.isHttps ? 's' : ''}://localhost:${port}`
    output.clearConsole()
    output.title('info', 'WAIT', 'Start the development server...')
    // handle fallback for HTML5 history API
    app.use(require('koa-connect-history-api-fallback')())
    // app.use(async (ctx, next) => {
    //     if (!ctx.request.url.startsWith('/js') && !ctx.request.url.startsWith('/css') && !ctx.request.url.startsWith('/assets')) {
    //         console.log('404')
    //         console.log(ctx.request.url)
    //         ctx.request.url = '/index.html'
    //     }
    //     await next()
    // })
    const middleware = await koaWebpack({
        compiler,
        // overlay: true,
        devMiddleware: {
            quiet: true,
            // log: false,
            logLevel: 'silent',
            publicPath: url,
        },
        hotClient: {
            logLevel: 'silent',
            // overlay: true
        }
    })

    app.use(middleware)
    if (global.isHttps) {
        const https = require('https')
        const enforceHttps = require('koa-sslify')
        app.use(enforceHttps())
        const privateKey = fs.readFileSync(path.join(__dirname, './keys/private.pem'), 'utf8')
        const certificate = fs.readFileSync(path.join(__dirname, './keys/file.crt'), 'utf8')
        const credentials = {
          key: privateKey,
          cert: certificate
        }
        https.createServer(credentials, app.callback()).listen(port, () => {
            opn(url, {app: ['google chrome', '--incognito']})
        })
    } else {
        app.listen(port, () => {
            opn(url, {app: ['google chrome', '--incognito']})
        })
    }
    // app.listen(port, () => {
        
    // })
}
