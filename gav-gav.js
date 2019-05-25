const fs = require('fs');
const getArg = require('./App/helpers/command-line-args-parser');

function makeController(name) {
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

function makeMiddleware(name) {
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

function runDefaultApp() {
    const App = require('./App/App');
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

const command = process.argv[2];
command ? {
    'make:controller'   :    makeController,
    'make:middleware'   :    makeMiddleware,
    'serve'             :    runDefaultApp
}[command]() : 
    ['No command provided', 'Type', 'node gav-gav.js help', 'to get help']
        .map(_ => console.log(_));