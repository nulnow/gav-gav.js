class Request {
    constructor(req) {
        this.body = req.body || {};
        this.query = req.query || {};
        this.method = req.method || 'get';
        this.ip = req.ip || null;
        this.contentType = req.get('content-type');
        this.params = req.params || {};
    }
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