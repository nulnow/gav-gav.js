const fs = require('fs');
const Route = require('./Route');

const Request = require('./Request');
const Response = require('./Response');

class App {
    constructor({ app, services, routes, controllers, middlewares, config }) {
        this.app = app || null;
        this.paths = {
            get: {},
            post: {}
        };
        this.services = services;
        this.middlewares = middlewares;
        if (config) {
            this.setUpConfig(config);
        }
        this.bindControllersToRoutes(routes, controllers);
        this.setUp404Page();
    }
    setUp404Page() {
        this.app.use((req, res) => {
                (new Response()).code(404).text('Page Not Found!').send(res);
        });
    }
    setUpConfig(config) {
        this.appKey = config.appKey || null;
        this.commonMiddlewares = config.commonMiddlewares || [];
        this.dburl = config.dburl || '';
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
    async sendResponse(response, res) {
        response.send(res);
    }

    async run(method, path, req) {
        this.paths[method][path](req);
    }

    resolve(service) {
        return this.services.find(
            s => s.name === service
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
                        let response = await new controller(this, request)[controllerAction]();
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

    static Load(whatToLoad) {
        return fs.readdirSync(`./${whatToLoad}/`).reduce(
            (arrayOfWhatToLoad, file) => [
                ...arrayOfWhatToLoad, require(`../${whatToLoad}/${file}`)
            ],
            []
        );
    }

    static LoadControllers() {
        return App.Load('Controllers');
    }

    static LoadMiddlewares() {
        return App.Load('Middlewares');
    }

    static LoadServices() {
        return App.Load('Services');
    }

    static LoadRoutes() {
        const router = new Route;
        const fileContent = fs.readFileSync('./routes/web.js', 'utf8');
        ((Route) => eval(fileContent))(router);
        return router.flush();
    }
}

module.exports = App;