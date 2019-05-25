const Controller = require('./Controller');

class MyController extends Controller {
    index() {
        return 'Hello world!';
    }
}

module.exports = MyController;