module.exports =

class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
        this.Log = this.app.resolve('LogService').Log;
        this.DB = this.app.resolve('DBService').db;
    }

    async index() {
        return this.Ok.view('index', {
            title: 'Hello gav-gav.js!'
        });
    }

    async users() {
        const {DB} = this;
        return this.Ok.json(await DB.collection('users')
            .find({})
            .toArray()
        );
    }

    async user() {
        const {DB} = this;
        return this.Ok.json(await DB.collection('users')
            .find(this.req.all())
            .toArray()
        );
    }

}