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

    static get Response() {
        return new Response;
    }
    static get Ok() {
        return Controller.Response.code(200);
    }
    static get Created() {
        return Controller.Response.code(201);
    }
    static get Unauthorized() {
        return Controller.Response.code(401);
    }

    static get ServerError() {
        return Controller.Response.code(500).text('ServerError');
    }

}

module.exports = Controller;