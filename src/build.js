import path from 'path'
import ora from 'ora'
import rm from 'rimraf'
import webpack from 'webpack'
import webpackProdConf from './webpack.prod.conf.js'
// const webpackProdConf = require('./webpack.dev.conf.js')
const spinner = ora('build for production... ')

export default () => {
    spinner.start()
    rm(path.join(process.cwd(), 'dist'), err => {
        if (err) throw err
        webpack(webpackProdConf, (err, stats) => {
            spinner.stop()
            if (err) throw err
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: true
            }) + '\n\n')
        })
    })
}
