class Request {
    constructor(expressRequest) {
        this.lang = 'en';
        this.body = expressRequest.body || {};
        this.query = expressRequest.query || {};
        this.method = expressRequest.method || 'get';
        this.ip = expressRequest.ip || null;
        this.contentType = expressRequest.get('content-type');
        this.params = expressRequest.params || {};
        this.cookies = {...expressRequest.cookies, ...expressRequest.signedCookies} || {};
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
    forEachParam(callback) {
        const data = this.all();
        for(const name in this.data) {
            if (!this.data.hasOwnProperty(name)) continue;
            callback(name, data);
        }
    }
}

module.exports = Request;