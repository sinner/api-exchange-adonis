'use strict'

class ForgotPasswordValidator {
  get rules() {
    return {
      email: 'required|email|max:254'
    };
  }
}

module.exports = ForgotPasswordValidator
