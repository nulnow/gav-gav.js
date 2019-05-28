class Response {
    constructor() {
        this.contentType = 'html';
        this.statusCode = 200;
        this.data = '';
        this.cookies = {};
        this.redirect = null;
    }
    code(code) {
        this.statusCode = code;
        return this;
    }
    view(viewName, data) {
        this.contentType = 'view';
        this.viewName = viewName;
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

    setCookies(nameOrObject, valueOrOptions) {
        if (typeof valueOrOptions === 'string') {
            this.cookie[nameOrObject] = valueOrOptions;
        } else if (typeof nameOrObject === 'object') {
            console.log(nameOrObject);
            for (const cookieName in nameOrObject) {
                if (!nameOrObject.hasOwnProperty(cookieName)) continue;
                let cookieValue = nameOrObject[cookieName];
                this.cookies[cookieName] = cookieValue;
            }
        }
        return this;
    }
    redirectTo(path) {
        this.redirect = path;
        return this;
    }
    send(expressResponse) {
        if (Object.keys(this.cookies).length) {
            for (const cookieName in this.cookies) {
                if (!this.cookies.hasOwnProperty(cookieName)) continue;
                const cookieValue = this.cookies[cookieName];
                expressResponse.cookie(cookieName, cookieValue, {
                    maxAge: Number.MAX_SAFE_INTEGER,
                    path: '/'
                });
            }
        }

        if (this.redirect) {
            return expressResponse.redirect(this.redirect);
        }

        if (this.contentType !== 'view') {
            expressResponse.type(this.contentType || 'text')
            expressResponse.status(this.statusCode || 200);
            expressResponse.send(this.body || '');
        } else {
            expressResponse.render(this.viewName, {...this.data, LANG: {
                // APP LangService->all()
            }});
        }
    }
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
}

module.exports = Response;