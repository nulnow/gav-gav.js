class Request {
    constructor(expressRequest) {
        this.body = expressRequest.body || {};
        this.query = expressRequest.query || {};
        this.method = expressRequest.method || 'get';
        this.ip = expressRequest.ip || null;
        this.contentType = expressRequest.get('content-type');
        this.params = expressRequest.params || {};
    }

    /**
     * Gets param from request (search in body, query params, route params)
     * @param {string} name request param name
     * @param {any} def default value if no param in request
     */
    input(name, def) {
        const store = [this.body, this.query, this.params].find(store => store.hasOwnProperty(name));
        if (store) {
            return store[name];
        } else {
            return def;
        }
    }
    all() {
        return { ...this.params, ...this.body, ...this.query };
    }
}

module.exports = Request;