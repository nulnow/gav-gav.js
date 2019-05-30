const fs = require('fs');
const getArg = require('../utils/command-line-args-parser');

module.exports.newController = function (name) {
    const controllerName = name || process.argv[3];
    if (!controllerName) {
        console.log('Controller name is required!');
        return;
    }
    const controllerTemplate = `const Controller = require('./Controller');

class ${controllerName} extends Controller {
    
}

module.exports = ${controllerName};`;
    fs.writeFileSync(`./Controllers/${controllerName}.js`, controllerTemplate);
    console.log(`Controller ${controllerName} was created!`);
}

module.exports.newService = function (name) {
    const serviceName = name || process.argv[3];
    if (!serviceName) {
        console.log('Sevice name is required!');
        return;
    }
    const serviceTemplate = `class ${serviceName} {
    constructor(app) {

    }
}

module.exports = ${serviceName};`;
    fs.writeFileSync(`./Services/${serviceName}.js`, serviceTemplate);
    console.log(`Service ${serviceName} was created!`);
}

module.exports.newMiddleware = function (name) {
    const middlewareName = name || process.argv[3];
    if (!middlewareName)
    if (!middlewareName) {
        console.log('Middleware name is required!');
        return;
    }
    const template = `class ${middlewareName} {
    run() {
        return new Promise((resolve, reject) => {

        });
    }
}

module.exports = ${middlewareName};`;
    fs.writeFileSync(`./Middlewares/${middlewareName}.js`, template);
    console.log(`Middleware ${middlewareName} was created!`);
}

module.exports.runDefaultApp = function() {
    const App = require('../App');
    (['port', 'host']).forEach(arg => (getArg(arg) && (process.env[arg] = getArg(arg))));
    let config;
    try {
        config = require('./config.js');
    } catch (error) {
        console.log('Config not found! Running with default');
    }
    const app = new App(config ? {config} : null);
    app.listen();
}

module.exports.newRoute = function(method, path, controller, action) {
    method = method || process.argv[3];
    path = (path || process.argv[4]).replace(/^\/\//, '/');
    controller = controller || process.argv[5];
    action = action || process.argv[6];
    fs.appendFileSync(
        './routes/web.js',
        `\nRoute.${method}('${path}', '${controller}@${action}');\n`
    );
    console.log('Route');
    console.log(`Route.${method}('${path}', '${controller}@${action}');`);
    console.log('Was successfully created!');
}