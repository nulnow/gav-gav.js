const Controller = require('./Controller');
const { Ok, Response } = Controller;

let DB;

class TestController777 extends Controller {

    constructor() {
        super(...arguments);
        !DB && (DB = this.app.resolve('DBService').db);
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

}

module.exports = TestController777;