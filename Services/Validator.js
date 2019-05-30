const Schema = require('validate');

class Validator {
    constructor(app) {
        this.app = app;
    }

    validate(obj, rules) {
        const schema = new Schema(rules);
        return schema.validate(obj);
    }
}

module.exports = Validator;