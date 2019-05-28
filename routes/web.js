Route.get('/', 'TestController@index');
Route.get('/users', 'TestController@users');
Route.get('/user', 'TestController@user');
Route.get('/addUser', 'TestController@addUser');
Route.get('/setCookies', 'TestController777@setCookies');
Route.get('/showCookies', 'TestController777@showCookies');

Route.get('/register', 'TestController777@register');
Route.get('/login', 'TestController777@login');
Route.get('/me', 'TestController777@me');

Route.get('/cacheGet', 'TestController777@getFromCache');
Route.get('/putToCache', 'TestController777@putToCache');