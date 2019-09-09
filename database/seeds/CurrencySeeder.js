'use strict'

/*
|--------------------------------------------------------------------------
| CurrencySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const Currency = use('App/Models/Currency');
const CurrencyExchange = use('App/Models/CurrencyExchange');

class CurrencySeeder {
  async run () {
    const initialCurrencies = [
      {
        name: 'United States dollar',
        iso_code: 'USD',
        number_code: '840',
        symbol: '$',
      },
      {
        name: 'Euro',
        iso_code: 'EUR',
        number_code: '978',
        symbol: '€',
      },
      {
        name: 'Colombian peso',
        iso_code: 'COP',
        number_code: '170',
        symbol: '$',
      },
    ];
    for(const currencyItem of initialCurrencies) {
      const currency = await Currency.create(currencyItem);
      console.log('--- Created currency', currency);
    }

    const usd = await Currency.findBy('iso_code', 'USD');
    const eur = await Currency.findBy('iso_code', 'EUR');
    const cop = await Currency.findBy('iso_code', 'COP');
    const initialCurrenciExchanges = [
      {
        currency_from: usd.id,
        conversor_value: 0.900527.toFixed(6),
        currency_to: eur.id,
      },
      {
        currency_from: eur.id,
        conversor_value: 1.11046.toFixed(6),
        currency_to: usd.id,
      },
      {
        currency_from: usd.id,
        conversor_value: 3354.55.toFixed(6),
        currency_to: cop.id,
      },
      {
        currency_from: cop.id,
        conversor_value: 0.000298.toFixed(6),
        currency_to: usd.id,
      },
    ];
    for(const currencyExchangeItem of initialCurrenciExchanges) {
      const currencyExchange = await CurrencyExchange.create(currencyExchangeItem);
      console.log('--- Created Exchange currency', currencyExchange);
    }

  }
}

module.exports = CurrencySeeder
