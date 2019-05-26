module.exports =

class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
        this.Log = this.app.resolve('LogService').Log;
    }

    index() {
        return this.Response.view('index');
    }

    test() {
        return 333;
    }

    showParams() {
        return this.Response.all();
    }

}