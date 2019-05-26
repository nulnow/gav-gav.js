module.exports = class UserRepositoryFabric {
    constructor(app) {
        this.app = app;
        this.UserRepository = class UserRepository {
            constructor(DB) {
                this.db = DB;
                this.collection = 'users';
            }
            async getUser(params) {
                return await this.db.collection(this.collection)
                    .find(params)
                    .toArray();
            }
            async getUsers() {
                return await this.db.collection(this.collection)
                    .find({})
                    .toArray();
            }
            async addUser(name) {
                return await this.db.collection(this.collection).insertMany([{name}]);
            }
        }
    }
}