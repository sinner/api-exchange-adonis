'use strict';

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const Currency = use('App/Models/Currency');

class CurrencyExchange extends Model {
  static boot () {
    super.boot();
  }

  currencyFrom () {
    return this.belongsTo('App/Models/Currency', 'currencies.id', 'currency_exchanges.currency_from');
  }

  currencyTo () {
    return this.belongsTo('App/Models/Currency', 'currencies.id', 'currency_exchanges.currency_to');
  }

  static get hidden () {
    return ['created_at'];
  }
}

module.exports = CurrencyExchange;
