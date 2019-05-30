const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gav', {useNewUrlParser: true});

const cheatSchema = new mongoose.Schema({
    key: {
        type: String,
        maxlength: 255,
        required: true,
        unique: true
    },
    translations: [{
        langKey: {type: String, maxlength: 2, unique: true },
        title: {type: String, maxlength: 255},
        body: {type: String, maxlength: 50000}
    }],
    prices: [{
        days: {type: Number, required: true},
        priceRub: {type: Number, required: true}
    }],
    lifetimePrice: {
        type: Number,
    }
});
const Cheat = mongoose.model('Cheat', cheatSchema);

const subscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cheat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cheat',
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    isLifetime: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    }
});
const Subscription = mongoose.model('Subscription', subscriptionSchema);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        maxlength: 100
    },
    email: {
        type: String,
        unique: true,
        maxlength: 255
    },
    registred: {
        type: Date,
        default: Date.now
    },
    subscriptions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subscription'}]
});
const User = mongoose.model('User', userSchema);

class Models {
    constructor(app) {
        this.app = app;
    }

    get User() {
        return User;
    }

    get Subscription() {
        return Subscription;
    }

    get Cheat() {
        return Cheat;
    }
}

module.exports = Models;