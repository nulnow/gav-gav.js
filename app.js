const App = require('./App/App');
const AuthMiddleware = require('./Middlewares/AuthMiddleware');
const NewsService = require('./Services/NewsService');
const NewsController = require('./Controllers/NewsController');

const config = require('./config');
const routes = require('./routes');

const middlewares = [AuthMiddleware];
const controllers = [NewsController];
const services = {NewsService};

const app = new App({middlewares, services, routes, controllers, config});

app.run('get', '/news', {});
app.run('get', '/me', {});