'use strict'

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
const Route = use('Route')
const NE = require('node-exceptions')
class HttpException extends NE.LogicalException {}

Route.get('/', () => 'Hello Adonis')

Route.group(() => {
  Route.get('/', 'PoliticiansController.getAllPoliticians');
  Route.get('count', 'PoliticiansController.countAllPoliticians');
  Route.get('search/*', 'PoliticiansController.searchPoliticians');
}).prefix('api/politicians');

Route.any('*', (request, response) => {
  throw new HttpException('Page not found', 404)
})


