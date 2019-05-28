/**
 * Generates array of routes
 */
module.exports = class Route {
    constructor() {
        this.routes = [];
    }
    route(methods, path, action) {
        const middlewares = this.mws || [];
        this.routes.push({ methods, path, action, middlewares });
        this.mws = null;
        return this;
    }
    get(path, action) {
        this.route(['get'], path, action);
    }
    post(path, action) {
        this.route(['post'], path, action);
    }
    put(path, action) {
        this.route(['put'], path, action);
    }
    patch(path, action) {
        this.route(['patch'], path, action);
    }
    delete(path, action) {
        this.route(['delete'], path, action);
    }
    middlewares(middlewares) {
        this.mws = middlewares;
        return this;
    }
    flush() {
        return this.routes;
    }
}