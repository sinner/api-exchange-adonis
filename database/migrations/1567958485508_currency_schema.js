'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CurrencySchema extends Schema {
  up () {
    this.create('currencies', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique();
      table.string('iso_code', 5).notNullable().unique();
      table.string('number_code', 5).notNullable();
      table.string('symbol', 5).notNullable();
      table.timestamps();
    });
  }

  down () {
    this.drop('currencies')
  }
}

module.exports = CurrencySchema
