# gav-gav.js JavaScript web framework
based on express.js
![](https://static.thenounproject.com/png/93779-200.png)

Inspired by Laravel

- Command line utils - create controllers and middlewares from your terminal
- Autoloading for controllers, middlewares and services. You do not need to manuly require them
- Route generator like in Laravel

[full documentation](https://nulnow.github.io/gav-gav.js/ "Click here")

# Quick start

## Instalation
```bash
git clone https://github.com/nulnow/gav-gav.js
cd gav-gav.js
npm install
node gav-gav.js serve
```
open [localhost:3000/](http://localhost:3000 "Click here")
and you will see welcome page

## Creating a simple controller

To create a controller run the command listed below and you will see a new controller in the **/Controllers** folder
```bash
node gav-gav.js create:controller MyController
```

Write some logic in **/Controllers/MyController.js**
File should look like this:

```javascript
const Controller = require('./Controller');

class MyController extends Controller {
    index() {
        return 'Hello world!';
    }
}

module.exports = MyController;
```

In **/routes/web.js** add a line:

```javascript
Route.get('/test', 'MyController@index');
```
This will bind route */test* to *index* method of your controller

Run
```bash
node gav-gav.js serve
```
And open [localhost:3000/test](http://localhost:3000/test "Click here")

You will see **Hello world** on the page