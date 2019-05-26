const fs = require('fs');

class LogService {
    constructor(app) {

    }
    Log(data) {
        fs.appendFile('logs.txt', JSON.stringify(data) + '\n', () => {});
    }
}

module.exports = LogService;