const mongodb = require('mongodb');
const { MongoClient } = mongodb;

module.exports = class DBService {
    constructor(url) {
        this.url = url;
        this.MongoClient = MongoClient;
    }
    getClient() {
        return new Promise((resolve, reject) => {
            if (this.client) resolve(this.client);
            this.MongoClient.connect(this.url, { useNewUrlParser: true }, (err, client) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!this.client) this.client = client;
                resolve(client);
            })
        });
    }
}