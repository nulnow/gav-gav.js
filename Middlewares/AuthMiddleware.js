class AuthMiddleware {
    static run(app, req, res) {
        return new Promise( async (resolve, reject) => {
            const DB = app.resolve('DBService').db;
            const ObjectID = app.resolve('DBService').ObjectID;

            const userId = req.cookies.user_id;
            if (!userId) resolve();

            const user = await DB.collection('users').findOne({_id: ObjectID(userId)});

            if (!userId) resolve();
            
            req.user = user;
            resolve();
        });
    }
}

module.exports = AuthMiddleware;