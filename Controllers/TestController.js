let DB;
let UserRepository;

module.exports = 
class TestController extends require('./Controller') {
    constructor() {
        super(...arguments);
        const resolve = this.app.resolve.bind(this.app);
        !DB && (DB = resolve('DBService').db);
        !UserRepository && (UserRepository = new (resolve('UserRepositoryFabric').UserRepository)(DB))
    }

    async index() {
        return this.Ok.view('index', {
            title: 'Hello gav-gav.js!'
        });
    }

    async users() {
        return this.Ok.json(await UserRepository.getUsers());
    }

    async user() {
        return this.Ok.json(await UserRepository.getUser(this.req.all()));
    }
}