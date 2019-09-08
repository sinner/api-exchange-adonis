'use strict';

const DataValidatorException = use('App/Exceptions/DataValidatorException');
const User = use('App/Models/User');
const StoreUserValidator = new (use('App/Validators/StoreUserValidator'))();
const ForgotPasswordValidator = new (use('App/Validators/ForgotPasswordValidator'))();
const { sanitize, validate } = use('Validator');
const Antl = use('Antl');
const Event = use('Event')

class UserService {
  /**
   * Register a new user
   * @param {*} userData 
   */
  async signUp (userData) {
    const sanitizedData = sanitize(userData, StoreUserValidator.sanitizationRules);
    const validation = await validate(sanitizedData, StoreUserValidator.rules);

    if (validation.fails()) {
      throw new DataValidatorException(
        Antl.formatMessage('user.invalidData'),
        { errors: validation.messages() }
      );
    }

    const user = await User.create(sanitizedData);
    Event.fire('user::new', user);
    return user;
  }

  /**
   * Password Reset Request
   * @param {*} userData 
   */
  async passwordResetRequest (userData) {
    const validation = await validate(userData, ForgotPasswordValidator.rules);

    if (validation.fails()) {
      throw new CustomHttpException(
        Antl.formatMessage('user.invalidData'),
        404,
        { errors: validation.messages() }
      );
    }
    const user = User.findBy('email', userData.email);
    if (user && user.email) {
      user.confirmation_token = md5(`${user.email}&${Date.now()}`);
      user.save();
      Event.fire('user::forgot-password', user);
    }
    else {
      throw new CustomHttpException(
        Antl.formatMessage('user.emailNotFound'),
        404,
        { errors: validation.messages() }
      );
    }
    return Antl.formatMessage('user.passwordResetRequestSuccess');
  }

  /**
   * Password Reset
   * @param {*} userData 
   */
  async passwordReset (confirmationToken, newPassword) {
    const user = User.findBy('confirmation_token', confirmationToken);
    if (user && user.email) {
      user.confirmation_token = md5(`${user.email}&${Date.now()}`);
      user.password = newPassword;
      user.save();
    }
    else {
      throw new CustomHttpException(
        Antl.formatMessage('user.confirmationTokenNotFound'),
        404,
        { errors: validation.messages() }
      );
    }
    return Antl.formatMessage('user.passwordResetSuccess');
  }
}

module.exports = UserService;
