class AuthMiddleware {
    static run(req, res) {
        return new Promise((resolve, reject) => {
            if (Math.random() > 0.5) {
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