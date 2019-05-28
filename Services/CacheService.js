const fetch = require('node-fetch');
const API_URL = 'http://localhost:4444/';

class CacheService {
    get(key) {
        return new Promise((resolve) => {
            fetch(API_URL + key)
                .then(res => res.text())
                .then(text => resolve(text));
        });
    }
    put(key, value) {
        return new Promise((resolve) => {
            fetch(`${API_URL}${key}?value=${value}` , {method: 'POST'})
                .then(res => res.text())
                .then(text => resolve(text));
        });
    }
    forget(key) {
        return new Promise(resolve => {
            fetch(API_URL + key, {method: 'DELETE'})
                .then(() => resolve(true));
        });
    }
}

module.exports = CacheService;