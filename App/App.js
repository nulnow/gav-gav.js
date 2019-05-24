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
    }
    setUpConfig(config) {
        this.appKey = config.appKey || null;
    }
    get(path, func) {
        this.paths.get[path] = func
    }
    post(path, func) {
        this.paths.post[path] = func
    }
    async runMiddlewares(middlewares, request) {
        if (!middlewares) return;
        for (let middleware of middlewares) {
            let response = await middleware.run(request);
            if (response) return response;
        }
    }
    async sendResponse(response) {
        console.log(response);
    }

    async run(method, path, req) {
        this.paths[method][path](req);
    }

    resolve(service) {
        return this.services[service];
    }

    bindControllersToRoutes(routes, controllers) {
        const app = this.app || this;
        const paths = Object.keys(routes);
        paths.forEach(path => {
            const route = routes[path]
            const method = route.method.toLowerCase();
            const [controllerName, controllerAction] = route.action.split('@');

            const routeMiddlewares = route.middlewares && route.middlewares.map(
                middlewareName => this.middlewares.find(
                    middleware => middleware.name === middlewareName
                )
            );

            const controller = controllers.find(controller => controller.name === controllerName);

            app[method](path, async (req, res) => {

                // Build requsest
                const request = new Request();

                // Go trough middlewares
                try {
                    const middlewareResponse = await this.runMiddlewares(routeMiddlewares || []);
                    if (middlewareResponse) return this.sendResponse(middlewareResponse, res);
                } catch(error) {
                    return this.sendResponse(new Response().code(500).text('Middleware error'), res);
                }

                // Get a response from controller
                try {
                    const response = await new controller(app, request)[controllerAction]();
                    return this.sendResponse(response, res)
                } catch (error) {
                    return this.sendResponse(new Response().code(500).text('Server error'), res);
                }

            });
        });
    }
}

module.exports = App;