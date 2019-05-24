const routes = {
    '/news': {
        method: 'GET',
        action: 'NewsController@news'
    },
    '/me': {
        method: 'get',
        action: 'NewsController@me',
        middlewares: ['AuthMiddleware']
    }
}

module.exports = routes;