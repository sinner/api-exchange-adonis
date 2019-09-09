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

class UserSeeder {
  async run () {
    const users = await Database.table('users');
    console.log(users);
    Factory.blueprint('App/Models/User', async (faker) => {
      return {
        display_name: 'José Gabriel González',
        username: 'admin',
        email: 'jgabrielsinner@gmail.com',
        password: 'admin',
        birthday: '1987-10-04',
      }
    });
    const user = await Factory.model('App/Models/User').create();
    console.log('--- User created: ', user);
  }
}

module.exports = UserSeeder;
