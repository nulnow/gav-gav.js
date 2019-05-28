const Controller = require('./Controller');
const { Ok, Response } = Controller;

let DB;
let Cache;

class TestController777 extends Controller {

    constructor() {
        super(...arguments);
        !DB && (DB = this.app.resolve('DBService').db);
        !Cache && (Cache = this.app.resolve('CacheService'));
    }

    me(request) {
        return request.user || 'not authorized';
    }

    async register(request) {

        const name = request.input('name');

        if (!name) {
            return 'Name is required!';
        }

        try {
            const result = DB.collection('users').insertMany([{name}]);
            return result;
        } catch (error) {
            return error;
        }
    }

    async login(request) {

        const name = request.input('name');

        if (!name) {
            return 'Name is required!';
        }

        try {
            const user = await DB.collection('users').findOne({name});
            if (!user) {
                return Response.code(404).text('NO USER LOL');
            }
            return Response.setCookies({user_id: user._id}).text('!!!loggedIN!!!');
        } catch (error) {
            return error;
        }
    }
     
    setCookies(request) {
        return Response
            .setCookies(request.all())
            .redirectTo('/showCookies');
    }

    showCookies(request) {
        return request.cookies;
    }

    async getFromCache(request) {
        const key = request.input('key');
        if (!key) return Response.code(404).text('Key is required');

        const value = await Cache.get(key);

        return Ok.code(value ? 200 : 404).json(JSON.parse(value));
    }

    async putToCache(request) {
        const key = request.input('key');
        const value = request.input('value');
        if (!key) return Response.code(404).text('Key is required');
        if (!value) return Response.code(404).text('Value is required');

        await Cache.put(key, value);

        return Ok.text('Putted');
    }

}

module.exports = TestController777;