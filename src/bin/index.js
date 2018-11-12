import program from 'commander'
import start from '../start'
import build from '../build'

program
    .version('0.0.1')
    .usage('[options] <file ...>')
// require('../build/start')

program
    .command('start')
    .alias('s')
    .option('-s, --https', 'https server')
    .description('start the development server...')
    .action(function (type, name) {
        start(type.https)
    });

program
    .command('build')
    .alias('b')
    .description('build for production...')
    .action(function (type, name) {
        build()
    });

program.parse(process.argv)