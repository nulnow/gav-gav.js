const getArg = require('../utils/command-line-args-parser');

module.exports.makeController = function (name) {
    const controllerName = name || process.argv[3];
    if (!controllerName) {
        console.log('Controller name is required!');
        return;
    }
    const controllerTemplate = `const Controller = require('./Controller');

class ${controllerName} extends Controller {
    
}

module.exports = ${controllerName};`;
    fs.writeFileSync(__dirname + `/Controllers/${controllerName}.js`, controllerTemplate);
    console.log(`Controller ${controllerName} was created!`);
}

module.exports.makeMiddleware = function (name) {
    const middlewareName = name || process.argv[3];
    if (!middlewareName)
    if (!middlewareName) {
        console.log('Middleware name is required!');
        return;
    }
    const template = `class ${middlewareName} extends Controller {
    run() {
        return new Promise((resolve, reject) => {

        });
    }
}

module.exports = ${middlewareName};`;
    fs.writeFileSync(__dirname + `/Middlewares/${middlewareName}.js`, template);
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