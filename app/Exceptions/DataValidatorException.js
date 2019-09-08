const { LogicalException } = require('@adonisjs/generic-exceptions');
const status = 409;
const code = '';

class DataValidatorException extends LogicalException {
  constructor (message, data) {
    super(message, status, code);
    this.data = data;
  }

  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response }) {
    const Env = use('Env');

    const defaultMessage = 'Error';
    const message = error.message || defaultMessage;
    const defaultStatusCode = 500;
    const statusCode = error.status || defaultStatusCode;
    const apiVersion = Env.get('API_VERSION', '1.0');

    response.header('Content-type', 'application/json');
    response.status(statusCode).send({
      apiVersion,
      statusCode,
      message,
      data: error.data,
      errorTrack: error.stack,
    });
  }

}

module.exports = DataValidatorException;