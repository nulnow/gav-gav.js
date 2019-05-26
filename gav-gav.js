const helpers = require('./App/helpers/helpers');

const command = process.argv[2];

command ? {
    'make:controller'   :    helpers.makeController,
    'make:middleware'   :    helpers.makeMiddleware,
    'serve'             :    helpers.runDefaultApp
}[command]() :
    helpers.runDefaultApp();