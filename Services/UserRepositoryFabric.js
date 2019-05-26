module.exports = class UserRepositoryFabric {
    constructor(app) {
        this.app = app;
        this.UserRepository = class UserRepository {
            constructor(DB) {
                this.db = DB;
            }
            async getUser(params) {
                return await this.db.collection('users')
                    .find(params)
                    .toArray();
            }
            async getUsers() {
                return await this.db.collection('users')
                    .find({})
                    .toArray();
            }
        }
    }
}