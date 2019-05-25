const Response = require('../App/Response');

class Controller {
    constructor(app, req) {
        this.req = req;
        this.app = app;
    }
    get Response() {
        return new Response;
    }
    get ServerError() {
        return this.Response.code(500).text('ServerError');
    }
}

module.exports = Controller;