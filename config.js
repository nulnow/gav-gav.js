module.exports = {
    commonMiddlewares: ['AuthMiddleware'],
    appKey: 'secret',
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    dbUrl: 'mongodb://localhost:27017',
    dbName: 'gav'
}

// console.log(process.argv);