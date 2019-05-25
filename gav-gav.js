const helpers = require('./App/helpers/helpers');

const command = process.argv[2];
command ? {
    'make:controller'   :    helpers.makeController,
    'make:middleware'   :    helpers.makeMiddleware,
    'serve'             :    helpers.runDefaultApp
}[command]() : 
    ['No command provided', 'Type', 'node gav-gav.js help', 'to get help']
        .map(_ => console.log(_));