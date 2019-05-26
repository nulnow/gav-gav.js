module.exports =

class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
        this.Log = this.app.resolve('LogService').Log;
    }

    async index() {
        return this.Ok.view('index', {
            title: 'Hello gav-gav.js!'
        });
    }

    async users() {
        return this.Ok.json(await this.app.resolve('DBService')
            .db.collection('users')
            .find({})
            .toArray()
        );
    }

    async user() {
        return this.Ok.json(await this.app.resolve('DBService')
            .db.collection('users')
            .find(this.req.all())
            .toArray()
        );
    }

}