'use strict'

const NewUserListener = exports = module.exports = {}
const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');

NewUserListener.registered = async (user) => {
  await Mail.send('emails.welcome', {
    username: user.display_name || user.username,
  }, (message) => {
    message
      .to(user.email)
      .from(Env.get('MAIL_USERNAME'))
      .subject(Antl.formatMessage('message.welcome'));
  });
};