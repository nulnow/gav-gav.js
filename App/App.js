const express = require('express');
const bodyParser = require('body-parser');

const fs = require('fs');
const Route = require('./Route');

const Request = require('./Request');
const Response = require('./Response');

class App {
    /**
     * @param {object} config ({ config }) or full configuration object 
     */
    constructor(paramObject) {
        if (!paramObject) return App.GetDefaultSetupWithDefaultConfigs();
        if (Object.keys(paramObject).length === 1) return App.GetDefaultSetup(paramObject);
        
        const { app, services, routes, controllers, middlewares, config } = paramObject;
        this.port = config.port || process.env.PORT || 3000;
        this.host = config.host || process.env.HOST || 'localhost';
        this.app = app || null;
        this.paths = {
            get: {},
            post: {}
        };
        
        if (config) {
            this.setUpConfig(config);
        }
        this.services = services.map(service => (new service(this)));
        this.middlewares = middlewares;
        this.bindControllersToRoutes(routes, controllers);
        this.setUp404Page();
    }
    listen() {
        this.app.listen(this.port, this.host, () => {
            console.log(`App is running on http://${this.host}:${this.port}/`);
        });
    }
    setUp404Page() {
        this.app.use((req, res) => {
                new Response().code(404).text('Page Not Found!').send(res);
        });
    }
    setUpConfig(config) {
        this.appKey = config.appKey || null;
        this.commonMiddlewares = config.commonMiddlewares || [];
        this.dburl = config.dburl || '';
        this.dbName = config.dbName;
        this.config = config;
    }
    runMiddlewares(middlewares, request) {
        return new Promise(async (resolve, reject) => {
            if (!middlewares) return resolve();
            for (let middleware of middlewares) {
                let response
                try {
                    response = await middleware.run(this, request);
                    if (response) return resolve(response);
                } catch (error) {
                    return reject()
                }
            }
            resolve();
        });
    }
    sendResponse(response, res) {
        response.send(res);
    }

    run(method, path, req) {
        this.paths[method][path](req);
    }

    resolve(service) {
        return this.services.find(
            s => s.constructor.name === service
        );
    }

    bindControllersToRoutes(routes, controllers) {
        const app = this.app;
        routes.forEach(route => {
            const {path, methods, action, middlewares} = route;
            const [controllerName, controllerAction] = action.split('@');

            const routeMiddlewares = middlewares && middlewares.map(
                middlewareName => this.middlewares.find(
                    middleware => middleware.name === middlewareName
                )
            );

            const commonMiddlewares = this.commonMiddlewares && this.commonMiddlewares.map(
                middlewareName => this.middlewares.find(
                    middleware => middleware.name === middlewareName
                )
            );

            const controller = controllers.find(controller => controller.name === controllerName);
            methods.forEach(method => 
                app[method.toLowerCase()](path, async (req, res) => {

                    // Build requsest
                    const request = new Request(req);
                    
                    // Log request
                    this.resolve('LogService').Log(request);
    
                    // Go trough middlewares
                    try {
                        const middlewareResponse = await this.runMiddlewares(
                            [...(commonMiddlewares || []), ...(routeMiddlewares || [])],
                            request
                        );
                        if (middlewareResponse) return this.sendResponse(middlewareResponse, res);
                    } catch(error) {
                        return this.sendResponse(new Response().code(500).text(error), res);
                    }
    
                    // Get a response from controller
                    try {
                        let response = await new controller(this, request)[controllerAction](request);
                        if (!(response instanceof Response)) response = Response.from(response);
                        return this.sendResponse(response, res)
                    } catch (error) {
                        console.log(error);
                        return this.sendResponse(new Response().code(500).text('Controller error'), res);
                    }
                })
            );
            
        });
    }

    /**
     * Requires all files in directory and returns array of loaded data
     * @param {string} whatToLoad folder name
     * @returns {array}
     */
    static Load(whatToLoad) {
        return fs.readdirSync(`./${whatToLoad}/`).reduce(
            (arrayOfWhatToLoad, file) => [
                ...arrayOfWhatToLoad, require(`../${whatToLoad}/${file}`)
            ],
            []
        );
    }

    /**
     * Returns array of all controllers in /Controllers folder
     * @returns {array}
     */
    static LoadControllers() {
        return App.Load('Controllers');
    }

    /**
     * Returns array of all middlewares in /Middlewares folder
     * @returns {array}
     */
    static LoadMiddlewares() {
        return App.Load('Middlewares');
    }

    /**
     * Returns array of all services in /Services folder
     * @returns {array}
     */
    static LoadServices() {
        return App.Load('Services');
    }

    /**
     * Generates array of routes based on /routes/web.js
     * Array looks like this: [
     *      {
     *          path: '/',
     *          action: 'ControllerClassName@controllerMethod',
     *          methods: ['get', 'post', ...],
     *          middlewares: ['AuthMiddleware' ...]
     *      },
     *      ...
     * ]
     */
    static LoadRoutes() {
        const router = new Route;
        const fileContent = fs.readFileSync('./routes/web.js', 'utf8');
        ((Route) => eval(fileContent))(router);
        return router.flush();
    }

    static GetDefaultSetup(config) {
        const routes = App.LoadRoutes();
        const controllers = App.LoadControllers();
        const middlewares = App.LoadMiddlewares();
        const services = App.LoadServices();

        const expressApp = express();

        expressApp.set('views', './resources/views');
        expressApp.set('view engine', 'twig');
        expressApp.use(bodyParser.json());
        expressApp.use(bodyParser.text());
        expressApp.use(bodyParser.urlencoded({ extended: false }));
        expressApp.use(express.static('./public'));

        return new App({
            app: expressApp,
            middlewares,
            services,
            routes,
            controllers,
            config
        });
    }

    static GetDefaultSetupWithDefaultConfigs() {
        return this.GetDefaultSetup(App.DEFAULT_CONFIG);
    }

    static get DEFAULT_CONFIG () {
        return {
            commonMiddlewares: ['AuthMiddleware'],
            appKey: 'secret',
            port: process.env.PORT || 3000,
            host: process.env.HOST || 'localhost',
            dbUrl: 'mongodb://localhost:27017/',
            dbName: 'gav'
        }
    }
}

module.exports = App;