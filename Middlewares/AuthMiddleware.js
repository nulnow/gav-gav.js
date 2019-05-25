class AuthMiddleware {
    static run(app, req, res) {
        return new Promise((resolve, reject) => {
            if (req.input('userId') == 777) {
                req.user = {
                    name: 'kek'
                }
                resolve();
            }
            resolve();
        });
    }
}

module.exports = AuthMiddleware;