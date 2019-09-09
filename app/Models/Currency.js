'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Currency extends Model {
  static boot () {
    super.boot();
  }

  currenciesFrom () {
    return this.hasMany('App/Models/CurrencyExchange', 'currencies.id', 'currency_exchanges.currency_from');
  }

  currenciesTo () {
    return this.hasMany('App/Models/CurrencyExchange', 'currencies.id', 'currency_exchanges.currency_to');
  }

  static get hidden () {
    return ['created_at','updated_at'];
  }
}

module.exports = Currency;
