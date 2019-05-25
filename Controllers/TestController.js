module.exports =

class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
    }

    async index() {
        return this.Response.view('index', {
            title: 'Hello world! gav-gav.js',
            request: this.req
        });
    }

    async test() {
        return 333;
    }

    params() {
        const title = this.req.input('title');
        return this.Response.view('index', {title, request: this.req});
    }

    cheat() {
        return this.Response.code(200).json(this.req.all());
    }

}