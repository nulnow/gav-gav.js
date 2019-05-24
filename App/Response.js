class Response {
    code(code) {
        this.code = code;
        return this;
    }
    json(obj) {
        this.body = JSON.stringify(obj);
        this.contentType = 'application/json';
        return this;
    }
    text(text) {
        this.body = text;
        this.contentType = 'text';
        return this;
    }
}

module.exports = Response;