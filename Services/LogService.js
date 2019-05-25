const fs = require('fs');

class LogService {
    static Log(data) {
        fs.appendFile('logs.txt', JSON.stringify(data) + '\n', () => {});
    }
}

module.exports = LogService;