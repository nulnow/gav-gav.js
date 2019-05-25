const Response = require('../App/Response');

class Controller {
    /**
     * @param app - service container (App instance)
     * @param req - request with some features (Request instance)
     */
    constructor(app, req) {
        this.req = req;
        this.app = app;
    }

    get Response() {
        return new Response;
    }
    get Ok() {
        return this.Response.code(200);
    }
    get Created() {
        return this.Response.code(201);
    }
    get Unauthorized() {
        return this.Response.code(401);
    }

    get ServerError() {
        return this.Response.code(500).text('ServerError');
    }

}

module.exports = Controller;