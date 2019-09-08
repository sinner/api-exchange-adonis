'use strict'

const ForgotPasswordListener = exports = module.exports = {};
const Mail = use('Mail');
const Env = use('Env');
const Antl = use('Antl');
const User = use('App/Models/User');

ForgotPasswordListener.notified = async (user) => {
  const frontendUrl = Env.get('FRONT_URL');
  await Mail.send('emails.forgot-password', {
    username: user.display_name || user.username,
    resetPasswordUrl: `${frontendUrl}/reset-password/${user.confirmation_token}`,
  }, (message) => {
    message
      .to(user.email)
      .from(Env.get('MAIL_USERNAME'))
      .subject(Antl.formatMessage('message.forgotPassword'));
  });
};