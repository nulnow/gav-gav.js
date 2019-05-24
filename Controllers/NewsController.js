const Controller = require('./Controller');
const Response = require('../App/Response');

class NewsController extends Controller {
    constructor() {
        super(...arguments);
        this.NewsService = this.app.resolve('NewsService');
    }
    news() {
        const allNews = this.NewsService.getAllNews();
        return (new Response()).code(200).json(allNews);
    }
    me() {
        if (this.req.user) {
            return (new Response()).code(200).json(this.req.user);
        } else {
            return (new Response()).code(409).text('Unauthorized');
        }
    }
    login(request) {
        const { username, password } = request;
        
    }
}

module.exports = NewsController;