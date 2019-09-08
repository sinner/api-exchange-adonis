'use strict';

const { sanitizor } = use('Validator');

class StoreUserValidator {
  get validateAll () {
    return true
  }
  get sanitizationRules() {
    return {
      username: 'trim',
      display_name: 'trim|escape',
      email: 'trim|normalize_email',
    };
  }
  get rules() {
    return {
      username: 'alpha_numeric|required|max:80|unique:users',
      display_name: 'max:80',
      email: 'required|email|max:254|unique:users',
      password: 'required|min:6',
      birthday: 'required|date',
    };
  }
  get messages () {
    return {
      'email.required': 'You must provide an email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password.',
      'password.min': 'You must provide a password with at least 6 characters.',
      'birthday.required': 'You must provide a birthday.',
    }
  }
}

module.exports = StoreUserValidator;
