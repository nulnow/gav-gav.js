const bcrypt = require('bcrypt');
const ROUNDS = 10;

class Hash {
    
    constructor(app) {
        this.app = app;
        try {
            this.Log = app.resolve('LogService').Log;
        } catch (error) {
            console.log('Can not resolve LogService');
        }
    }
    
    make(text) {
        if (text.length > 72) {
            const warningMessage = 'PASSWORD LONGER THAN 72. SYMBOLS AFTER POSITION 72 WILL BE LOST!';
            console.log(warningMessage);
            this.Log && this.Log(warningMessage);
        }
            
        return new Promise((resolve, reject) => {
            bcrypt.hash(text, ROUNDS, (err, hash) => {
                if (err) reject(err);
                else resolve(hash);
            });
        });
    }

    async compare(text, hash) {
        return await bcrypt.compare(text, hash);
    }

}

module.exports = Hash;