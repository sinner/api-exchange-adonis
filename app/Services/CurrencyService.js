'use strict';

const is = require('is_js');
const moment = require('moment');
const Env = use('Env');

const Currency = use('App/Models/Currency');
const CurrencyExchange = use('App/Models/CurrencyExchange');
const CacheService = use('App/Services/CacheService');
const CustomHttpException = use('App/Exceptions/CustomHttpException');
const DataValidatorException = use('App/Exceptions/DataValidatorException');

class CurrencyService {

  constructor () {
    this.cache = CacheService.getCache();
    this.minutesToExpire = parseInt(Env.get('MINUTES_TO_EXPIRE_CACHED_EXCHANGE_INFO', '10'));
  }

  /**
   * Get all currencies and it could exclude one
   * @param Integer excludedId 
   */
  async getAllCurrenciesButExcludeOne (excludedId) {
    let currencies = [];
    if (is.not.null(excludedId) && is.integer(excludedId)) {
      currencies = await Currency
        .query()
        .whereNot('id', excludedId)
        .fetch();
    } else {
      currencies = await Currency
        .query()
        .fetch();
    }
    return currencies;
  }

  /**
   * Find a currency by ID
   * @param Integer id 
   */
  findCurrencyById (id) {
    return Currency.find(id);
  }

  getCurrencyExchangeKeyName (currencyFromId, currencyToId) {
    return `CURRENCY_EXCHANGE_INFO|FROM:${currencyFromId}|TO:${currencyToId}`;
  }

  storeCurrencyExchangeInfoInCache (currencyFromId, currencyToId, exchangeObj) {
    const keyName = this.getCurrencyExchangeKeyName(currencyFromId, currencyToId);
    this.cache.set(keyName, JSON.stringify({
      exchange: exchangeObj,
      since: moment().format('YYYY-MM-DD HH:mm:ss'),
    }));
  }

  async getCurrencyExchangeInfoFromCache (currencyFromId, currencyToId) {
    const exchangeRawData = await this.cache.get(
      this.getCurrencyExchangeKeyName(currencyFromId, currencyToId)
    );
    if (!exchangeRawData) {
      return null;
    }
    const exchangeData = JSON.parse(exchangeRawData);
    let exchangeObj = null;
    if (exchangeData.exchange && exchangeData.since) {
      const nowDate = new moment();
      const dataDate = new moment(exchangeData.since,"YYYY-MM-DD HH:mm:ss");
      if (moment.duration(nowDate.diff(dataDate)).asMinutes() < this.minutesToExpire) {
        // Validating the 10 minutes of the change of conversor index of currency exchange
        exchangeObj = exchangeData.exchange;
      }
    }
    return exchangeObj;
  }

  async getCurrencyExchange (currencyFromId, currencyToId) {
    let exchangeObj = await this.getCurrencyExchangeInfoFromCache(currencyFromId, currencyToId);
    if (!exchangeObj) {
      exchangeObj = await CurrencyExchange
                      .query()
                      .where('currency_from', currencyFromId)
                      .where('currency_to', currencyToId)
                      .first();
      if (exchangeObj) {
        this.storeCurrencyExchangeInfoInCache(currencyFromId, currencyToId, exchangeObj);
      }
    }
    return exchangeObj;
  }

  async getDefaultExchageCurrencies (order) {
    let currencyFrom = null;
    let currencyTo = null;

    if (order === 'asc') {
      currencyFrom = await Currency.findBy('iso_code', 'USD');
      currencyTo = await Currency.findBy('iso_code', 'EUR');
    }
    else {
      currencyFrom = await Currency.findBy('iso_code', 'EUR');
      currencyTo = await Currency.findBy('iso_code', 'USD');
    }

    return {
      currencyFrom,
      currencyTo,
    };
  }

  /**
   * Calculate a currency exchange
   * 
   * @param Integer currencyFromId 
   * @param Integer currencyToId 
   * @param Float value 
   */
  async exchangeCalculate (currencyFromId, currencyToId, value) {

    if (!value) {
      throw new CustomHttpException('Invalid data. A valid value to be exchanged is required!', 409, {
        currencyFromId,
        currencyToId,
        value,
      });
    }

    if (!currencyFromId || !currencyToId
      || is.not.integer(currencyFromId)
      ||  is.not.integer(currencyToId)
    ) {
      throw new CustomHttpException('Invalid Data!', 409, {
        currencyFromId,
        currencyToId
      }); 
    }

    let conversionIndex = 1;
    if (currencyFromId !== currencyToId) {
      const exchange = await this.getCurrencyExchange(currencyFromId, currencyToId);
      if (!exchange) {
        throw new CustomHttpException('Currency Exchange Not Found!', 404, {
          currencyFromId,
          currencyToId
        });
      }
      conversionIndex = parseFloat(exchange.conversor_value);
    }

    const currencyFrom = await this.findCurrencyById(currencyFromId);
    const currencyTo = await this.findCurrencyById(currencyToId);

    const result = parseFloat(conversionIndex * value).toFixed(4);

    return {
      valueToExchange: value,
      currencyFrom,
      conversionIndex,
      currencyTo,
      result,
    };
  }
  
}

module.exports = CurrencyService;
