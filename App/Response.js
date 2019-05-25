class Response {
    static from(any) {
        switch (typeof any) {
            case 'object':
                return (new Response()).code(200).json(any);
            case 'string':
            case 'number':
            case 'boolean':
            default:
                return (new Response()).code(200).text(any);
        }
    }
    code(code) {
        this.code = code;
        return this;
    }
    view(viewName, data) {
        this.contentType = 'view';
        this.viewName = viewName;
        this.data = data;
        return this;
    }
    html(html) {
        this.contentType = 'html';
        this.body = html;
        return this;
    }
    json(obj) {
        this.body = JSON.stringify(obj);
        this.contentType = 'json';
        return this;
    }
    text(text) {
        this.contentType = 'text';
        switch (typeof text) {
            case 'number':
                this.body = text.toString();
                break;
            case 'string':
                this.body = text;
                break;
            default:
                this.body = JSON.stringify(text);
        }
        return this;
    }
    send(res) {
        if (this.contentType !== 'view') {
            res.type(this.contentType || 'text')
            res.status(this.code || 200);
            res.send(this.body || '');
        } else {
            res.render(this.viewName, this.data);
        }
    }
}

module.exports = Response;