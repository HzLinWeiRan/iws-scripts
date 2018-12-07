import program from 'commander'

program
    .version('0.0.1')
    .usage('[options] <file ...>')
// require('../build/start')

program
    .command('start')
    .alias('s')
    .option('-s, --https', 'https server')
    .option('-e, --env', 'environment variable')
    .description('start the development server...')
    .action(function (type, name) {
        global.env = type.env || 'dev'
        global.isHttps = type.https
        global.cmd = 'start'
        require('../start').default()
    });

program
    .command('build')
    .alias('b')
    .description('build for production...')
    .option('-e, --env', 'environment variable')
    .action(function (type, name) {
        global.env = type.env || 'dev'
        global.cmd = 'build'
        require('../build').default()
    });

program.parse(process.argv)