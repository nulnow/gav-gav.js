const Controller = require('./Controller');
const { Ok, Created } = Controller;

let DB;
let UserRepository; 

module.exports = 
class TestController extends Controller {
    constructor() {
        super(...arguments);
        const resolve = this.app.resolve.bind(this.app);
        !DB && (DB = resolve('DBService').db);
        !UserRepository && (UserRepository = new (resolve('UserRepositoryFabric').UserRepository)(DB))
    }

    async index() {
        return Ok.view('index', {
            title: 'Hello gav-gav.js!'
        });
    }

    async users() {
        return Ok.json(await UserRepository.getUsers());
    }

    async user(request) {
        return Ok.json(await UserRepository.getUser(request.all()));
    }

    async addUser(request) {

        const name = request.input('name');

        if (!name) {
            return this.Response.code(400).text('Name is required');
        }

        return Created.json(await UserRepository.addUser(name));
    }
    

}