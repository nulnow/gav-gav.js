module.exports =

class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
        this.Log = this.app.resolve('LogService').Log;
    }

    index() {
        return response().view('index', {
            title: 'Hello world! gav-gav.js',
            request: this.req
        });
    }

    test() {
        return 333;
    }

    showParams() {
        return this.Response.all();
    }

}