const express = require('express');
const bodyParser = require('body-parser');

const App = require('./App/App');

const config = require('./config');

const routes = App.LoadRoutes();
const controllers = App.LoadControllers();
const middlewares = App.LoadMiddlewares();
const services = App.LoadServices();

const expressApp = express();

expressApp.set('views', './resources/views');
expressApp.set('view engine', 'ejs');
expressApp.use(bodyParser.json());
expressApp.use(bodyParser.text());
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(express.static(__dirname + '/public'));

const app = new App({
    app: expressApp,
    middlewares,
    services,
    routes,
    controllers,
    config
});

app.app.listen(config.port, () => {
    console.log(`App is running on http://localhost:${config.port}/`);
});