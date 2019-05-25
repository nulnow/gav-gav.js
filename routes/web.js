Route.get('/', 'TestController@index');
Route.get('/me', 'TestController@me');
Route.get('/test', 'TestController@test');
Route.get('/params', 'TestController@params');

Route.get('/cheats', 'TestController@cheats');
Route.post('/cheats/:cheatKey', 'TestController@cheat');