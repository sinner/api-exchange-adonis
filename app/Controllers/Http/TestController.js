'use strict'

class TestController {

  /**
  * @swagger
  * /api/hello:
  *   get:
  *     tags:
  *       - Test
  *     summary: Sample API
  *     parameters:
  *       - name: name
  *         description: Name of the user
  *         in: query
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: Send hello message
  *         example:
  *           message: Hello Guess
  */
  async hello({ request, response }) {
    const Antl = use('Antl');
    const Mail = use('Mail');

    const name = request.input('name', 'Guess');

    // await Mail.send('emails.welcome', {
    //   username: 'Joe',
    // }, (message) => {
    //   message
    //     .to("jgabrielsinner@gmail.com")
    //     .from('jsinnertests@gmail.com')
    //     .subject('Welcome to yardstick')
    // });

    const age = 76/0;

    const DataValidatorException = use('App/Exceptions/DataValidatorException');

    // throw new DataValidatorException('Error!', {errors: {
    //   username: 'It must be unique',
    // }});

    const message = Antl.formatMessage('message.greeting', { name } );

    response.header('Response-Message', message);
    return { message, name };
  }
}

module.exports = TestController;
