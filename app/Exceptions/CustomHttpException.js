const { LogicalException } = require('@adonisjs/generic-exceptions');
const code = '';

class CustomHttpException extends LogicalException {
  constructor (message, status, data) {
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

    return super.handle(...arguments);
  }
}

module.exports = CustomHttpException;