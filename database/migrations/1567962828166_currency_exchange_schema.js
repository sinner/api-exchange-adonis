'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CurrencyExchangeSchema extends Schema {
  up () {
    this.create('currency_exchanges', (table) => {
      table.increments();
      table.integer('currency_from').unsigned().references('id').inTable('currencies');
      table.string('conversor_value', 200).notNullable();
      table.integer('currency_to').unsigned().references('id').inTable('currencies');
      table.timestamps();
      table.unique(['currency_from', 'currency_to']);
    })
  }

  down () {
    this.drop('currency_exchanges');
  }
}

module.exports = CurrencyExchangeSchema;
