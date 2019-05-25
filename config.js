module.exports = {
    commonMiddlewares: ['AuthMiddleware'],
    appKey: 'secret',
    port: process.env.PORT || 3000,
    dburl: 'mongodb://localhost:27017/hello'
}