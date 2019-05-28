// INTERFACE
({
    Get:     (key,   def)  =>  {   },
    Has:     (key       )  =>  {   },
    Put:     (key, value)  =>  {   },
    Forget:  (key       )  =>  {   }
});

const PORT = 4444;

const express = require('express');
const app = express();

class CacheStore {
    constructor(store) {
        this.store = store;
    }
    get(key) {
        return this.store[key];
    }
    put(key, value) {
        this.store[key] = value;
    }
    forget(key) {
        delete this.store[key];
    }
}

const store = new CacheStore({});

app.use('/:key', (req, res, next) => {
    console.log({
        store: store.store,
        method: req.method,
        key: req.params['key'],
        path: req.path
    });
    next();
});

app.get('/:key', (req, res) => {
    const value = store.get(req.params['key']);
    res.status(value ? 200 : 404).json(value);
});

app.post('/:key', (req, res) => {
    const key = req.params['key'];
    const value = req.query.value;
    if (key && value) store.put(key, value);
    console.log('POSTING TO CACHE', key, value, store.store);
    res.status( (key && value) ? 201 : 400 ).send();
});

app.delete('/:key', (req, res) => {
    const key = req.param.key;
    const value = req.query.value;
    if (key && value) delete store.forget(key);
    res.status( (key && value) ? 201 : 400 ).send();
});

app.listen(PORT, () => {
    console.log('cache store is ready on port', PORT);
});

