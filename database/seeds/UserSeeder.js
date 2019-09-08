'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Database = use('Database');
const Hash = use('Hash');

class UserSeeder {
  async run () {
    const users = await Database.table('users');
    console.log(users);
    Factory.blueprint('App/Models/User', async (faker) => {
      return {
        username: 'admin',
        email: 'jgabrielsinner@gmail.com',
        password: await Hash.make('admin'),
      }
    });
    const user = await Factory.model('App/Models/User').create();
    console.log(user);
  }
}

module.exports = UserSeeder;
