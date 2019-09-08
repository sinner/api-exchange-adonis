'use strict'

const Hash = use('Hash');
const User = use('App/Models/User');
const UserService = use('App/Services/UserService');
const CustomHttpException = use('App/Exceptions/CustomHttpException');

class AuthController {

  constructor() {
    this.userService = new UserService();
  }

  /**
  * @swagger
  * "/api/sign-up":
  *   post:
  *     tags:
  *       - User
  *     summary: User Sign Up Process
  *     parameters:
  *       - name: username
  *         description: Name of the user
  *         in: body
  *         required: true
  *         type: string
  *       - name: email
  *         description: Email of the user
  *         in: body
  *         required: true
  *         type: string
  *       - name: birthday
  *         description: Birthday of the user
  *         in: body
  *         required: true
  *         type: date
  *       - name: display_name
  *         description: Name of the user to be shown
  *         in: body
  *         required: false
  *         type: string
  *       - name: password
  *         description: Password of the user
  *         in: body
  *         required: true
  *         type: string
  *     responses:
  *       201:
  *         description: Creates a new user
  *         example:
  *           message: New user has been created successfully
  *       409:
  *         description: Invalid Data
  *         example:
  *           message: Invalid Data
  */
  async signUp({auth, request, response}) {
    const userData = request.only(['username', 'email', 'birthday', 'display_name', 'password']);
    const user = await this.userService.signUp(userData);
    const accessToken = await auth.generate(user);
    response.status(201);
    response.header('Response-Status-Code', 201);
    return {
      user,
      accessToken: accessToken.token,
    };
  }

  /**
  * @swagger
  * "/api/password-reset-request":
  *   post:
  *     tags:
  *       - User
  *     summary: User Reset Password Request Process
  *     parameters:
  *       - name: email
  *         description: Email of the user
  *         in: body
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Password reset has been requested successfully
  *         example:
  *           message: A link has been sent to your email
  *       404:
  *         description: User not found
  *         example:
  *           message: User not found
  */
  async passwordResetRequest({auth, request, response}) {
    const userData = request.only(['email']);
    const message = await this.userService.passwordResetRequest(userData);
    response.header('Response-Message', message);
    return message;
  }

  /**
  * @swagger
  * "/api/reset-password/:confirmationToken":
  *   put:
  *     tags:
  *       - User
  *     summary: User Reset Password Process
  *     parameters:
  *       - name: newPassword
  *         description: Password of the user
  *         in: body
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description: Password reset has been completed successfully
  *         example:
  *           message: Password reset has been completed successfully
  *       404:
  *         description: User not found
  *         example:
  *           message: User not found
  */
  async resetPassword({auth, request, params response}) {
    const newPassword = request.post('newPassword');
    const message = await this.userService.passwordReset(params.confirmationToken, newPassword);
    response.header('Response-Message', message);
    return message;
  }

  /**
  * @swagger
  * "/api/login":
  *   post:
  *     tags:
  *       - User
  *     summary: User Login Process
  *     parameters:
  *       - name: email
  *         description: Email of the user
  *         in: body
  *         required: true
  *         type: string
  *       - name: password
  *         description: Password of the user
  *         in: body
  *         required: true
  *         type: string
  *     responses:
  *       200:
  *         description:  User credential ok
  *         example:
  *           message: Welcome!
  *       400:
  *         description: Invalid Data
  *         example:
  *           message: Invalid Data
  */
  async login ({ auth, request, response }) {
    const { email, password } = request.all();
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.findBy('email', email);
        const accessToken = await auth.generate(user);
        return {
          user,
          accessToken: accessToken.token,
        };
      }
    }
    catch (e) {
      throw new CustomHttpException('Bad Credentials!', 401, {
        message: `${e}. You first need to register!`,
      });
    }
  }
}

module.exports = AuthController
