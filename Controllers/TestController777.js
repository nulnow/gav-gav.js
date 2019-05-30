const Controller = require('./Controller');
const { Ok, Response } = Controller;

let DB;
let Cache;
let Lang;
let User;
let Models;
let Validator;

class TestController777 extends Controller {

    constructor() {
        super(...arguments);
        !DB && (DB = this.app.resolve('DBService').db);
        !Cache && (Cache = this.app.resolve('CacheService'));
        !Lang && (Lang = this.app.resolve('LangService'));
        !User && (User = this.app.resolve('Models').User);
        !Models && (Models = this.app.resolve('Models'));
        !Validator && (Validator = this.app.resolve('Validator'));
    }

    async testUserModel(request) {
        const {name, email} = request.all();
        const user = new User({name, email})
        try {
            await user.save();
        } catch (error) {
            return error;
        }
        return user.toJSON();
    }

    async addCheat(request) {
        const {title, body} = request.all();
        const cheat = new Models.Cheat({
            title, body
        });

        try {
            await cheat.save();
        } catch (error) {
            return error;
        }

        return 'k';
    }

    async scr() {
        return await Models.Subscription.find({})
            .populate('user')
            .populate('cheat')
            .exec();
    }
 
    async userBy(request) {
        const { name } = request.all();

        const user = await User.findOne({name});
        if (user) {
            const cheat = await Models.Cheat.findOne({title: 'cheatSuper'});
            const subscription = new Models.Subscription({
                cheat: cheat._id,
                user: user._id
            });

            try {
                subscription.save();
            } catch (error) {
                return error;
            }
        }

        return user ? user.toJSON() : 'no user';
    }

    me(request) {
        return request.user || 'not authorized';
    }

    async register(request) {

        const errors = Validator.validate(request.all(), {
            name: {
                type: String,
                required: true,
                length: { min: 10, max: 32 },
                message: 'name'
            },
            password: {
                type: String,
                required: true,
                message: {
                    type: 'Title must be a string.',
                    required: 'password'
                    }
            }
        });
        if (errors.length) {
            // error handling logic
        }

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