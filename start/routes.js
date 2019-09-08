'use strict';

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/api/hello', 'TestController.hello');
Route.post('/api/login', 'User/AuthController.login').middleware('guest');
Route.post('/api/sign-up', 'User/AuthController.signUp').middleware('guest')
Route.post('/api/password-reset-request', 'User/AuthController.passwordResetRequest').middleware('guest');
Route.post('/api/password-reset/:confirmationToken', 'User/AuthController.passwordReset').middleware('guest');
