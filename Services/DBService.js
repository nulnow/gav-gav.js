const mongodb = require('mongodb');
const { MongoClient } = mongodb;

module.exports = class DBService {
    constructor(app) {
        this.url = app.config.dbUrl;
        this.dbName = app.dbName;
        this.client = new MongoClient(this.url, { useNewUrlParser: true });
        console.log(this.url);
        this.client.connect(err => {
            if (err) {
                console.log(err);
                return;
            }
            this.db = this.client.db(this.dbName);
        });
    }
}