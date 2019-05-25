const fs = require('fs');

function makeController() {
    const controllerName = process.argv[3];
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

function makeMiddleware() {
    const middlewareName = process.argv[3];
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

const command = process.argv[2];

if (!command) return;

({
    'make:controller': makeController,
    'make:middleware': makeMiddleware,
    'serve': () => {
        const port = process.argv.find(arg => arg.match(/--port=(\d\d\d\d)/)) &&
            process.argv.find(arg => arg.match(/--port=(\d\d\d\d)/)).split('=')[1];
        if (port) process.env['PORT'] = port;
        const appJsContent = fs.readFileSync(__dirname + '/app.js', 'utf8');
        eval(appJsContent);
    }
}[command]());