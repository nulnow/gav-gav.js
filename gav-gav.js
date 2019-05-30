const helpers = require('./App/helpers/helpers');

const command = process.argv[2];

command ? {
    'new:controller'   :    helpers.newController,
    'new:middleware'   :    helpers.newMiddleware,
    'new:service'      :    helpers.newService,
    'new:route'        :    helpers.newRoute,
    'serve'            :    helpers.runDefaultApp
}[command]() :
    helpers.runDefaultApp();