'use strict';

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class StandardizeResponse {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ response }, next) {
    await next();
    
    const Env = use('Env');

    const defaultMessage = 'Success';
    const message = response.getHeader('Response-Message') || defaultMessage;
    const defaultStatusCode = 200;
    const statusCode = response.getHeader('Response-Status-Code') || defaultStatusCode;
    const apiVersion = Env.get('API_VERSION', '1.0');

    response.header('Content-type', 'application/json');
    response.status(statusCode).send({
      apiVersion,
      statusCode,
      message,
      data: response.lazyBody.content,
      errorTrack: null,
    });
  }
}

module.exports = StandardizeResponse;
