'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments();
      table.string('username', 80).notNullable().unique();
      table.string('email', 254).notNullable().unique();
      table.string('display_name', 80);
      table.date('birthday').notNullable();
      table.json('roles');
      table.string('password', 60).notNullable();
      table.string('confirmation_token', 100).notNullable();
      table.timestamps();
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
